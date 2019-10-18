<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
 
Route::get('/', 'MainController@index')->name('home');

Route::get('faq', [
    'as' => 'faq',
    'uses' => 'MainController@faq'
]);

Route::get('terms', [
    'as' => 'terms',
    'uses' => 'MainController@terms'
]);

Route::get('privacy', [
    'as' => 'privacy',
    'uses' => 'MainController@privacy'
]);

Route::get('refer', [
    'as' => 'referral',
    'uses' => 'MainController@referral'
]);

Route::any('contact', [
    'as' => 'contact',
    'uses' => 'MainController@contact'
]);

Route::any('support', [
    'as' => 'support',
    'uses' => 'MainController@support'
]);

Route::any('mail_stat', [
    'as' => 'mail_stat',
    'uses' => 'MainController@mailStat'
]);

Route::any('mail_clicks', [
    'as' => 'mail_clicks',
    'uses' => 'MainController@mailClicks'
]);

Route::any('mail_opens', [
    'as' => 'mail_opens',
    'uses' => 'MainController@mailOpens'
]);

Route::any('investor_pitch', [
    'as' => 'investor_pitch',
    'uses' => 'MainController@investorPitch'
]);

//AUTH
Route::any('login', [
    'as' => 'login',
    'middleware' => 'auth.not',
    'uses' => 'AuthController@login'
]);

Route::get('logout', [
    'as' => 'logout',
    'middleware' => 'auth',
    'uses' => 'AuthController@logout'
]);

Route::get('signup/select_role', [
    'as' => 'signup_select_role',
    'middleware' => 'auth.not',
    'uses' => 'AuthController@selectRole'
]);

Route::get('register/1', [
    'as' => 'register_1',
    'middleware' => 'auth.not',
    'uses' => 'AuthController@signupSocialAccount'
]);

Route::get('register/2', [
    'as' => 'register_2',
    'middleware' => 'auth.not',
    'uses' => 'AuthController@signupSocialAccount2'
]);

Route::get('register/3', [
    'as' => 'register_3',
    'middleware' => 'auth.not',
    'uses' => 'AuthController@signupSocialAccount3'
]);

Route::any('signup/publicist', [
    'as' => 'signup_publicist',
    'middleware' => 'auth.not',
    'uses' => 'AuthController@signupPublicist'
]);

Route::get('signup/publicist/confirm', [
    'as' => 'signup_publicist_confirm',
    'middleware' => 'auth.not',
    'uses' => 'AuthController@confirmPublicist'
]);

Route::any('signup/vc', [
    'as' => 'signup_venture_capital',
    'middleware' => 'auth.not',
    'uses' => 'VentureCapitalController@signup'
]);

Route::any('signup/journalist', [
    'as' => 'signup_journalist',
    'middleware' => 'auth.not',
    'uses' => 'AuthController@signupJournalist'
]);

Route::any('signup/confirm_email/{code}', [
    'as' => 'auth.confirm-email',
    'middleware' => 'auth.not',
    'uses' => 'AuthController@confirmEmail'
]);

Route::get('auth/{driver}', [
    'as' => 'auth_social_redirect',
    'middleware' => 'auth.not',
    'uses' => 'AuthController@socialRedirect'
]);

Route::get('auth/{driver}/callback', [
    'as' => 'auth_social_callback',
    'middleware' => 'auth.not',
    'uses' => 'AuthController@socialCallback'
]);

Route::get('auth/{name}/landing/{id}', [
    'as' => 'auth_topic_industry_landing',
    'uses' => 'AuthController@industryTopicLanding'
])->where(['id' => '[0-9]+', 'name' => '[a-z]+']);

//PROFILE
Route::any('profile', [
    'as' => 'profile',
    'middleware' => 'auth',
    'uses' => 'ProfileController@index'
]);

Route::any('profile/edit', [
    'as' => 'profile_edit',
    'middleware' => 'auth',
    'uses' => 'ProfileController@edit'
]);

Route::any('profile/reset_password', [
    'as' => 'profile_reset_password',
    'middleware' => 'auth',
    'uses' => 'ProfileController@changePassword'
]);

Route::any('rsvp', [
    'as' => 'rsvp',
    'middleware' => 'auth',
    'uses' => 'ProfileController@rsvp'
]);

Route::get('reset-password-{code}', function () {
    return 1;
})->name('auth.reset-password');

Route::get('admin/test', [
    'as' => 'admin_test',
    'middleware' => 'auth',
    'uses' => 'MainController@test'
]);

//BRANDS
Route::any('publicist/brands', [
    'as' => 'publicist_brands',
    'middleware' => 'auth.journalist',
    'uses' => 'BrandsController@index'
]);

Route::any('publicist/brands/search', [
    'as' => 'publicist_brands_search',
    'middleware' => 'auth.journalist',
    'uses' => 'BrandsController@search'
]);

Route::any('brands', [
    'as' => 'brands',
    'middleware' => 'auth.publicist',
    'uses' => 'BrandsController@publicistBrands'
]);

