<?php

namespace App\Http\Controllers;

use App\Models\Inquiry;
use App\Models\MailChimp;
use App\Models\MeetUp;
use App\Models\Pitch;
use App\Models\User;
use App\Services\MeetUpService;
use App\Services\UtilityService;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Auth;
use DB;
use Session;

class ProfileController extends Controller
{
    public function index(Request $request)
    {
        $landingTopicIndustry = Session::get('landing_entity');

        if (Auth::user()->role == User::ROLE_JOURNALIST) {
            if(!empty($landingTopicIndustry)){
                return redirect()->route('inquiry_what');
            }

            return $this->journalist($request);

        } else {

            if(!empty($landingTopicIndustry)){
                return redirect()->route('pitch_what');
            }

            return $this->publicist($request);
        }
    }

    public function journalist(Request $request)
    {
        $user = Auth::user();
        $industries = $user->listIndustriesWithTopics(true);

        $saved_pitch = null;
        if ($pitch_id = Session::get('saved_pitch_id')) {
            $saved_pitch = Pitch::find($pitch_id);
        }

        $confirmed_inquiry = null;
        if ($inquiry_id = Session::get('confirmed_inquiry_id')) {
            $confirmed_inquiry = Inquiry::find($inquiry_id);
        }

        $cancelled_inquiry = null;
        if ($inquiry_id = Session::get('cancelled_inquiry_id')) {
            $cancelled_inquiry = Inquiry::find($inquiry_id);
        }

        $rsvp = null;
        if (Session::get('rsvp')) {
            $rsvp = Session::get('rsvp');
        }

        $has_rsvped = null;
        if (!$user->meetUp && $this->checkIfUserCanRsvp($user->email)) {
            $has_rsvped = true;
        }


        if ($user->publication_url == '' || $user->author_url == '') {
            return view('profile.edit', array(
                'user' => $user,
                'company' => 'Publication / Outlet',
                'updateOutlet' => 1,
            ));
        }

        return view('journalist.profile', array(
            'user' => $user,
            'saved_pitch' => $saved_pitch,
            'confirmed_inquiry' => $confirmed_inquiry,
            'cancelled_inquiry' => $cancelled_inquiry,
            'rsvp' => $rsvp,
            'has_rsvped' => $has_rsvped,
            'industries' => $industries,
        ));
    }

    public function publicist(Request $request)
    {
        $user = Auth::user();
        $industries = $user->listIndustriesWithTopics(true);
        $userCompanies = $user->companies()->get();
        $showSocialUrlRemainder = false;
        if ($userCompanies->count()) {
            foreach ($userCompanies as $company) {
                if($company->getSocialLinks()->count() < 2){
                    $showSocialUrlRemainder = true;
                    break;
                }
            }
        }

        $saved_inquiry = null;
        if ($inquiry_id = Session::get('saved_inquiry_id')) {
            $saved_inquiry = Inquiry::find($inquiry_id);
        }

        $confirmed_pitch = null;
        if ($pitch_id = Session::get('confirmed_pitch_id')) {
            $confirmed_pitch = Pitch::find($pitch_id);
        }

        $cancelled_pitch = null;
        if ($pitch_id = Session::get('cancelled_pitch_id')) {
            $cancelled_pitch = Pitch::find($pitch_id);
        }

        $rsvp = null;
        if (Session::get('rsvp')) {
            $rsvp = Session::get('rsvp');
        }

        $has_rsvped = null;
        if ( ! $user->meetUp && $this->checkIfUserCanRsvp($user->email)) {
            $has_rsvped = true;
        }
        return view('publicist.profile', array(
            'user' => $user,
            'rsvp' => $rsvp,
            'has_rsvped' => $has_rsvped,
            'industries' => $industries,
            'userCompanies' => $userCompanies,
            'saved_inquiry' => $saved_inquiry,
            'confirmed_pitch' => $confirmed_pitch,
            'cancelled_pitch' => $cancelled_pitch,
            'showSocialUrlRemainder' => (int)$showSocialUrlRemainder
        ));
    }

