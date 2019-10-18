<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Mail\SupportMail;
use App\Models\FaqCategory;
use App\Models\Inquiry;
use App\Models\InquiryLog;
use App\Models\InquiryMailStatistic;
use App\Models\Pitch;
use App\Models\PitchLog;
use App\Models\PitchMailStatistic;
use App\Models\User;
use App\Models\UserCompany;
use App\Models\UserCompanyMailStatistic;
use App\Notifications\ForwardInquiryEmail;
use App\Notifications\ForwardPitchEmail;
use App\Repositories\InquiryRepository;
use App\Repositories\PitchRepository;
use App\Services\InstagramService;
use App\Services\UtilityService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Auth;
use App\Models\MailChimp;
use Session;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;

class MainController extends Controller
{
    /**
     * @var InstagramService
     */
    protected $instagramService;

    /**
     * MainController constructor.
     * @param InstagramService $instagramService
     */
    public function __construct(InstagramService $instagramService)
    {
        $this->instagramService = $instagramService;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
//        try {
//            $instMedia = new Collection($this->instagramService->getMedia(9));
//        } catch (InstagramException $exception) {
//            $instMedia = new Collection();
//        }

        $oEmbedEndpoint = 'http://vimeo.com/api/oembed';

        $videoUrl = 'https://vimeo.com/255108804';

        $jsonUrl = $oEmbedEndpoint . '.json?url=' . rawurlencode($videoUrl) . '&color=ffd831&portrait=0&title=0&byline=0';

        $curl = curl_init($jsonUrl);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_TIMEOUT, 30);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        $return = curl_exec($curl);
        curl_close($curl);

