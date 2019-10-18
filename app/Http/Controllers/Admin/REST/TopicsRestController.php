<?php

namespace App\Http\Controllers\Admin\REST;

use App\Http\Controllers\Controller;
use App\Models\IndustryTopic;
use App\Repositories\Topic\TopicRepositoryInterface;
use App\Transformers\Topics\SimpleTopicTransformer;
use App\Transformers\Topics\TopicTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TopicsRestController extends Controller
{
    /**
     * @var TopicRepositoryInterface
     */
    protected $topicRepository;

    /**
     * TopicsRestController constructor.
     * @param TopicRepositoryInterface $topicRepository
     */
    public function __construct(TopicRepositoryInterface $topicRepository)
    {
        $this->topicRepository = $topicRepository;
    }

    /**
     * @return JsonResponse
     */
    public function index () : JsonResponse
    {
        $items = $this->topicRepository->getAll();
        return new JsonResponse(transform($items, new TopicTransformer()));
    }

    /**
     * @return JsonResponse
     */
    public function adminTopics () : JsonResponse
    {
        $items = $this
            ->topicRepository
            ->getByCredentials(['is_custom' => 0]);
        return new JsonResponse(transform($items, new TopicTransformer()));
    }

    /**
     * @param Request $request
     * @param SimpleTopicTransformer $simpleTopicTransformer
     * @return JsonResponse
     */
    public function search (Request $request, SimpleTopicTransformer $simpleTopicTransformer) : JsonResponse
    {
        $items = $this->topicRepository->search($request);
        return new JsonResponse(transform($items, $simpleTopicTransformer));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function create (Request $request) : JsonResponse
    {
        $topic = new IndustryTopic($request->all());

        $topic->save();

        return new JsonResponse(transform($topic, new TopicTransformer()));
    }

    /**
     * @param Request $request
     * @param IndustryTopic $topic
     * @return JsonResponse
     */
    public function update (Request $request, IndustryTopic $topic) : JsonResponse
    {
        $topic->fill($request->all())->save();

        return new JsonResponse(transform($topic, new TopicTransformer()));
    }

    /**
     * @param IndustryTopic $topic
     * @return JsonResponse
     */
    public function delete (IndustryTopic $topic) : JsonResponse
    {
        try {
            $topic->delete();
        } catch (\Exception $exception) {
            return new JsonResponse(null, 500);
        }

        return new JsonResponse(null, 200);
    }
}