    public function edit(Request $request)
    {
        $user = Auth::user();
        $company = '';

        if ($request->isMethod('post')) {
            $data = $request->input() + $request->file();

            $rules = array(
                'email' => 'email|max:100',
                'full_name' => 'required|max:100',
                'company' => 'required|max:255',
                'twitter_url' => 'string|nullable',
                'linked_url' => 'string|nullable',
                'publication_url' => 'string|nullable',
                'author_url' => 'string|nullable',
                'title' => 'required',
                'birthday' => 'required',
            );

            if ($this->validateInput($data, $rules)) {
                try {
                    DB::connection()->getPdo()->beginTransaction();

                    $original_subscribe = $user->subscribe;
                    $data['birthday'] = date('Y-m-d', strtotime($data['birthday']));
                    $user->edit($data);
                    $user->subscribe = $request->input('subscribe') ? 1 : 0;
                    $user->save();

                    // Not best practice but would solve updating tour
                    if (Carbon::now()->diffInMinutes($user->tour->updated_at) > 1 && $user->tour->edit_profile < 3) {
                        $request['type'] = 'edit_profile';
                        $request['increment'] = 1;

                        $service = new ServiceController();
                        $service->updateUserTour($request);
                    }

                    Session::flash('flash', 'The change to your profile has been saved.');

                    if ($user->role == User::ROLE_PUBLICIST) {
                        try {
                            $mailchimp = new MailChimp();
                            if ($user->subscribe) {
                                $params = [
                                    'email' => $user->email,
                                    'name' => $user->full_name,
                                ];
                                $mailchimp->addToList(MailChimp::PUBLICIST_ACCOUNTS, $params);
                            } else {
                                $subscriber_hash = md5($user->email);
                                $result = $mailchimp->deleteFromList(MailChimp::PUBLICIST_ACCOUNTS, $subscriber_hash);
                            }
                        } catch (\Exception $e) {

                        }
                    }

                    DB::connection()->getPdo()->commit();

                    return redirect()->route('profile');
                } catch (\Exception $e) {
                    DB::connection()->getPdo()->rollBack();

                    abort(400, $e->getMessage());
                }
            }
        }

        $user['birthday'] = !empty($user['birthday'])?date('m/d/Y', strtotime($user['birthday'])):'';
        $workAsList = [];
        $senorityList = [];

        if ($user->role == User::ROLE_PUBLICIST) {
            $company = 'Firm / Agency / or Company Name';
            $workAsList = UtilityService::getPublicistWorks();
            $senorityList = UtilityService::getSenorityList();

        } elseif ($user->role == User::ROLE_JOURNALIST) {
            $workAsList = UtilityService::getJournalistWorks();
            $company = 'Publication / Outlet';
        }

        return view('profile.edit', array(
            'user' => $user,
            'workAsList' => $workAsList,
            'senorityList' => $senorityList,
            'company' => $company
        ));
    }

    public function changePassword(Request $request)
    {
        $user = Auth::user();

        if ($request->isMethod('post')) {
            $data = $request->input() + $request->file();

            $rules = array(
                'password' => 'required|confirmed|min:6',
            );

            if ($this->validateInput($data, $rules)) {
                try {
                    DB::connection()->getPdo()->beginTransaction();

                    $user->password = bcrypt($data['password']);
                    $user->save();

                    DB::connection()->getPdo()->commit();

                    return redirect()->route('profile');
                } catch (\Exception $e) {
                    DB::connection()->getPdo()->rollBack();

                    abort(400, $e->getMessage());
                }
            }
        }

        return view('auth.passwords.reset', array(
            'user' => $user,
            'email' => $user->email,
            'token' => null,
            'edit_profile' => true,
        ));
    }

    public function rsvp(Request $request, MeetUp $meetUp)
    {
        $user = Auth::user();

        $meetUp->user_id = $user->id;
        $meetUp->status = MeetUp::STATUS_ACCEPTED;
        $meetUp->save();

        Session::flash('rsvp', MeetUp::STATUS_ACCEPTED);


        return redirect()->route('profile');
    }

    public function checkIfUserCanRsvp($email)
    {
        $authorizedUsers = MeetUpService::getAuthorizedUsers();
        if (in_array($email, $authorizedUsers)) {
            return true;
        } else {
            return null;
        }
    }
}