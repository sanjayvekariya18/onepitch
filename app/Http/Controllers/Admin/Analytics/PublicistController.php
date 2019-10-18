<?php

namespace App\Http\Controllers\Admin\Analytics;

use App\Http\Controllers\Controller;
use App\Models\InquiryMailStatistic;
use App\Models\Pitch;
use App\Models\VwBrandIndex;
use App\Models\VwSavedInquiry;
use App\Repositories\Publicist\PublicistRepository;
use App\Transformers\Analytics\BrandIndexTransformer;
use App\Transformers\Analytics\SavedInquiryTransformer;
use App\Transformers\Inquiries\InquiryMailStatisticsTransformer;
use App\Transformers\Pitches\PitchMailStaticsTransformer;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;
use Illuminate\Http\JsonResponse;

class PublicistController extends Controller
{
    protected $publicistRepository;

    public function __construct(PublicistRepository $publicistRepository)
    {
        $this->publicistRepository = $publicistRepository;
    }

    public function inquiryMailStats(Request $request): JsonResponse{
        $statusCode = HttpFoundationResponse::HTTP_OK;

        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $dataResult = InquiryMailStatistic::select('*');

        if (!empty($startDate)) {
            $dataResult->where('created_at', '>=', $startDate);
        }
        if (!empty($endDate)) {
            $dataResult->where('created_at', '<=', $endDate);
        }

        $arrayResult = transform($dataResult->get(), new InquiryMailStatisticsTransformer());

        return new JsonResponse([
            'inquiryMailStats' => $arrayResult->toArray()
        ], $statusCode);
    }

    public function savedInquiries(Request $request): JsonResponse{
        $statusCode = HttpFoundationResponse::HTTP_OK;

        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $dataResult = VwSavedInquiry::select('*');

        if (!empty($startDate)) {
            $dataResult->where('date_saved', '>=', $startDate);
        }
        if (!empty($endDate)) {
            $dataResult->where('date_saved', '<=', $endDate);
        }

        $arrayResult = transform($dataResult->get(), new SavedInquiryTransformer());

        return new JsonResponse([
            'savedInquiries' => $arrayResult->toArray()
        ], $statusCode);
    }

    public function brandIndex(Request $request): JsonResponse{
        $statusCode = HttpFoundationResponse::HTTP_OK;

        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $dataResult = VwBrandIndex::select('*');

        if (!empty($startDate)) {
            $dataResult->where('created_at', '>=', $startDate);
        }
        if (!empty($endDate)) {
            $dataResult->where('created_at', '<=', $endDate);
        }

        $arrayResult = transform($dataResult->get(), new BrandIndexTransformer());

        return new JsonResponse([
            'brandIndex' => $arrayResult->toArray()
        ], $statusCode);
    }

    public function stats(): JsonResponse{
        $statusCode = HttpFoundationResponse::HTTP_OK;
        $arrayResult = $this->publicistRepository->getPublicistSubscriptions();

        return new JsonResponse([
            'publicistStats' => $arrayResult
        ], $statusCode);
    }

    public function subscriptions(): JsonResponse{
        $statusCode = HttpFoundationResponse::HTTP_OK;
        $arrayResult = $this->publicistRepository->getPublicistSubscriptions();

        return new JsonResponse([
            'publicistSubscriptions' => $arrayResult
        ], $statusCode);
    }

    public function pitches(Request $request): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;

        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $dataResult = Pitch::select('id', 'user_id', 'status', 'subject', 'confirmation_code', 'created_at')
            ->withCount('mail_statistics')->withCount('logs')
            ->withCount('views')->withCount('mail_clicks')->withCount('saved_pitches');

        if (!empty($startDate)) {
            $dataResult->where('created_at', '>=', $startDate);
        }
        if (!empty($endDate)) {
            $dataResult->where('created_at', '<=', $endDate);
        }

        $dataResult->orderBy('created_at', 'DESC');

        $arrayResult = transform($dataResult->get(), new PitchMailStaticsTransformer());

        return new JsonResponse([
            'pitches' => $arrayResult->toArray()
        ], $statusCode);
    }
}