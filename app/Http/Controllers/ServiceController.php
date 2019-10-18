<?php

namespace App\Http\Controllers;

use App\Models\Industry;
use App\Models\IndustryTopic;
use App\Models\Inquiry;
use App\Models\Pitch;
use App\Models\PitchClickTrack;
use App\Models\User;
use App\Models\UserCompany;
use App\Models\UserTour;
use App\Notifications\InquiryConfirm;
use App\Notifications\JournalistConfirm;
use App\Notifications\PitchConfirm;
use App\Notifications\PublicistConfirmEmail;
use App\Repositories\IndustryRepository;
use App\Repositories\IndustryTopicRepository;
use Auth;
use Illuminate\Http\Request;

use Session;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Redirect;

class ServiceController extends Controller
{
	public function checkUniqueEmail(Request $request) {
		$value = $request->input('value');

		$user = User::getOneBy('email', $value);

		if ($request->input('except_id') && $user && $user->id == $request->input('except_id')) {
			response('ok');
		} elseif ($user) {
			abort(400);
		} else {
			response('ok');
		}
	}

	public function checkEmail(Request $request) {
		$value = $request->input('value');

		$user = User::getOneBy('email', $value);

		if ($user) {
			response('ok');
		} else {
			abort(400);
		}
	}

	public function loadIndustries(Request $request) {
		$filters['term'] = $request->input('term');
		$offset = $request->input('offset', 0);
		$user = null;
		if ($user_id = $request->input('user_id')) {
			$user = User::find($user_id);
		}

		$selected = [];
		if ($user) {
			foreach ($user->industries as $industry) {
				$selected[$industry->id] = $industry->title;
			}
		}
		$industries = IndustryRepository::getAll($filters, 12, $offset);

		$count = 12 * $offset + count($industries['items']);

		return view('common.industry_blocks', array(
			'industries' => $industries,
			'offset' => $offset,
			'user' => $user,
			'selected' => $selected,
			'term' => $filters['term'],
			'count' => $count,
		));
	}

    public function loadAllIndustryTopics(Request $request) {
        $all_topics = IndustryTopicRepository::getBasic();

        return view('common.all_industry_topics', array(
            'all_topics' => $all_topics,
        ));
    }

	public function loadIndustryTopics(Request $request) {
		$industry_id = $request->input('industry_id');
		$industry = Industry::find($industry_id);

		$all_topics = IndustryTopicRepository::getBasic();

		return view('common.industry_topics', array(
			'industry' => $industry,
			'all_topics' => $all_topics,
		));
	}
    public function loadSomeIndustries (Request $request) {
        $filters['term'] = $request->input('term');
        $offset = $request->input('offset', 0);
        $industries = IndustryRepository::getAll($filters, 12, $offset);

        $count = 12 * $offset + count($industries['items']);

        return view('common.append_more_industries', array(
            'industries' => $industries,
            'offset' => $offset,
            'term' => $filters['term'],
            'count' => $count,
        ));
    }

    public function loadSomeBrands (Request $request) {
        $term = $request->input('term');
        $offset = $request->input('offset', 0);
        $industryTerm = $request->input('industry');
        $topicTerm = $request->input('topic');

        if (!$term == null || isset($industryTerm) || isset($topicTerm)) {
            $brandController = new BrandsController();
            $companies = $brandController->searchAndFilter($term, $industryTerm, $topicTerm);
        } else {
            $companies = UserCompany::with(['user' => function ($query) {
                $query->where('role', User::ROLE_PUBLICIST);
            }])->get();
        }

        $allIndustries = Industry::all();
        $allTopics = IndustryTopic::where('is_custom', 0)->get();

        return view('common.append_more_brands', array(
            'totalCompanies' => $companies->count(),
            'companies' => $companies->splice($offset, '12'),
            'offset' => $offset,
            'term' => $term,
            'industries' => $allIndustries,
            'topics' => $allTopics,
        ));
    }

    public function loadSearchedIndustries(Request $request)
    {
        $filters = $request->input('term');
        $offset = $request->input('offset', 0);
        $industriesResult = Industry::where('title', 'LIKE', '%' . $filters . '%')
                ->orWhere('full_title', 'LIKE', '%' . $filters . '%')
                ->orderBy('title', 'asc')
                ->get();

        $count = count($industriesResult);
        $industries['total'] = $count;
        $industries['offset'] = $offset;
        $industries['items'] = $industriesResult;

        return view('common.append_more_industries', array(
            'industries' => $industries,
            'offset' => $offset,
            'term' => $filters,
            'count' => $count,
        ));
    }

    public function loadSearchedOutlets(Request $request)
    {
        $filters = $request->input('term');
        $offset = $request->input('offset', 0);

        $journalists = User::select('company')->outlets()
            ->where('company', 'LIKE', '%' . $filters . '%')
            ->orderBy('company')->distinct()->get();

        return response()->json([
            'offset' => $offset,
            'journalists' => $journalists,
            'term' => $filters,
            'total' => $journalists->count(),

        ]);
    }

    public function loadAllIndustries(Request $request)
    {
        $filters['term'] = $request->input('term');
        $offset = $request->input('offset', 0);
        $industries = IndustryRepository::getAll($filters, 12, $offset);

        $count = 12 * $offset + count($industries['items']);

        return view('common.list_of_industries', array(
            'industries' => $industries,
            'offset' => $offset,
            'term' => $filters['term'],
            'count' => $count,
        ));
    }

    public function loadAllTopics() {

        $all_topics = IndustryTopicRepository::getBasic();

        return view('common.list_of_topics', array(
            'all_topics' => $all_topics
        ));
    }