Route::any('brands/view_modal', [
    'as' => 'brand_view_modal',
    'middleware' => 'auth.publicist',
    'uses' => 'BrandsController@create'
]);

Route::any('brand/delete/{brand_id}', [
    'as' => 'brand_delete',
    'middleware' => 'auth.publicist',
    'uses' => 'BrandsController@delete'
]);

Route::any('brand/track_clicks', [
    'as' => 'brand_track_clicks',
    'uses' => 'BrandsController@trackClicks'
]);

Route::get('brand/view_phone_number', [
    'as' => 'brand_view_phone_number',
    'uses' => 'BrandsController@viewPhoneNumber'
]);

//PITCH
Route::any('publicist/interests', [
    'as' => 'publicist_interests',
    'middleware' => 'auth.publicist',
    'uses' => 'JournalistController@interests'
]);

Route::any('pitch/who/{pitch_id?}', [
    'as' => 'pitch_what',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@what'
]);

Route::any('pitch/what_why/{pitch_id?}', [
    'as' => 'pitch_why',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@why'
]);

Route::any('pitch/where/{pitch_id?}', [
    'as' => 'pitch_where',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@where'
]);

Route::any('pitch/finish', [
    'as' => 'pitch_finish',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@finish'
]);

Route::any('pitch/save/{pitch_id?}', [
    'as' => 'pitch_save',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@saveAsDraft'
]);

Route::any('publicist/new_account', [
    'as' => 'publicist_no_pitch',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@publicistNoPitch'
]);

Route::get('pitch/load_list', [
    'as' => 'pitch_load_list',
    'middleware' => 'auth',
    'uses' => 'PitchController@loadPitches'
]);

Route::get('saved_pitch/load_list', [
    'as' => 'saved_pitch_load_list',
    'middleware' => 'auth',
    'uses' => 'PitchController@loadSavedPitches'
]);

Route::get('pitch_history/load_list', [
    'as' => 'pitch_history_load_list',
    'middleware' => 'auth',
    'uses' => 'PitchController@loadPitchesHistory'
]);

Route::get('pitch/view_modal', [
    'as' => 'pitch_view_modal',
    'middleware' => 'auth',
    'uses' => 'PitchController@viewModal'
]);

Route::get('saved_pitch/view_modal', [
    'as' => 'saved_pitch_view_modal',
    'middleware' => 'auth',
    'uses' => 'PitchController@viewSavedPitchModal'
]);

Route::any('pitch/save/{user_id?}/{code}', [
    'as' => 'pitch_journalist_save',
    'uses' => 'PitchController@journalistSave'
]);

Route::any('pitch/confirm/{code}', [
    'as' => 'pitch_confirm',
    'uses' => 'PitchController@confirm'
]);

Route::any('pitch/cancel/{code}', [
    'as' => 'pitch_cancel',
    'uses' => 'PitchController@cancel'
]);

Route::any('pitch/edit/{code}', [
    'as' => 'pitch_edit',
    'uses' => 'PitchController@edit'
]);

Route::any('pitch/delete/{pitch_id}', [
    'as' => 'pitch_delete',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@delete'
]);

Route::any('email/publicist/{pitch_id}', [
    'as' => 'email_publicist',
    'uses' => 'ServiceController@trackEmailPublicist'
]);

//INQUIRY
Route::any('inquiry/what/{inquiry_id?}', [
    'as' => 'inquiry_what',
    'middleware' => 'auth.journalist',
    'uses' => 'InquiryController@what'
]);

Route::any('inquiry/why/{inquiry_id?}', [
    'as' => 'inquiry_why',
    'middleware' => 'auth.journalist',
    'uses' => 'InquiryController@why'
]);

Route::any('inquiry/where/{inquiry_id?}', [
    'as' => 'inquiry_where',
    'middleware' => 'auth.journalist',
    'uses' => 'InquiryController@where'
]);

Route::any('inquiry/finish', [
    'as' => 'inquiry_finish',
    'middleware' => 'auth.journalist',
    'uses' => 'InquiryController@finish'
]);

Route::any('inquiry/save/{inquiry_id?}', [
    'as' => 'inquiry_save',
    'middleware' => 'auth.journalist',
    'uses' => 'InquiryController@saveAsDraft'
]);

Route::get('inquiry/load_list', [
    'as' => 'inquiry_load_list',
    'middleware' => 'auth',
    'uses' => 'InquiryController@loadInquiries'
]);

Route::get('saved_inquiry/load_list', [
    'as' => 'saved_inquiry_load_list',
    'middleware' => 'auth',
    'uses' => 'InquiryController@loadSavedInquiries'
]);

Route::get('inquiry_history/load_list', [
    'as' => 'inquiry_history_load_list',
    'middleware' => 'auth',
    'uses' => 'InquiryController@loadInquiriesHistory'
]);

Route::get('inquiry/view_modal', [
    'as' => 'inquiry_view_modal',
    'middleware' => 'auth',
    'uses' => 'InquiryController@viewModal'
]);

Route::any('inquiry/save/{user_id?}/{code}', [
    'as' => 'inquiry_publicist_save',
    'uses' => 'InquiryController@publicistSave'
]);

