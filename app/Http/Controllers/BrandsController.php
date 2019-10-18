<?php

namespace App\Http\Controllers;

use App\Models\Industry;
use App\Models\IndustryTopic;
use App\Models\Inquiry;
use App\Models\MeetUp;
use App\Models\Pitch;
use App\Models\User;
use App\Models\UserCompany;
use App\Models\UserCompanyClicksLog;
use App\Models\UserCompanySearchLog;
use App\Services\MeetUpService;
use Auth;
use App\Models\MailChimp;
use Carbon\Carbon;
use Illuminate\Http\Request;

use Session;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;
use DB;

class BrandsController extends Controller
{
    public function index(Request $request) {
        $companies = UserCompany::with(['user' => function ($query) {
            $query->where('role', User::ROLE_PUBLICIST);
        }])->orderBy('company','ASC')->get();

        $industries = Industry::all();
        $topics = IndustryTopic::where('is_custom', 0)->get();

        return view('brand.index', array(
            'totalCompanies' => $companies->count(),
            'companies' => $companies->splice(0,12),
            'industries' => $industries,
            'topics' => $topics,
            'term' => null,
            'industryTerm' => null,
            'topicTerm' => null
        ));
    }

    public function search(Request $request) {
        $term = $request->input('q');
        $industryTerm = $request->input('industry');
        $topicTerm = $request->input('topic');

        if (!$term == null || isset($industryTerm) || isset($topicTerm)) {
            $authUser = Auth::user();
            $userSearch = UserCompanySearchLog::create(['user_id' => $authUser->id, 'term' => $term, 'industry_id' =>$industryTerm, 'topic_id' => $topicTerm ]);
        }

        $companies = $this->searchAndFilter($term, $industryTerm, $topicTerm);

        $allIndustries = Industry::all();
        $allTopics = IndustryTopic::where('is_custom', 0)->get();

        return view('brand.index', array(
            'totalCompanies' => $companies->count(),
            'companies' => $companies->splice(0,12),
            'term' => $term,
            'industryTerm' => $industryTerm,
            'topicTerm' => $topicTerm,
            'industries' => $allIndustries,
            'topics' => $allTopics,
        ));
    }

    public function searchAndFilter($term, $industryTerm, $topicTerm) {
        $brands = UserCompany::complexSearch($term)->orderBy('company','ASC')->get();
        $industries = Industry::complexSearch($term)->get();
        $topics = IndustryTopic::complexSearch($term)->get();

        $userCompanies = collect([]);

        $brandsIndustries = $industries->pluck('user_company_industries');
        $brandsIndustriesCollection = collect([]);
        foreach ($brandsIndustries as $brandsIndustry) {
            $brandsIndustriesCollection = $brandsIndustriesCollection->merge($brandsIndustry);
        }
        $brandsIndustryCompany = $brandsIndustriesCollection->pluck('user_company');

        $brandsTopics = $topics->pluck('user_company_industry_topics');
        $brandsTopicsCollection = collect([]);

        foreach ($brandsTopics as $brandsTopic) {
            $brandsTopicsCollection = $brandsTopicsCollection->merge($brandsTopic);
        }
        $brandsTopicsCompany = $brandsTopicsCollection->pluck('user_company_industry')->unique('user_company_id')->pluck('user_company');

        $userCompanies = $userCompanies->merge($brands)->merge($brandsIndustryCompany)->merge($brandsTopicsCompany);

        if ($term == null || strlen($term) < 4) {
            $userCompanies = UserCompany::with(['user' => function ($query) {
                $query->where('role', User::ROLE_PUBLICIST);
            }])->orderBy('company','ASC')->get();
        }

        if (isset($industryTerm)) {
            $usersBrandsIndustriesCollection = collect([]);

            $usersBrandsIndustries = $userCompanies->pluck('industries');
            foreach ($usersBrandsIndustries as $usersBrandsIndustry) {
                $usersBrandsIndustriesCollection = $usersBrandsIndustriesCollection->merge($usersBrandsIndustry);
            }
            $userCompanies = $usersBrandsIndustriesCollection->where('industry_id', $industryTerm)->pluck('user_company');
        }

        if (isset($topicTerm)) {
            $usersBrandsTopicsCollection = collect([]);

            $usersBrandsIndustries = $userCompanies->pluck('industries');
            foreach ($usersBrandsIndustries as $usersBrandsIndustry) {
                $usersBrandsTopicsCollection = $usersBrandsTopicsCollection->merge($usersBrandsIndustry[0]->topics);
            }
            $userCompanies = $usersBrandsTopicsCollection->where('topic_id', $topicTerm)->pluck('user_company_industry')->pluck('user_company');
        }

        return $userCompanies;
    }

    public function publicistBrands (Request $request) {
        $user = Auth::user();

        return view('publicist.brands', array(
            'user' => $user,
        ));
    }

    public function create(Request $request) {
        $brand = [];
        $brandIndustries = [];
        $brandTopics = [];
        $user = Auth::user();

        if ($brand_id = $request->input('brand_id')) {
            $brand = UserCompany::find($brand_id);
            $brandIndustries = $brand->industries->pluck('industry_id');
            $brandTopics = $brand->industries[0]->topics->pluck('topic_id');
        }

        if ($request->isMethod('post')) {
            $data = $request->input();
            if (isset($data['brand_id'])) {
                UserCompany::editCompany($data);
            } else {
                if (!$user->mailnuggets_id) {
                    $mailnuggets = new \mailNuggets();
                    $resp = $mailnuggets->addThrowaway();
                    $xml = simplexml_load_string($resp);

                    if (isset($xml->throwaway->name)) {
                        $user->mailnuggets_id = getMailnuggetsEmail($xml->throwaway->name);
                        $user->save();
                    }
                }
                $data['user_id'] = $user->id;

                UserCompany::addCompany($data);
            }

            return \redirect('profile');
        }

        $industries = Industry::all();
        $topics = IndustryTopic::where('is_custom', 0)->get();

        return view('publicist.brand_modal', array(
            'brand' => $brand,
            'brandIndustries' => $brandIndustries,
            'brandTopics' => $brandTopics,
            'industries' => $industries,
            'topics' => $topics,
        ));
    }

    public function delete(Request $request, $brand_id) {
        UserCompany::deleteCompany($brand_id);

        return \redirect('brands');
    }

    public function trackClicks(Request $request) {
        $user = Auth::user();
        $brand_user_id = $request->input('brand_user_id');
        $clicked = $request->input('clicked');

        UserCompanyClicksLog::create(['user_id' => $user->id, 'brand_user_id' => $brand_user_id, 'clicked' => $clicked ]);
    }

    public function viewPhoneNumber(Request $request) {
        $user_id = $request->input('user_id');

        if ($user = User::find($user_id)) {

            return view('brand.view-number', array(
                'user' => $user,
            ));
        }

        return response('');
    }
}