	public function loadPitchTopics(Request $request) {
        $pitch_id = $request->input('pitch_id');
        $term = $request->input('term');
		$pitch = Pitch::find($pitch_id); 

		$all_topics = IndustryTopicRepository::getBasic(true,$term);

		return view('pitch.industry_topics', array(
			'all_topics' => $all_topics,
            'pitch' => $pitch,
            'term' => $term
		));
	}

	public function loadPitchIndustries(Request $request) {
		$filters['term'] = $request->input('term');
		$offset = $request->input('offset', 0);
		$pitch = null;
		if ($pitch_id = $request->input('pitch_id')) {
			$pitch = Pitch::find($pitch_id);
		}

		$selected = [];
		if ($pitch) {
			foreach ($pitch->industries as $industry) {
				$selected[$industry->id] = $industry->title;
			}
		}

		$landedIndustryId = Session::get('landing_industry_id');

		$industries = IndustryRepository::getAll($filters, 12, $offset);

		$count = 12 * $offset + count($industries['items']);

		return view('pitch.industry_blocks', array(
			'industries' => $industries,
			'offset' => $offset,
			'pitch' => $pitch,
			'selected' => $selected,
			'term' => $filters['term'],
			'count' => $count,
            'landedIndustryId' => $landedIndustryId
		));
	}

    public function loadInquiryTopics(Request $request) {
        $inquiry_id = $request->input('inquiry_id');
        $inquiry = Inquiry::find($inquiry_id);

        $all_topics = IndustryTopicRepository::getBasic(true);

        return view('inquiry.industry_topics', array(
            'all_topics' => $all_topics,
            'inquiry' => $inquiry,
        ));
    }

    public function loadInquiryIndustries(Request $request) {
        $filters['term'] = $request->input('term');
        $offset = $request->input('offset', 0);
        $inquiry = null;
        if ($inquiry_id = $request->input('inquiry_id')) {
            $inquiry = Inquiry::find($inquiry_id);
        }

        $selected = [];
        if ($inquiry) {
            foreach ($inquiry->industries as $industry) {
                $selected[$industry->id] = $industry->title;
            }
        }
        $industries = IndustryRepository::getAll($filters, 12, $offset);

        $count = 12 * $offset + count($industries['items']);

        $landedIndustryId = Session::get('landing_industry_id');

        return view('inquiry.industry_blocks', array(
            'industries' => $industries,
            'offset' => $offset,
            'inquiry' => $inquiry,
            'selected' => $selected,
            'term' => $filters['term'],
            'count' => $count,
            'landedIndustryId' => $landedIndustryId
        ));
    }

	public function trackEmailPublicist(Request $request, $pitch_id) {
		$pitch = Pitch::find($pitch_id);

		if ($pitch) {
			PitchClickTrack::track($pitch->id);

			return view('pitch.placeholder_mailto', array(
				'pitch' => $pitch,
			));
		}
	}

    public function trackEmailJournalist(Request $request, $inquiry_id) {
        $inquiry = Inquiry::find($inquiry_id);

        if ($inquiry) {
            InquiryClickTrack::track($inquiry->id);

            return view('inquiry.placeholder_mailto', array(
                'inquiry' => $inquiry,
            ));
        }
    }

	public function resendUserConfirmation(Request $request, $user_id) {
		$user = User::find($user_id);

		if ($user && !$user->is_verified) {
			if ($user->role == User::ROLE_JOURNALIST) {
				$user->notify(new JournalistConfirm());
			} else {
				$user->notify(new PublicistConfirmEmail());
			}
		}

		return response('');
	}

	public function resendPitchConfirmation(Request $request, $pitch_id) {
		$pitch = Pitch::find($pitch_id);

		if ($pitch && $pitch->status == Pitch::STATUS_DRAFT) {
			$user = $pitch->user;
			$user->notify(new PitchConfirm($pitch));
		}

		return response('');
	}

    public function resendInquiryConfirmation(Request $request, $inquiry_id) {
        $inquiry = Inquiry::find($inquiry_id);

        if ($inquiry && $inquiry->status == Inquiry::STATUS_DRAFT) {
            $user = $inquiry->user;
            $user->notify(new InquiryConfirm($inquiry));
        }

        return response('');
    }

    public function getSuggestedIndustryTopics(Request $request) {
        $suggested_industry_topics = Session::get('suggested_industry_topics');
        $suggested_industry = Session::get('suggested_industry');
        $suggested_industry_topics_name = Session::get('suggested_industry_topics_name');
        return [$suggested_industry_topics, $suggested_industry, $suggested_industry_topics_name];
    }

    public function setSuggestedIndustryTopics(Request $request) {
	    $suggested_industry_array = json_decode($request->input('suggested_industry'));
        $suggested_industry_topics_name = [];
        $suggested_industry = Industry::find($suggested_industry_array->industry)->title;
        foreach ($suggested_industry_array->topics as $topic){
            $industry_topic = IndustryTopic::find($topic);
            array_push($suggested_industry_topics_name, $industry_topic->title);
        }
        Session::put('suggested_industry_topics', $request->input('suggested_industry'));
        Session::put('suggested_industry', $suggested_industry);
        Session::put('suggested_industry_topics_name', $suggested_industry_topics_name);
    }

    public function updateUserTour(Request $request) {
	    $user = Auth::user();

	    if(!empty($user)){
            $userTour = UserTour::firstOrNew(['user_id' => $user->id ]);
            $userTour->save();
            $userTour->increment($request->input('type'), $request->input('increment'));
            $userTour->save();
        }
    }

    public function updateNotifiableAlerts(Request $request) {
        $user = Auth::user();

        if(!empty($user)){
            $user->alerts()->notifiable()->update(['notifiable' => 0]);
        }

        return response()->json(['message' => 'OK']);
    }
}