        $oEmbed = json_decode($return);

//        return view('main.index', ['instMedia' => $instMedia, 'oEmbed' => $oEmbed]);
        return view('main.index', ['oEmbed' => $oEmbed]);
    }

    public function faq()
    {
        $faqCategory = FaqCategory::with('faqs')->get();

        return view('main.faq', [
            'faqCategories' => $faqCategory,
        ]);
    }

    public function terms()
    {
        return view('main.terms');
    }

    public function privacy()
    {
        return view('main.privacy');
    }

    public function outlets(Request $request)
    {
        $journalists = User::select('company')->outlets()
            ->orderBy('company')->distinct()->get();

        return view('journalist.outlets', [
            'journalists' => $journalists,
            'total' => $journalists->count(),

        ]);
    }
    
    public function getMatchingoutlets(Request $request)
    {
        $industryArr = json_decode($request['industry']);
        $topicArr = json_decode($request['topic']);
        $userIds = UserCompany::join('user_company_industries', 'user_company_industries.user_company_id', 'user_companies.id')
        ->join('user_company_industry_topics', 'user_company_industry_topics.user_company_industry_id', 'user_company_industries.id')
        ->whereIn('user_company_industries.industry_id', $industryArr)
        ->whereIn('user_company_industry_topics.topic_id', $topicArr)
        ->distinct()->pluck('user_companies.user_id')->toArray();        
        $outlets = User::select('users.company')
        // ->where('users.role',1)
        ->where('users.company','<>','')
        ->whereIn('users.id', $userIds)
        ->orderBy('users.company')
        ->get();
        return response()->json($outlets);
    }

    public function referral(Request $request)
    {
        if ($code = $request->input('code')) {
            $referral = User::getOneBy('referral_hash', $code);
            if ($referral) {
                Session::put('referral_id', $referral->id);
            }
        }

        return view('main.referral', [
            'is_logged' => Auth::check()
        ]);
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function contact(Request $request)
    {
        $is_sent = false;
        $errors = [];
        if ($request->isMethod('post')) {
            $data = $request->input();

            $rules = [
                'name' => 'required',
                'email' => 'required|email',
                'hear_about' => 'required',
                'message' => 'required'
            ];

            if ($this->validateInput($data, $rules)) {
                $data['message_text'] = $data['message'];
                $mail = new ContactMail($data);
                $mail->subject('Hello OnePitch!');
                $mail->from(config('mail.from.address'), $data['name']);
                $mail->to(config('mail.from.address'));
                \Mail::send($mail);

                $mailchimp = new MailChimp();
                $mailchimp->addToList(MailChimp::CONTACT_FORM_LIST, $data);

                $is_sent = true;
            } else {
                $errors = $this->validationErrors();
            }
        }

        return view('main.contact', [
            'errors' => $errors,
            'is_sent' => $is_sent,
        ]);
    }

    public function mailStat(Request $request)
    {
        try {
            $mail = $request->input();
            $track = null;

            $deliveredTo = UtilityService::emailFromString($mail['to']);
            $deliveredTo = filter_var($deliveredTo, FILTER_VALIDATE_EMAIL) ? $deliveredTo :
                UtilityService::emailFromString($mail['delivered-to']);
            $replayTo = UtilityService::emailFromString($mail['return-path']);

            if (!empty($deliveredTo)) {
                if ($pitch = Pitch::getOneBy('mailnuggets_id', $deliveredTo)) {
                    $track = PitchMailStatistic::track($pitch, $replayTo);
                    $pitch->user->notify(new ForwardPitchEmail($replayTo, $mail));
                } elseif ($inquiry = Inquiry::getOneBy('mailnuggets_id', $deliveredTo)) {
                    $track = InquiryMailStatistic::track($inquiry, $replayTo);
                    $inquiry->user->notify(new ForwardInquiryEmail($replayTo, $mail));
                } elseif ($publicist = User::getOneBy('mailnuggets_id', $deliveredTo)) {
                    $track = UserCompanyMailStatistic::track($publicist, $replayTo);
                    $publicist->notify(new ForwardInquiryEmail($replayTo, $mail));
                }
            }

            $orderLog = new Logger('mail_stat');
            $orderLog->pushHandler(new StreamHandler(storage_path('logs/mail_stat.log')), Logger::INFO);
            $orderLog->info($deliveredTo, $mail);

        } catch (\Exception $e) {
            return new JsonResponse([
                'success' => false,
                'message' => $e->getMessage()
            ]);
        }

        return new JsonResponse([
            'success' => true,
            'delivered_to' => $deliveredTo,
            'return_path' => $replayTo,
            'track' => $track,
            'message' => 'Mail processed successfully'
        ]);
    }

    public function mailClicks(Request $request)
    {
        $events = $request['mandrill_events'];
        $decodedEvents = json_decode($events);

        if (count($decodedEvents)) {
            foreach ($decodedEvents as $event) {
                if (strrpos($event->msg->subject, '[OnePitch]') === 0) {
                    $user = User::where('email', $event->msg->email)->first();

                    if (empty($user)) {
                        continue;
                    }

                    if ($user->role === User::ROLE_JOURNALIST) {
                        $pitchIds = PitchLog::getUserPitchIds($event->msg->email, $event->msg->ts);

                        $position = strrpos($event->url, 'www.');
                        $url = $position === false ? $event->url : substr($event->url, $position + 4);

                        PitchRepository::markClicked($pitchIds, $url, $event->msg->email);
                    } elseif ($user->role === User::ROLE_PUBLICIST) {
                        $inquiryIds = InquiryLog::getUserInquiryIds($event->msg->email, $event->msg->ts);

                        $position = strrpos($event->url, 'www.');
                        $url = $position === false ? $event->url : substr($event->url, $position + 4);

                        InquiryRepository::markClicked($inquiryIds, $url, $event->msg->email);
                    }
                }
            }
        }

        $clicksLog = new Logger('mail_clicks');
        $clicksLog->pushHandler(new StreamHandler(storage_path('logs/mail_clicks.log')), Logger::INFO);
        $clicksLog->info($events);
    }

    public function mailOpens(Request $request)
    {
        $events = $request['mandrill_events'];

        foreach (json_decode($events) as $event) {
            if (strrpos($event->msg->subject, '[OnePitch]') === 0) {
                if (User::where('email', $event->msg->email)->first()->role === User::ROLE_JOURNALIST) {
                    $pitchIds = PitchLog::getUserPitchIds($event->msg->email, $event->msg->ts);

                    PitchRepository::markOpened($pitchIds);
                    PitchRepository::markViews($pitchIds, $event->msg->email);
                } elseif (User::where('email', $event->msg->email)->first()->role === User::ROLE_PUBLICIST) {
                    $inquiryIds = InquiryLog::getUserInquiryIds($event->msg->email, $event->msg->ts);

                    InquiryRepository::markOpened($inquiryIds);
                    InquiryRepository::markViews($inquiryIds, $event->msg->email);
                }
            }
        }

        $opensLog = new Logger('mail_opens');
        $opensLog->pushHandler(new StreamHandler(storage_path('logs/mail_opens.log')), Logger::INFO);
        $opensLog->info($events);
    }

    public function support(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->input();

            $rules = [
                'user_name' => 'required',
                'user_email' => 'required|email',
                'user_message' => 'required'
            ];

            if ($this->validateInput($data, $rules)) {
                $data['message_text'] = $data['user_message'];
                $mail = new SupportMail($data);
                $mail->subject('Need Support!');
                $mail->from(config('mail.from.address'), $data['user_name']);
                $mail->to(config('mail.from.address'));
                \Mail::send($mail);

                $is_sent = true;
            } else {
                $errors = $this->validationErrors();
            }
        }
    }

    public function investorPitch(Request $request)
    {

        return view('common.investor_pitch', [
            'is_logged' => Auth::check()
        ]);
    }

    public function test()
    {
        $pitches = Pitch::has('mail_statistics')->with('user.pitches','industries')
            ->withCount('files', 'press_release', 'mail_statistics')->get();
        $data = [];
        foreach($pitches as $pitch){
            $indTop = (object)$pitch->listIndustriesAndTopics();

            $data[] = [
                'pitch_id' => $pitch->id,
                'publicist_id' => $pitch->user_id,
                'responses' => $pitch->mail_statistics_count,
                'pitches_user' => $pitch->user->pitches->count(),
                'industries' => $pitch->industries->count(),
                'topics' => $indTop->topics->count(),
                'subject_line_charcter_length' => strlen($pitch->subject),
                'subject_line_word_count' => str_word_count($pitch->subject),
                'word_count_what' => str_word_count($pitch->what_point_1),
                'word_count_why' => str_word_count($pitch->why_point_1.' '.$pitch->why_point_2.' '.$pitch->why_point_3),
                'hyperlink' => !empty($pitch->website) ? 'yes' : 'no',
                'press_release' => !$pitch->press_release_count ? 'no' : 'yes',
                'media_attachment' => !$pitch->files_count ? 'no' : 'yes',
            ];
        }
    }
}