Route::any('inquiry/confirm/{code}', [
    'as' => 'inquiry_confirm',
    'uses' => 'InquiryController@confirm'
]);

Route::any('inquiry/cancel/{code}', [
    'as' => 'inquiry_cancel',
    'uses' => 'InquiryController@cancel'
]);

Route::any('inquiry/edit/{code}', [
    'as' => 'inquiry_edit',
    'uses' => 'InquiryController@edit'
]);

Route::any('inquiry/delete/{inquiry_id}', [
    'as' => 'inquiry_delete',
    'middleware' => 'auth.journalist',
    'uses' => 'InquiryController@delete'
]);

Route::any('email/journalist/{inquiry_id}', [
    'as' => 'email_journalist',
    'uses' => 'ServiceController@trackEmailJournalist'
]);

// VC Commons
Route::get('vccomms/export', [
    'as' => 'comm_vc_export',
    'uses' => 'VentureCapitalController@export'
])->middleware('auth.basic');

Route::any('vccomms/welcome', [
    'as' => 'comm_vc_welcome',
    'uses' => 'VentureCapitalController@welcome'
]);

Route::any('vccomms/finish', [
    'as' => 'comm_vs_finish',
    'uses' => 'VentureCapitalController@finish'
]);

// Registration Confirm Page Tagging: Pardot Template.
Route::get('registration/signup-confirmation-1', [
    'as' => 'signup_confirm_1',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@publicistNoPitch'
]);

Route::get('registration/signup-confirmation-2', [
    'as' => 'signup_confirm_2',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@publicistNoPitch'
]);

Route::get('registration/signup-confirmation-3', [
    'as' => 'signup_confirm_3',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@publicistNoPitch'
]);

Route::get('registration/signup-confirmation-4', [
    'as' => 'signup_confirm_4',
    'middleware' => 'auth.journalist',
    'uses' => 'JournalistController@whatNext'
]);

Route::get('registration/signup-confirmation-5', [
    'as' => 'signup_confirm_5',
    'middleware' => 'auth.journalist',
    'uses' => 'JournalistController@whatNext'
]);

//PUBLICIST
Route::any('outlets', [
    'as' => 'journalist_outlets',
    'uses' => 'MainController@outlets'
]);

Route::post('getMatchingOutlets', [
    'as' => 'get_matching_outlets',
    'uses' => 'MainController@getMatchingoutlets'
]);

Route::any('pitch-2019-june', [
    'as' => 'pitch-2019-june',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@featuredPitchJune'
]);

Route::any('pitch-2019-may', [
    'as' => 'pitch-2019-may',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@featuredPitchMay'
]);

Route::any('pitch-2019-april', [
    'as' => 'pitch-2019-april',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@featuredPitchApril'
]);

Route::any('pitch-2019-march', [
    'as' => 'pitch-2019-march',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@featuredPitchMarch'
]);

Route::any('pitch-2019-february', [
    'as' => 'pitch-2019-february',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@featuredPitchFebruary'
]);

Route::any('featured-pitch-october', [
    'as' => 'featured-pitch-october',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@featuredPitchOctober'
]);

Route::any('featured-pitch-november', [
    'as' => 'featured-pitch-november',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@featuredPitchNovember'
]);

Route::any('featured-pitch-december', [
    'as' => 'featured-pitch-december',
    'middleware' => 'auth.publicist',
    'uses' => 'PitchController@featuredPitchDecember'
]);

Route::get('publicist_support_center', [
    'as' => 'publicist_support_center',
    'middleware' => 'auth.publicist',
    'uses' => 'PublicistController@supportCenter'
]);

//SOCIAL DASHBOARD
Route::get('publicist/social-listening-dashboard', [
    'as' => 'social_listening_dashboard',
    'middleware' => 'auth.publicist',
    'uses' => 'PublicistController@socialListeningDashboard'
]);

Route::get('publicist/social-listening-dashboard-loadmore', [
    'as' => 'social_listening_dashboard_loadmore',
    'middleware' => 'auth.publicist',
    'uses' => 'PublicistController@socialListeningDashboardLoadmore'
]);

Route::post('publicist/save-social-keyword', [
    'as' => 'save_social_keyword',
    'middleware' => 'auth.publicist',
    'uses' => 'PublicistController@saveKeyword'
]);

Route::post('publicist/delete-social-keyword', [
    'as' => 'delete_social_keyword',
    'middleware' => 'auth.publicist',
    'uses' => 'PublicistController@deleteKeyword'
]);

Route::post('publicist/edit-social-keyword', [
    'as' => 'edit_social_keyword',
    'middleware' => 'auth.publicist',
    'uses' => 'PublicistController@editKeyword'
]);

//JOURNALIST
Route::any('journalist/interests', [
    'as' => 'journalist_interests',
    'middleware' => 'auth.journalist',
    'uses' => 'JournalistController@interests'
]);

Route::any('journalist/what_next', [
    'as' => 'journalist_what_next',
    'middleware' => 'auth.journalist',
    'uses' => 'JournalistController@whatNext'
]);

