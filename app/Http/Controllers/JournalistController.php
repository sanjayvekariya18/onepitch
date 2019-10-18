<?php

namespace App\Http\Controllers;

use App\Models\IndustryTopic;
use App\Models\Pardot;
use App\Models\User;
use App\Models\UserIndustry;
use App\Notifications\JournalistConfirm;
use App\Notifications\PublicistConfirmEmail;
use Auth;
use Carbon\Carbon;
use Illuminate\Http\Request;

use Session;
use DB;

class JournalistController extends Controller
{
	protected $user;

	public function __construct(Request $request)
	{
		$this->middleware(function ($request, $next) {
			$this->user = Auth::user();

			if (!$this->user && Session::get('journalist_id')) {
				$user_id = Session::get('journalist_id');
				$this->user = User::find($user_id);
			}

			if (!$this->user->agree_tos) {
				return redirect()->route('signup_journalist');
			}

			return $next($request);
		});
	}

	public function interests(Request $request) {
		$user = $this->user;
		$edit = Auth::check();

		$selected_industry = $user->listIndustriesWithTopics();

		if ($request->isMethod('post')) {
			$rules = array(
				'industry' => 'array|required',
			);
			$data = $request->input();

			if ($this->validateInput($data, $rules)) {
				try {
					DB::connection()->getPdo()->beginTransaction();

					$industries = [];
					foreach ($request->input('industry') as $industry) {
						$industries[] = json_decode($industry, true);
					}

					UserIndustry::setIndustries($user, $industries);

					DB::connection()->getPdo()->commit();

                    $user->has_industry = 1;
                    $user->save();

                    $fullName = explode(' ', $user->full_name);
                    $firstName = array_shift($fullName);
                    $lastName = implode(' ', $fullName);

                    // Not best practice but would solve updating tour
                    if (Carbon::now()->diffInMinutes($user->tour->updated_at) > 1 && $user->tour->interest < 3) {
                        $request['type'] = 'interests';
                        $request['increment'] = 1;

                        $service = new ServiceController();
                        $service->updateUserTour($request);
                    }

                    Session::remove('suggested_industry');
                    Session::remove('suggested_industry_topics');
                    Session::remove('suggested_industry_topics_name');

					if ($edit) {
						return redirect()->route('profile');
					} else {
					    if($user->vc){
                            Session::flush();
                            return redirect()->route('comm_vs_finish');
                        }

                        $pardot = new Pardot();
                        $params = [
                            'email' => $user->email,
                            'first_name' => $firstName,
                            'last_name' => $lastName,
                            'company' => $user->company,
                            'phone_number' => $user->phone_number,
                            'title' => $user->title,
                            'birthday' => $user->birthday
                        ];

						if (!$user->is_verified) {
						    if ($user->role == User::ROLE_PUBLICIST) {
						        $user->notify(new PublicistConfirmEmail());
                                $workingAs = $user->working_as;

                                if ($workingAs == 'I am a marketer') {
                                    $pardot->postTemplateUrl('https://go.pardot.com/l/506841/2019-06-17/3nszxb', $params);
                                    return redirect()->route('signup_confirm_1');
                                } else {
                                    if ($workingAs == 'I am a PR specialist working at an agency') {
                                        $pardot->postTemplateUrl('https://go.pardot.com/l/506841/2019-06-17/3nszz6', $params);
                                        return redirect()->route('signup_confirm_2');
                                    } else {
                                        if ($workingAs == 'I am a PR specialist working at a company') {
                                            $pardot->postTemplateUrl('https://go.pardot.com/l/506841/2019-06-17/3nszzb', $params);
                                            return redirect()->route('signup_confirm_3');
                                        } else {
                                            return redirect()->route('publicist_no_pitch');
                                        }
                                    }
                                }

                            } else {
                                $user->notify(new JournalistConfirm());
                                $workingAs = $user->working_as;

                                if ($workingAs == 'I am an editor') {
                                    $pardot->postTemplateUrl('https://go.pardot.com/l/506841/2019-07-08/3pmb94', $params);
                                    return redirect()->route('signup_confirm_4');
                                } else if ($workingAs == 'I am a journalist/reporter'){
                                    $pardot->postTemplateUrl('https://go.pardot.com/l/506841/2019-07-08/3pmb98', $params);
                                    return redirect()->route('signup_confirm_5');
                                }else{
                                    return redirect()->route('journalist_what_next');
                                }
                            }

						} else {
							return redirect()->route('profile');
						}

					}
				} catch (\Exception $e) {
					DB::connection()->getPdo()->rollBack();

					abort(400, $e->getMessage());
				}
			}
		}

		if ($selected_industry) {
            $suggested_industry_topics_name = [];
            foreach (json_decode($selected_industry[0]['json'])->topics as $topic){
                $industry_topic = IndustryTopic::find($topic);
                array_push($suggested_industry_topics_name, $industry_topic->title);
            }
            Session::put('suggested_industry_topics', $selected_industry[0]['json']);
            Session::put('suggested_industry', $selected_industry[0]['industry']->title);
            Session::put('suggested_industry_topics_name', $suggested_industry_topics_name);
        }

        if ($user->role == User::ROLE_PUBLICIST) {
            return view('publicist.select_interests', array(
                'selected_industry' => $selected_industry,
                'user' => $user,
                'edit' => $edit,
            ));
        }

		return view('journalist.select_interests', array(
			'selected_industry' => $selected_industry,
			'user' => $user,
			'edit' => $edit,
		));
	}

	public function whatNext(Request $request) {
		$user = $this->user;

		return view('journalist.what_next', array(
			'user' => $user,
		));
	}

	public function confirmed(Request $request) {
		$user = $this->user;

		return view('journalist.confirmed', array(
			'user' => $user,
		));
	}

	public function resendConfirmationEmail(Request $request) {
		$user = $this->user;

		$user->notify(new JournalistConfirm());

		return redirect()->route('journalist_what_next');
	}

    public function supportCenter(Request $request) {

        return view('journalist.support_center');
    }
}