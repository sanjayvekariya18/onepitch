<?php

namespace App\Http\Controllers;

use App\Models\Pardot;
use App\Models\User;
use App\Notifications\PublicistConfirmEmail;
use App\Services\UtilityService;
use Auth;
use App\Models\MailChimp;
use Illuminate\Http\Request;
use DB;
use Log;
use Session;
use Socialite;

class AuthController extends Controller
{
    public function selectRole(Request $request) {
        return view('auth.select_role', array(
        ));
    }

    public function signupSocialAccount(Request $request) {
        return view('auth.signup_social', array(
        ));
    }

    public function signupSocialAccount2(Request $request) {
        $socialPlatform = $request->input('q');

        if ($socialPlatform === 'linkedin') {
            $hear_about = 'LinkedIn Ad';
        } elseif ($socialPlatform === 'google') {
            $hear_about = 'Ad';
        } else {
            $hear_about = 'Twitter';
        }

        return view('auth.signup_social_2', array(
            'hear_about' => $hear_about
        ));
    }

    public function signupSocialAccount3(Request $request) {
        return view('auth.signup_social_3', array(
        ));
    }

    public function signupPublicist(Request $request) {
        $user = null;
        $workAsList = UtilityService::getPublicistWorks();
        $senorityList = UtilityService::getSenorityList();

        if (Session::get('publicist_id')) {
            $user = User::find(Session::get('publicist_id'));
        }

        if ($request->isMethod('post')) {
            $data = $request->input() + $request->file();

            $rules = array(
                'full_name' => 'required|max:100',
                'company' => 'required|max:255',
                'email' => 'required|email',
                'title' => 'required',
                'birthday' => 'required',
                'confirm_email' => 'string',
                'twitter_url' => 'string|nullable',
                'linked_url' => 'string|nullable',
                'photo' => 'file|image',
                'agree_tos' => 'boolean|required',
            );
            $data['birthday'] = date('Y-m-d', strtotime($data['birthday']));
           
            if (!$user) {
                $rules += [
                    'password' => 'required|min:6',
                    'confirm_password' => 'same:password',
                ];
            }

            if ($this->validateInput($data, $rules)) {
                
                try {
                    DB::connection()->getPdo()->beginTransaction();

                    $data['role'] = User::ROLE_PUBLICIST;
                    if ($user) {
                        $user->edit($data);
                    } else {
                        $user = User::register($data);
                    }
                    
                    $user['birthday'] = date('m/d/Y', strtotime($user['birthday']));
                    Session::put('publicist_id', $user->id);

                    try {
                        $params = [
                            'email' => $user->email,
                            'name' => $user->full_name,
                        ];
                        $mailchimp = new MailChimp();
                        $mailchimp->addToList(MailChimp::PUBLICIST_ACCOUNTS, $params);
                    } catch (\Exception $e) {

                    }

                    $fullName = explode(' ', $user->full_name);
                    $firstName = array_shift($fullName);
                    $lastName = implode(' ', $fullName);

                    try {
                        $params = [
                            'email' => $user->email,
                            'first_name' => $firstName,
                            'last_name' => $lastName,
                            'company' => $user->company,
                            'phone_number' => $user->phone_number,
                            'title' => $user->title,
                            'birthday' => $user->birthday,
                            'twitter_url' => $user->twitter_url,
                            'linkedin_url' => $user->linkedin_url,
                        ];
                        $pardot = new Pardot();
                        $pardot->addToList(Pardot::PUBLICIST_SIGN_UP, $params);
                    } catch (\Exception $e) {

                    }

                    DB::connection()->getPdo()->commit();

                    $user->notify(new PublicistConfirmEmail());

                    if ($request->input('no_pitch') && !$user->is_verified) {
                        $workingAs = $user->working_as;
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
                        return redirect()->route('pitch_what', ['pitch_id' => 'create']);
                    }
                } catch (\Exception $e) {
                    DB::connection()->getPdo()->rollBack();

                    abort(400, $e->getMessage());
                }
            }
        }

        return view('auth.signup_publicist', array(
            'user' => $user,
            'workAsList' => $workAsList,
            'senorityList' => $senorityList
        ));
    }

    public function signupJournalist(Request $request) {
        $user = null;
        $workAsList = UtilityService::getJournalistWorks();

        if (Session::get('journalist_id')) {
            $user = User::find(Session::get('journalist_id'));
        }

        if ($request->isMethod('post')) {
            $data = $request->input() + $request->file();

            $rules = array(
                'full_name' => 'required|max:100',
                'company' => 'required|max:255',
                'email' => 'required|email',
                'title' => 'required',
                'birthday' => 'required',
                'confirm_email' => 'string',
                'twitter_url' => 'string|nullable',
                'linked_url' => 'string|nullable',
                'publication_url' => 'required|string',
                'author_url' => 'required|string',
                'photo' => 'file|image',
                'agree_tos' => 'boolean|required',
            );
            $data['birthday'] = date('Y-m-d', strtotime($data['birthday']));
            if (!$user) {
                $rules += [
                    'password' => 'required|min:6',
                    'confirm_password' => 'same:password',
                ];
            }

            if ($this->validateInput($data, $rules)) {
                try {
                    DB::connection()->getPdo()->beginTransaction();

                    $data['role'] = User::ROLE_JOURNALIST;
                    if ($user) {
                        $user->edit($data);
                    } else {
                        $user = User::register($data);
                    }
                    $user['birthday'] = date('m/d/Y', strtotime($user['birthday']));
                    Session::put('journalist_id', $user->id);

                    DB::connection()->getPdo()->commit();

                    return redirect()->route('journalist_interests');
                } catch (\Exception $e) {
                    DB::connection()->getPdo()->rollBack();

                    abort(400, $e->getMessage());
                }
            }
        }

        return view('auth.signup_journalist', array(
            'user' => $user,
            'workAsList' => $workAsList
        ));
    }