Route::any('journalist/confirmed', [
    'as' => 'journalist_confirmed',
    'middleware' => 'auth.journalist',
    'uses' => 'JournalistController@confirmed'
]);

Route::any('journalist/resend_confirmation', [
    'as' => 'journalist_resend_confirmation',
    'middleware' => 'auth.journalist',
    'uses' => 'JournalistController@resendConfirmationEmail'
]);

Route::get('journalist_support_center', [
    'as' => 'journalist_support_center',
    'middleware' => 'auth.journalist',
    'uses' => 'JournalistController@supportCenter'
]);

//SERVICE
Route::get('service/check_unique_email', [
    'as' => 'service_check_unique_email',
    'uses' => 'ServiceController@checkUniqueEmail'
]);

Route::get('service/check_email', [
    'as' => 'service_check_email',
    'uses' => 'ServiceController@checkEmail'
]);

Route::any('service/load_industries', [
    'as' => 'service_load_industries',
    'uses' => 'ServiceController@loadIndustries'
]);

Route::any('service/load_industry_topics', [
    'as' => 'service_load_industry_topics',
    'uses' => 'ServiceController@loadIndustryTopics'
]);

Route::any('service/load_all_industry_topics', [
    'as' => 'service_load_all_industry_topics',
    'uses' => 'ServiceController@loadAllIndustryTopics'
]);

Route::any('service/load_pitch_topics', [
    'as' => 'service_load_pitch_topics',
    'uses' => 'ServiceController@loadPitchTopics'
]);

Route::any('service/load_pitch_industries', [
    'as' => 'service_load_pitch_industries',
    'uses' => 'ServiceController@loadPitchIndustries'
]);

Route::any('service/resend_user_confirmation/{user_id}', [
    'as' => 'service_resend_user_confirmation',
    'uses' => 'ServiceController@resendUserConfirmation'
]);

Route::any('service/resend_pitch_confirmation/{pitch_id}', [
    'as' => 'service_resend_pitch_confirmation',
    'uses' => 'ServiceController@resendPitchConfirmation'
]);

Route::any('service/load_inquiry_topics', [
    'as' => 'service_load_inquiry_topics',
    'uses' => 'ServiceController@loadInquiryTopics'
]);

Route::any('service/load_inquiry_industries', [
    'as' => 'service_load_inquiry_industries',
    'uses' => 'ServiceController@loadInquiryIndustries'
]);

Route::any('service/resend_inquiry_confirmation/{inquiry_id}', [
    'as' => 'service_resend_inquiry_confirmation',
    'uses' => 'ServiceController@resendInquiryConfirmation'
]);

Route::any('service/load_some_industries', [
    'as' => 'service_load_some_industries',
    'uses' => 'ServiceController@loadSomeIndustries'
]);

Route::any('service/load_some_brands', [
    'as' => 'service_load_some_brands',
    'uses' => 'ServiceController@loadSomeBrands'
]);

Route::any('service/load_searched_industries', [
    'as' => 'service_load_searched_industries',
    'uses' => 'ServiceController@loadSearchedIndustries'
]);

Route::any('service/load_searched_outlets', [
    'as' => 'service_load_searched_outlets',
    'uses' => 'ServiceController@loadSearchedOutlets'
]);

Route::any('service/load_searched_outlets', [
    'as' => 'service_load_searched_outlets',
    'uses' => 'ServiceController@loadSearchedOutlets'
]);

Route::any('/all_topics', [
    'as' => 'service_all_topics',
    'uses' => 'ServiceController@loadAllTopics'
]);

Route::any('/all_industries', [
    'as' => 'service_all_industries',
    'uses' => 'ServiceController@loadAllIndustries'
]);

Route::any('service/set_suggested_industry_topics', [
    'as' => 'service_set_suggested_industry_topics',
    'uses' => 'ServiceController@setSuggestedIndustryTopics'
]);

Route::any('service/get_suggested_industry_topics', [
    'as' => 'service_get_suggested_industry_topics',
    'uses' => 'ServiceController@getSuggestedIndustryTopics'
]);

Route::any('service/update_user_tour', [
    'as' => 'service_update_user_tour',
    'uses' => 'ServiceController@updateUserTour'
]);

Route::any('service/update_notifiable_alerts', [
    'as' => 'service_update_notifiable_alerts',
    'uses' => 'ServiceController@updateNotifiableAlerts'
]);

Route::get('userphotos/{image}', function ($image) {
    $folder = config('app.userphotos_folder');
    $path = storage_path('app/' . $folder . $image);
    if (!File::exists($path)) {
        abort(404);
    }
    $returnImage = Image::make($path);
    return $returnImage->response();
});

Route::get('userphotos/thumb/{image}', function ($image) {
    $folder = config('app.userphotos_folder') . 'thumb/';
    $path = storage_path('app/' . $folder . $image);
    if (!File::exists($path)) {
        abort(404);
    }
    $returnImage = Image::make($path);
    return $returnImage->response();
});

