<?php

namespace App\Http\Controllers\Admin\Analytics;

use App\Models\Inquiry;
use DB;
use App\Http\Controllers\Controller;
use App\Models\PitchMailStatistic;
use App\Models\VwActiveJournalistLogin;
use App\Models\VwBrandIndexCl;
use App\Models\VwBrandIndexSl;
use App\Models\VwJournalistIndustrySubscription;
use App\Models\VwJournalistTopicSubscription;
use App\Models\VwSavedPitch;
use App\Repositories\Journalist\JournalistRepository;
use App\Transformers\Analytics\ActiveJournalistLoginTransformer;
use App\Transformers\Analytics\BrandIndexClTransformer;
use App\Transformers\Analytics\BrandIndexSlTransformer;
use App\Transformers\Analytics\JournalistIndustrySubscriptionTransformer;
use App\Transformers\Analytics\JournalistTopicSubscriptionTransformer;
use App\Transformers\Analytics\SavedPitchTransformer;
use App\Transformers\Pitches\PitchMailStaticsTransformer;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;
use Illuminate\Http\JsonResponse;

class JournalistController extends Controller
{
    protected $journalistRepository;

    public function __construct(JournalistRepository $journalistRepository)
    {
        $this->journalistRepository = $journalistRepository;
    }

    public function pitchMailStats(Request $request): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;

        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $dataResult = PitchMailStatistic::select('*');

        if (!empty($startDate)) {
            $dataResult->where('created_at', '>=', $startDate);
        }
        if (!empty($endDate)) {
            $dataResult->where('created_at', '<=', $endDate);
        }

        $arrayResult = transform($dataResult->get(), new PitchMailStaticsTransformer());

        return new JsonResponse([
            'pitches' => $arrayResult->toArray()
        ], $statusCode);
    }

    public function savedPitches(Request $request): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;

        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $dataResult = VwSavedPitch::select('*');

        if (!empty($startDate)) {
            $dataResult->where('date_saved', '>=', $startDate);
        }
        if (!empty($endDate)) {
            $dataResult->where('date_saved', '<=', $endDate);
        }

        $arrayResult = transform($dataResult->get(), new SavedPitchTransformer());

        return new JsonResponse([
            'savedPitches' => $arrayResult->toArray()
        ], $statusCode);
    }

    public function brandIndexSearchLog(Request $request): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;

        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $dataResult = VwBrandIndexSl::select('*');

        if (!empty($startDate)) {
            $dataResult->where('created_at', '>=', $startDate);
        }
        if (!empty($endDate)) {
            $dataResult->where('created_at', '<=', $endDate);
        }

        $arrayResult = transform($dataResult->get(), new BrandIndexSlTransformer());

        return new JsonResponse([
            'brandIndexSearchLogs' => $arrayResult->toArray()
        ], $statusCode);
    }

    public function brandIndexClicksLog(Request $request): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;

        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $dataResult = VwBrandIndexCl::select('*');

        if (!empty($startDate)) {
            $dataResult->where('created_at', '>=', $startDate);
        }
        if (!empty($endDate)) {
            $dataResult->where('created_at', '<=', $endDate);
        }

        $arrayResult = transform($dataResult->get(), new BrandIndexClTransformer());

        return new JsonResponse([
            'brandIndexClicksLogs' => $arrayResult->toArray()
        ], $statusCode);
    }

    public function approved(): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;
        $journalistReport = $this->journalistRepository->getApprovedJournalistStatistics();

        return new JsonResponse([
            'approvedJournalists' => $journalistReport
        ], $statusCode);
    }

    public function declined(): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;
        $journalistReport = $this->journalistRepository->getDeclinedJournalistStatistics();

        return new JsonResponse([
            'declinedJournalists' => $journalistReport
        ], $statusCode);
    }

    public function activeJournalistClicks(Request $request): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;

        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $clicks = DB::table('pitch_mail_clicks')
            ->join('users', 'pitch_mail_clicks.user_id', '=', 'users.id')
            ->select('pitch_mail_clicks.id', 'pitch_mail_clicks.pitch_id', 'pitch_mail_clicks.user_id',
                'users.full_name', 'users.email', DB::raw('COUNT(*) AS clicks_count'),
                'pitch_mail_clicks.created_at AS last_click');

        if (!empty($startDate) && !empty($endDate))
            $clicks->whereBetween('pitch_mail_clicks.created_at', [$startDate, $endDate]);

        $clicks->groupBy('pitch_mail_clicks.user_id')
            ->orderBy('clicks_count', 'DESC')
            ->orderBy('pitch_mail_clicks.created_at', 'DESC')
            ->get();

        return new JsonResponse([
            'activeJournalistClicks' => $clicks->get()
        ], $statusCode);
    }

    public function activeJournalistOpens(Request $request): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;

        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $opens = DB::table('pitch_views')
            ->join('users', 'pitch_views.user_id', '=', 'users.id')
            ->select('pitch_views.id', 'pitch_views.pitch_id', 'pitch_views.user_id',
                'users.full_name', 'users.email', DB::raw('COUNT(*) AS opens_count'),
                'pitch_views.created_at AS last_view');

        if (!empty($startDate) && !empty($endDate))
            $opens->whereBetween('pitch_views.created_at', [$startDate, $endDate]);

        $opens->groupBy('pitch_views.user_id')
            ->orderBy('opens_count', 'DESC')
            ->orderBy('pitch_views.created_at', 'DESC')
            ->get();

        return new JsonResponse([
            'activeJournalistOpens' => $opens->get()
        ], $statusCode);
    }

    public function activeJournalistLastLogin(Request $request): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $dataResult = VwActiveJournalistLogin::select('*');

        if (!empty($startDate)) {
            $dataResult->where('last_login', '>=', $startDate);
        }
        if (!empty($endDate)) {
            $dataResult->where('last_login', '<=', $endDate);
        }

        $arrayResult = transform($dataResult->get(), new ActiveJournalistLoginTransformer());

        return new JsonResponse([
            'activeJournalistLogin' => $arrayResult->toArray()
        ], $statusCode);
    }

    public function industrySubscription(): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;
        $dataResult = VwJournalistIndustrySubscription::all();
        $arrayResult = transform($dataResult, new JournalistIndustrySubscriptionTransformer());

        return new JsonResponse([
            'journalistIndustrySubscriptions' => $arrayResult->toArray()
        ], $statusCode);
    }

    public function topicSubscription(): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;
        $dataResult = VwJournalistTopicSubscription::all();
        $arrayResult = transform($dataResult, new JournalistTopicSubscriptionTransformer());

        return new JsonResponse([
            'journalistTopicSubscriptions' => $arrayResult->toArray()
        ], $statusCode);
    }

    public function inquiries(Request $request): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;

        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $dataResult = Inquiry::select('id', 'user_id', 'status', 'subject', 'confirmation_code', 'created_at')
            ->withCount('mail_statistics')->withCount('logs')
            ->withCount('views')->withCount('mail_clicks')->withCount('saved_inquiries');

        if (!empty($startDate)) {
            $dataResult->where('created_at', '>=', $startDate);
        }
        if (!empty($endDate)) {
            $dataResult->where('created_at', '<=', $endDate);
        }

        $dataResult->orderBy('created_at', 'DESC');

        $arrayResult = transform($dataResult->get(), new PitchMailStaticsTransformer());

        return new JsonResponse([
            'inquiries' => $arrayResult->toArray()
        ], $statusCode);
    }
}