    public function confirmEmail(Request $request, $code) {
        $user = User::getOneBy('verification_code', $code);

        if ($user) {
            $user->is_verified = 1;
            $user->verification_code = null;
            $user->save();

            if ($user->role == User::ROLE_JOURNALIST) {
                return redirect()->route('journalist_confirmed');
            } else {
                Auth::login($user);

                return redirect()->route('pitch_what');
            }
        }

        return response('Wrong verification code');
    }


    public function industryTopicLanding(Request $request, $entity, $id)
    {
        Session::put('landing_entity', $entity);
        Session::put('landing_'.$entity.'_id', $id);

        return redirect()->route('profile');
    }

    public function login(Request $request) {
        $errors = [];
        if ($request->isMethod('post')) {
            $data = $request->input();

            $rules = array(
                'email' => 'required|exists:users,email',
                'password' => 'required',
            );

            if ($this->validateInput($data, $rules)) {
                $user = User::checkIfLoginValid($data['email'], $data['password']);
                if (gettype($user) == 'object' && get_class($user) == 'App\Models\User') {
                    if (!$user->agree_tos && $user->role < 90) {
                        if ($user->role == User::ROLE_JOURNALIST) {
                            Session::put('journalist_id', $user->id);

                            return redirect()->route('signup_journalist');
                        } elseif ($user->role == User::ROLE_PUBLICIST) {
                            Session::put('publicist_id', $user->id);

                            return redirect()->route('signup_publicist');
                        } else {
                            Session::put('journalist_id', $user->id);
                            Session::put('publicist_id', $user->id);
                            return redirect()->route('signup_select_role');
                        }
                    } else {
                        Auth::login($user);

                        return redirect()->intended('profile');
                    }
                } else {
                    $errors[] = $user;
                }
            } else {
                $errors = $this->validationErrors();
            }
        }

        return view('auth.login', array(
            'errors' => $errors,
        ));
    }

    public function socialRedirect(Request $request, $driver) {
        if ($request->input('signup') && in_array($request->input('signup'), [User::ROLE_JOURNALIST, User::ROLE_PUBLICIST])) {
            Session::put('signup_role', $request->input('signup'));
        }

        if ($request->input('hear_about')) {
            Session::put('hear_about', $request->input('hear_about'));
        }

        return Socialite::driver($driver)->redirect();
    }

    public function socialCallback(Request $request, $driver) {
        try {
            $social_user = Socialite::driver($driver)->user();
        } catch (\Exception $e) {
            $responseCode = $e->getCode();

            if($responseCode === 400 || $responseCode === 0){
                return redirect('/logout');
            }

            if ($responseCode > 400) {
                Log::error('Login try with '.$driver.': '.$responseCode, $request->request->all());
                return abort(404);
            }

            return redirect()->route('auth_social_redirect', ['driver' => $driver]);
        }

        $driver = strtolower(trim($driver));

        $social_id = $driver.'_id';
        $data = [];
        $data[$social_id] = $social_user->id;
        $data['full_name'] = $social_user->name;
        $data['username'] = $social_user->nickname;
        $data['photo'] = $social_user->avatar;
        $data['email'] = $social_user->email;

        if ($driver === 'twitter') {
            $data['twitter_url'] = 'https://twitter.com/'.$social_user->nickname;
        } elseif ($driver === 'linkedin') {
            $fields = getLinkedinFields($social_user->token);

            if ($fields && is_array($fields)) {
                $data['linkedin_url'] = array_get($fields, 'publicProfileUrl');
                $data['photo'] = isset($fields['pictureUrls']['values'][0]) ? $fields['pictureUrls']['values'][0] : $data['photo'];
                $data['company'] = isset($fields['positions']['values'][0]['company']['name']) ? $fields['positions']['values'][0]['company']['name'] : $data['company'];
            }
        }

        if (Session::get('signup_role')) {
            $data['role'] = Session::get('signup_role');
        }

        if (Session::get('hear_about')) {
            $data['hear_about'] = Session::get('hear_about');
        }

        $user = User::createOrGetFromSocial($data, $social_id);

        if (Session::get('pom_redirect')) {
            $route = Session::get('pom_redirect');
            Session::remove('pom_redirect');

            if(!empty($user) && $user->is_verified && $user->role === User::ROLE_PUBLICIST){
                Auth::login($user);
                return redirect()->route($route);
            }
        }

        if (Session::get('signup_role') == User::ROLE_JOURNALIST && !$user->is_verified) {
            Session::remove('signup_role');
            Session::put('journalist_id', $user->id);

            return redirect()->route('signup_journalist');
        } elseif (Session::get('signup_role') == User::ROLE_PUBLICIST && !$user->is_verified) {
            Session::remove('signup_role');
            Session::remove('hear_about');
            Session::put('publicist_id', $user->id);

            return redirect()->route('signup_publicist');
        } else {
            if (!$user->is_verified) {
                Session::remove('signup_role');

                if ($user->role == User::ROLE_JOURNALIST) {
                    Session::put('journalist_id', $user->id);

                    return redirect()->route('signup_journalist');
                } elseif ($user->role == User::ROLE_PUBLICIST) {
                    Session::put('publicist_id', $user->id);

                    return redirect()->route('signup_publicist');
                } else {
                    Session::put('journalist_id', $user->id);
                    Session::put('publicist_id', $user->id);
                    return redirect()->route('signup_select_role');
                }
            }
            Auth::login($user);

            return redirect()->route('profile');
        }
    }

    public function logout(Request $request) {
        $request->session()->flush();

        Auth::logout();
        return redirect('/');
    }
}