Route::get('mail', function (\Illuminate\Http\Request $request) {

    $mail = $request->input('mail');

    $pitchId = 20;
    $inquiryId = 20;

    switch ($mail) {
        case 'declined-pitch':
            $pitch = \App\Models\Pitch::where('id', $pitchId)->first();

            return view('emails.declined-pitch', [
                'pitch' => $pitch,
            ]);
            break;

        case 'approved-pitch':
            $pitch = \App\Models\Pitch::where('id', $pitchId)->first();

            $indstrs_data = $pitch->listIndustriesAndTopics();
            $user = $pitch->user;

            return view('emails.approved-pitch', [
                'pitch' => $pitch,
                'indstrs_data' => $indstrs_data,
                'user' => $user,
            ]);
            break;
        case 'confirm-pitch':
            $pitch = \App\Models\Pitch::where('id', $pitchId)->first();

            $indstrs_data = $pitch->listIndustriesAndTopics();
            $user = $pitch->user;

            return view('emails.confirm-pitch', [
                'pitch' => $pitch,
                'indstrs_data' => $indstrs_data,
                'user' => $user,
            ]);
            break;
        case 'confirm-pitch-reminder':
            $pitch = \App\Models\Pitch::where('id', $pitchId)->first();

            $indstrs_data = $pitch->listIndustriesAndTopics();
            $user = $pitch->user;

            return view('emails.confirm-pitch-reminder', [
                'pitch' => $pitch,
                'indstrs_data' => $indstrs_data,
                'user' => $user,
            ]);
            break;
        case 'declined-inquiry':
            $inquiry = \App\Models\Inquiry::where('id', $inquiryId)->first();

            return view('emails.declined-inquiry', [
                'inquiry' => $inquiry,
            ]);
            break;

        case 'approved-inquiry':
            $inquiry = \App\Models\Inquiry::where('id', $inquiryId)->first();

            $indstrs_data = $inquiry->listIndustriesAndTopics();
            $user = $inquiry->user;

            return view('emails.approved-inquiry', [
                'inquiry' => $inquiry,
                'indstrs_data' => $indstrs_data,
                'user' => $user,
            ]);
            break;
        case 'confirm-inquiry':
            $inquiry = \App\Models\Inquiry::where('id', $inquiryId)->first();

            $indstrs_data = $inquiry->listIndustriesAndTopics();
            $user = $inquiry->user;

            return view('emails.confirm-inquiry', [
                'inquiry' => $inquiry,
                'indstrs_data' => $indstrs_data,
                'user' => $user,
            ]);
            break;
        case 'confirm-inquiry-reminder':
            $inquiry = \App\Models\Inquiry::where('id', $inquiryId)->first();

            $indstrs_data = $inquiry->listIndustriesAndTopics();
            $user = $inquiry->user;

            return view('emails.confirm-inquiry-reminder', [
                'inquiry' => $inquiry,
                'indstrs_data' => $indstrs_data,
                'user' => $user,
            ]);
            break;
        case 'journalist-account-approved':
            $user = \App\Models\User::where('role', \App\Models\User::ROLE_JOURNALIST)->first();

            return view('emails.journalist-account-approved', [
                'user' => $user,
            ]);
            break;
        case 'journalist-account-denied':
            $user = \App\Models\User::where('role', \App\Models\User::ROLE_JOURNALIST)->first();

            return view('emails.journalist-account-denied', [
                'user' => $user,
            ]);
            break;
        case 'journalist-confirm-email':
            $user = \App\Models\User::where('role', \App\Models\User::ROLE_JOURNALIST)->first();

            return view('emails.journalist-confirm-email', [
                'user' => $user,
            ]);
            break;
        case 'no-matches-follow-up':
            $user = \App\Models\User::where('role', \App\Models\User::ROLE_JOURNALIST)->first();

            return view('emails.no-matches-follow-up', [
                'user' => $user,
            ]);
            break;
        case 'pitch-sent':
            $pitch = \App\Models\Pitch::where('id', $pitchId)->first();

            $indstrs_data = $pitch->listIndustriesAndTopics();
            $user = $pitch->user;

            return view('emails.pitch-sent', [
                'pitch' => $pitch,
                'indstrs_data' => $indstrs_data,
                'user' => $user,
            ]);
            break;
        case 'inquiry-sent':
            $inquiry = \App\Models\Inquiry::where('id', $inquiryId)->first();

            $indstrs_data = $inquiry->listIndustriesAndTopics();
            $user = $inquiry->user;

            return view('emails.inquiry-sent', [
                'inquiry' => $inquiry,
                'indstrs_data' => $indstrs_data,
                'user' => $user,
            ]);
            break;
        case 'publicist-confirm-email':
            $user = \App\Models\User::where('role', \App\Models\User::ROLE_PUBLICIST)->first();

            return view('emails.publicist-confirm-email', [
                'user' => $user,
            ]);
            break;
        case 'reset-password':
            $user = \App\Models\User::where('role', \App\Models\User::ROLE_PUBLICIST)->first();
            $token = 'customToken';
            return view('emails.reset-password', [
                'token' => $token,
                'email' => $user->email
            ]);
            break;
        case 'journalist-daily-email':

            $pitches1 = \App\Models\Pitch::limit(10)->get();

            $pitches = [];
            foreach ($pitches1 as $pitch) {
                $tmp = [];
                $tmp['indstrs_data'] = $pitch->listIndustriesAndTopics();
                $tmp['user'] = $pitch->user;
                $tmp['pitch'] = $pitch;
                $tmp['event'] = $pitch->event;
                $pitches[] = $tmp;
            }

            return view('emails.journalist-daily-email', [
                'pitches' => $pitches,
            ]);
            break;
        case 'publicist-daily-email':

            $inquiries1 = \App\Models\Inquiry::limit(10)->get();

            $inquiries = [];
            foreach ($inquiries1 as $inquiry) {
                $tmp = [];
                $tmp['indstrs_data'] = $inquiry->listIndustriesAndTopics();
                $tmp['user'] = $inquiry->user;
                $tmp['inquiry'] = $inquiry;
                $tmp['event'] = $inquiry->event;
                $inquiries[] = $tmp;
            }

            return view('emails.publicist-daily-email', [
                'inquiries' => $inquiries,
            ]);
            break;
    }
});

