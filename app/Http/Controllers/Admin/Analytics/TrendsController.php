<?php

namespace App\Http\Controllers\Admin\Analytics;

use App\Http\Controllers\Controller;
use App\Models\Industry;
use App\Models\IndustryTopic;
use App\Repositories\Industry\IndustryRepository;
use App\Repositories\IndustryTopicRepository;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;
use Illuminate\Http\JsonResponse;

class TrendsController extends Controller
{
    protected $industryRepository;
    protected $industryTopicRepository;

    public function __construct(IndustryRepository $industryRepository, IndustryTopicRepository $industryTopicRepository)
    {
        $this->industryRepository = $industryRepository;
        $this->industryTopicRepository = $industryTopicRepository;
    }

    public function industries(): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;
        $industries = Industry::all();
        $industriesReport = [];

        foreach ($industries as $industry) {
            $industryArray = [];
            $industryArray['id'] = (int)$industry->id;
            $industryArray['title'] = $industry->title;
            $industryArray['pitches_submitted'] = (int)$this->industryRepository->getNumberOfAllSubmittedPitch($industry->id);
            $industryArray['pitches_drafted'] = (int)$this->industryRepository->getNumberOfAllDraftPitch($industry->id);
            $industryArray['pitches_sent'] = (int)$this->industryRepository->getNumberOfAllSentPitch($industry->id);
            $industryArray['pitches_rejected'] = (int)$this->industryRepository->getNumberOfAllRejectedPitch($industry->id);
            $industryArray['pitches_responses'] = (int)$this->industryRepository->getNumberOfAllRespondedPitch($industry->id);
            $industryArray['journalist_subscriptions'] = (int)$this->industryRepository->getNumberOfAllJournalistsSubscribed($industry->id);
            $industryArray['publicist_subscriptions'] = (int)$this->industryRepository->getNumberOfAllPublicistSubscribed($industry->id);
            array_push($industriesReport, $industryArray);
        }

        return new JsonResponse([
            'industries' => $industriesReport
        ], $statusCode);
    }

    public function topics(): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;
        $topics = IndustryTopic::all();
        $topicsReport = [];

        foreach ($topics as $topic) {
            $topicArray = [];
            $topicArray['id'] = (int)$topic->id;
            $topicArray['title'] = $topic->title;
            $topicArray['pitches_submitted'] = (int)$this->industryTopicRepository->getNumberOfAllSubmittedPitch($topic->id);
            $topicArray['pitches_drafted'] = (int)$this->industryTopicRepository->getNumberOfAllDraftPitch($topic->id);
            $topicArray['pitches_sent'] = (int)$this->industryTopicRepository->getNumberOfAllSentPitch($topic->id);
            $topicArray['pitches_rejected'] = (int)$this->industryTopicRepository->getNumberOfAllRejectedPitch($topic->id);
            $topicArray['pitches_responses'] = (int)$this->industryTopicRepository->getNumberOfAllRespondedPitch($topic->id);
            $topicArray['journalist_subscriptions'] = (int)$this->industryTopicRepository->getNumberOfAllJournalistsSubscribed($topic->id);
            $topicArray['publicist_subscriptions'] = (int)$this->industryTopicRepository->getNumberOfAllPublicistSubscribed($topic->id);
            array_push($topicsReport, $topicArray);
        }

        return new JsonResponse([
            'topics' => $topicsReport
        ], $statusCode);
    }
}