// Admin routes
Route::group(['prefix' => 'admin', 'as' => 'admin.', 'namespace' => 'Admin'], function () {

// Admin Rest routes
    Route::group(['middleware' => 'admin'], function () {
        Route::group(['prefix' => 'reports', 'as' => 'reports.', 'namespace' => 'Analytics'], function () {
            Route::group(['prefix' => 'database', 'as' => 'database.'], function () {
                Route::get('users', 'DatabaseController@users')->name('users');
            });
            Route::group(['prefix' => 'journalists', 'as' => 'journalists.'], function () {
                Route::get('pm-stats', 'JournalistController@pitchMailStats')->name('pm-stats');
                Route::get('saved-pitches', 'JournalistController@savedPitches')->name('saved-pitches');
                Route::get('brand-index-sl', 'JournalistController@brandIndexSearchLog')->name('brand-index-sl');
                Route::get('brand-index-cl', 'JournalistController@brandIndexClicksLog')->name('brand-index-cl');
                Route::get('approved', 'JournalistController@approved')->name('approved');
                Route::get('declined', 'JournalistController@declined')->name('declined');
                Route::get('pitch-clicks', 'JournalistController@activeJournalistClicks')->name('pitch-clicks');
                Route::get('pitch-opens', 'JournalistController@activeJournalistOpens')->name('pitch-opens');
                Route::get('last-login', 'JournalistController@activeJournalistLastLogin')->name('last-login');
                Route::get('industry-subscription', 'JournalistController@industrySubscription')->name('industry-subscription');
                Route::get('topic-subscription', 'JournalistController@topicSubscription')->name('topic-subscription');
                Route::get('inquiries', 'JournalistController@inquiries')->name('inquiries');
            });
            Route::group(['prefix' => 'publicists', 'as' => 'publicists.'], function () {
                Route::get('saved-inquiries', 'PublicistController@savedInquiries')->name('saved-inquiries');
                Route::get('brand-index', 'PublicistController@brandIndex')->name('brand-index');
                Route::get('stats', 'PublicistController@stats')->name('stats');
                Route::get('subscriptions', 'PublicistController@subscriptions')->name('subscriptions');
                Route::get('pitches', 'PublicistController@pitches')->name('pitches');

            });
            Route::group(['prefix' => 'trends', 'as' => 'trends.'], function () {
                Route::get('industry-stats', 'TrendsController@industries')->name('industry-stats');
                Route::get('topic-stats', 'TrendsController@topics')->name('topic-stats');
            });
        });

        Route::group(['prefix' => 'rest', 'as' => 'rest.', 'namespace' => 'REST'], function () {
            Route::get('auth/user', 'AuthRestController@getUser')->name('auth.user');
            Route::get('auth/logout', 'AuthRestController@logout')->name('auth.logout');

            Route::group(['prefix' => 'users', 'as' => 'users.'], function () {
                Route::group(['prefix' => '{user}', 'as' => 'resource'], function () {
                    Route::put('resetPassword', 'UserRestController@resetPassword')->name('.resetPassword');
                    Route::delete('soft', 'UserRestController@softDelete')->name('.soft');
                    Route::delete('hard', 'UserRestController@hardDelete')->name('.hard');

                });
            });

            Route::group(['prefix' => 'publicists', 'as' => 'publicists.'], function () {
                Route::get('search', 'PublicistsRestController@search')->name('search');
                Route::get('extended', 'PublicistsRestController@extendedIndex')->name('extended');
                Route::get('filtered', 'PublicistsRestController@filteredIndex')->name('filtered');

                Route::group(['prefix' => '{user}', 'as' => 'resource'], function () {
                    // Sub-resources
                    Route::get('pitches', 'PublicistsRestController@showPitches')->name('.pitches');

                    // Main Resource
                    Route::get('', 'PublicistsRestController@show');
                    Route::put('', 'PublicistsRestController@update');
                });

                Route::get('', 'PublicistsRestController@index');
            });

            Route::group(['prefix' => 'journalists', 'as' => 'journalists.'], function () {
                Route::get('search', 'JournalistsRestController@search')->name('search');
                Route::get('new', 'JournalistsRestController@newUsers')->name('new');
                Route::get('approved', 'JournalistsRestController@approved')->name('approved');
                Route::get('approvedhtml', 'JournalistsRestController@approvedhtml')->name('approvedhtml');                
                Route::get('denied', 'JournalistsRestController@denied')->name('denied');
                Route::get('filtered', 'JournalistsRestController@filteredIndex')->name('filtered');
                Route::get('', 'JournalistsRestController@index');

                Route::group(['prefix' => '{user}', 'as' => 'resource'], function () {
                    // Sub-resources
                    Route::get('inquiries', 'JournalistsRestController@showInquiries')->name('.inquiries');

                    // Main Resource
                    Route::get('', 'JournalistsRestController@show');
                    Route::put('', 'JournalistsRestController@update');
                });
            });

            Route::group(['prefix' => 'administrators', 'as' => 'administrators.'], function () {
                Route::get('search', 'AdministratorsRestController@search')->name('search');
                Route::get('', 'AdministratorsRestController@index');
                Route::post('', 'AdministratorsRestController@create');

                Route::group(['prefix' => '{user}', 'as' => 'resource'], function () {
                    Route::put('', 'AdministratorsRestController@update');
                    Route::delete('', 'AdministratorsRestController@delete');
                });
            });

            Route::group(['prefix' => 'brands', 'as' => 'brands.'], function () {
                Route::group(['prefix' => '{brand}'], function () {
                    Route::group(['as' => 'resource'], function () {
                        Route::get('', 'BrandsRestController@show');
                        Route::put('industries', 'BrandsRestController@updateIndustries')->name('.industries');
                        Route::put('topics', 'BrandsRestController@updateTopics')->name('.topics');
                        Route::put('summary-for-brand', 'BrandsRestController@updateSummaryForBrand')->name('.summary-for-brand');
                        Route::delete('', 'BrandsRestController@delete');
                    });
                });
            });

            Route::group(['prefix' => 'pitches', 'as' => 'pitches.'], function () {
                Route::get('search', 'PitchesRestController@search')->name('search');
                Route::get('new', 'PitchesRestController@newPitches')->name('new');
                Route::get('upcoming', 'PitchesRestController@upcoming')->name('upcoming');
                Route::get('published', 'PitchesRestController@published')->name('published');
                Route::get('rejected', 'PitchesRestController@rejected')->name('rejected');
                Route::get('new-topic', 'PitchesRestController@newTopic')->name('new-topic');
                Route::get('updated', 'PitchesRestController@updated')->name('updated');
                Route::get('filtered', 'PitchesRestController@filteredIndex')->name('filtered');

                Route::group(['prefix' => '{pitch}'], function () {
                    Route::put('accept', 'PitchesRestController@setAccept')->name('set-accept');
                    Route::put('rejected', 'PitchesRestController@setRejected')->name('set-rejected');

                    Route::group(['as' => 'resource'], function () {
                        Route::get('', 'PitchesRestController@show');
                        Route::get('comparison', 'PitchesRestController@comparison')->name('.comparison');
                        Route::get('industries', 'PitchesRestController@showIndustries')->name('.industries');
                        Route::put('industries', 'PitchesRestController@updateIndustries')->name('.industries');
                        Route::put('topics', 'PitchesRestController@updateTopics')->name('.topics');
                        Route::get('topics-for-pitch', 'PitchesRestController@getTopicsForPitch')->name('.topics-for-pitch');
                        Route::put('summary-for-pitch', 'PitchesRestController@updateSummaryForPitch')->name('.summary-for-pitch');
                        Route::put('whys-for-pitch', 'PitchesRestController@updateWhysForPitch')->name('.whys-for-pitch');
                        Route::put('whats-for-pitch', 'PitchesRestController@updateWhatsForPitch')->name('.whats-for-pitch');
                        Route::put('press-release-for-pitch', 'PitchesRestController@updatePressReleaseForPitch')->name('.press-release-for-pitch');
                        Route::put('files-for-pitch', 'PitchesRestController@updateFilesForPitch')->name('.files-for-pitch');
                        Route::put('event-for-pitch', 'PitchesRestController@updateEventForPitch')->name('.event-for-pitch');
                    });
                });
            });

            Route::group(['prefix' => 'inquiries', 'as' => 'inquiries.'], function () {
                Route::get('search', 'InquiriesRestController@search')->name('search');
                Route::get('new', 'InquiriesRestController@newInquiries')->name('new');
                Route::get('upcoming', 'InquiriesRestController@upcoming')->name('upcoming');
                Route::get('published', 'InquiriesRestController@published')->name('published');
                Route::get('rejected', 'InquiriesRestController@rejected')->name('rejected');
                Route::get('new-topic', 'InquiriesRestController@newTopic')->name('new-topic');

                Route::group(['prefix' => '{inquiry}'], function () {
                    Route::put('accept', 'InquiriesRestController@setAccept')->name('set-accept');
                    Route::put('rejected', 'InquiriesRestController@setRejected')->name('set-rejected');

                    Route::group(['as' => 'resource'], function () {
                        Route::get('', 'InquiriesRestController@show');
                        Route::get('industries', 'InquiriesRestController@showIndustries')->name('.industries');
                        Route::put('industries', 'InquiriesRestController@updateIndustries')->name('.industries');
                        Route::put('topics', 'InquiriesRestController@updateTopics')->name('.topics');
                        Route::get('topics-for-inquiry', 'InquiriesRestController@getTopicsForInquiry')->name('.topics-for-inquiry');
                        Route::put('summary-for-inquiry', 'InquiriesRestController@updateSummaryForInquiry')->name('.summary-for-inquiry');
                        Route::put('whys-for-inquiry', 'InquiriesRestController@updateWhysForInquiry')->name('.whys-for-inquiry');
                        Route::put('whats-for-inquiry', 'InquiriesRestController@updateWhatsForInquiry')->name('.whats-for-inquiry');
                        Route::put('files-for-inquiry', 'InquiriesRestController@updateFilesForInquiry')->name('.files-for-inquiry');
                    });
                });
            });

            Route::group(['prefix' => 'industries', 'as' => 'industries.'], function () {
                Route::get('', 'IndustriesRestController@index');
                Route::post('', 'IndustriesRestController@create');

                Route::group(['prefix' => '{industry}', 'as' => 'resource'], function () {
                    Route::put('', 'IndustriesRestController@update');
                    Route::delete('', 'IndustriesRestController@delete');
                });
            });

            Route::group(['prefix' => 'faqs', 'as' => 'faqs.'], function () {
                Route::get('', 'FaqsRestController@index');
                Route::post('', 'FaqsRestController@create');

                Route::group(['prefix' => '{faq}', 'as' => 'resource'], function () {
                    Route::put('', 'FaqsRestController@update');
                    Route::delete('', 'FaqsRestController@delete');
                });
            });

            Route::group(['prefix' => 'topics', 'as' => 'topics.'], function () {
                Route::get('search', 'TopicsRestController@search')->name('search');
                Route::get('', 'TopicsRestController@index');
                Route::get('admin', 'TopicsRestController@adminTopics')->name('admin');
                Route::post('', 'TopicsRestController@create');

                Route::group(['prefix' => '{topic}', 'as' => 'resource'], function () {
                    Route::put('', 'TopicsRestController@update');
                    Route::delete('', 'TopicsRestController@delete');
                });

            });

            Route::group(['prefix' => 'alerts', 'as' => 'alerts.'], function () {
                Route::get('', 'AlertRestController@index');
                Route::post('', 'AlertRestController@create');

                Route::group(['prefix' => '{alert}', 'as' => 'resource'], function () {
                    Route::put('', 'AlertRestController@update');
                    Route::delete('', 'AlertRestController@delete');
                });
            });

            Route::group(['prefix' => 'blog', 'as' => 'blog.'], function () {
                Route::get('', 'BlogPostRestController@index');
                Route::post('', 'BlogPostRestController@create');

                Route::group(['prefix' => '{blogPost}', 'as' => 'resource'], function () {
                    Route::get('', 'BlogPostRestController@show');
                    Route::put('', 'BlogPostRestController@update');
                    Route::delete('', 'BlogPostRestController@delete');
                    Route::put('status', 'BlogPostRestController@updateStatus')->name('.status');
                    Route::put('link', 'BlogPostRestController@updateLink')->name('.link');
                    Route::put('author', 'BlogPostRestController@updateAuthor')->name('.author');
                    Route::get('categories-for-post', 'BlogPostRestController@getCategoriesForPost')->name('.categories-for-post');
                    Route::put('categories', 'BlogPostRestController@updateCategories')->name('.categories');

                    // Temporary Fix
                    Route::post('featured-image', 'BlogPostRestController@updateFeaturedImage')->name('.featured-image');
                });
            });
        });
    });

    Route::get('', 'AdminController@index');
    Route::get('login', 'AdminController@getLogin')->name('login');
    Route::post('login', 'AdminController@postLogin')->name('login');
    Route::get('{all}', 'AdminController@index')->where('all', '.*');
});

// Registration Routes...
$this->get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
$this->post('register', 'Auth\RegisterController@register');

// Password Reset Routes...
$this->get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
$this->post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
$this->get('password-reset-{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
$this->post('password/reset', 'Auth\ResetPasswordController@reset')->name('password.reset_submit');

// Blog routes
Route::group(['prefix' => 'blog', 'as' => 'blog.'], function () {
    Route::get('', 'BlogPostController@blog')->name('index');
    Route::get('{link}', 'BlogPostController@getBlogPlot');
    Route::get('whats_on_my_desk/{number}/{link}', 'BlogPostController@getSeriesBlogPost');
    Route::post('upload/image', 'BlogPostController@imageUpload');
    Route::post('delete/image', 'BlogPostController@deleteImage');
});
