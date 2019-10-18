<?php

namespace App\Http\Controllers\Admin\REST;

use App\Models\Inquiry;
use App\Models\InquiryFile;
use App\Models\InquiryIndustry;
use App\Repositories\Industry\IndustryRepositoryInterface;
use App\Repositories\Topic\TopicRepositoryInterface;
use App\Repositories\InquiryIndustry\InquiryIndustryRepositoryInterface;
use App\Repositories\Inquiry\InquiryRepositoryInterface;
use App\Transformers\Industries\IndustryTransformer;
use App\Transformers\InquiryIndustries\InquiryIndustryTransformer;
use App\Transformers\Inquiries\ExtendedInquiryTransformer;
use App\Transformers\Inquiries\InquiryTransformer;
use App\Transformers\Inquiries\InquiryWithNewTopicTransformer;
use App\Transformers\Inquiries\SimpleInquiryTransformer;
use App\Transformers\Topics\TopicTransformer;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class InquiriesRestController extends Controller
{
    /**
     * @var InquiryRepositoryInterface
     */
    protected $inquiryRepository;

    /**
     * @var InquiryIndustryRepositoryInterface
     */
    protected $inquiryIndustryRepository;

    /**
     * @var IndustryRepositoryInterface
     */
    protected $industryRepository;

    /**
     * @var TopicRepositoryInterface
     */
    protected $topicRepository;

    /**
     * InquiriesRestController constructor.
     * @param InquiryRepositoryInterface $inquiryRepository
     * @param InquiryIndustryRepositoryInterface $inquiryIndustryRepository
     * @param IndustryRepositoryInterface $industryRepository
     * @param TopicRepositoryInterface $topicRepository
     */
    public function __construct(
        InquiryRepositoryInterface $inquiryRepository,
        InquiryIndustryRepositoryInterface $inquiryIndustryRepository,
        IndustryRepositoryInterface $industryRepository,
        TopicRepositoryInterface $topicRepository
    ) {
        $this->inquiryRepository = $inquiryRepository;
        $this->inquiryIndustryRepository = $inquiryIndustryRepository;
        $this->industryRepository = $industryRepository;
        $this->topicRepository = $topicRepository;
    }

    /**
     * @param Request $request
     * @param SimpleInquiryTransformer $simpleInquiryTransformer
     * @return JsonResponse
     */
    public function search (Request $request, SimpleInquiryTransformer $simpleInquiryTransformer) : JsonResponse
    {
        $items = $this
            ->inquiryRepository
            ->setEasyLoad($simpleInquiryTransformer->getEasyLoad())
            ->search($request);
        return new JsonResponse(transform($items, $simpleInquiryTransformer));
    }

    /**
     * @param Request $request
     * @param ExtendedInquiryTransformer $extendedInquiryTransformer
     * @return JsonResponse
     */
    public function newInquiries (Request $request, ExtendedInquiryTransformer $extendedInquiryTransformer) : JsonResponse
    {
        $items = $this
            ->inquiryRepository
            ->setEasyLoad($extendedInquiryTransformer->getEasyLoad())
            ->setOrderBy('updated_at', $request->input('sort', 'desc'))
            ->getByCredentials(['status' => Inquiry::STATUS_NEW]);

        return new JsonResponse(transform($items, $extendedInquiryTransformer));
    }

    /**
     * @param Request $request
     * @param ExtendedInquiryTransformer $extendedInquiryTransformer
     * @return JsonResponse
     */
    public function upcoming (Request $request, ExtendedInquiryTransformer $extendedInquiryTransformer) : JsonResponse
    {
        $items = $this
            ->inquiryRepository
            ->setEasyLoad($extendedInquiryTransformer->getEasyLoad())
            ->setOrderBy('updated_at', $request->input('sort', 'desc'))
            ->getByCredentials(['status' => Inquiry::STATUS_UPCOMING]);

        return new JsonResponse(transform($items, $extendedInquiryTransformer));
    }

    /**
     * @param Request $request
     * @param ExtendedInquiryTransformer $extendedInquiryTransformer
     * @return JsonResponse
     */
    public function published (Request $request, ExtendedInquiryTransformer $extendedInquiryTransformer) : JsonResponse
    {
        $items = $this
            ->inquiryRepository
            ->setEasyLoad($extendedInquiryTransformer->getEasyLoad())
            ->setOrderBy('sent_at', $request->input('sort', 'desc'))
            ->getByCredentials(['status' => Inquiry::STATUS_PUBLISHED]);

        return new JsonResponse(transform($items, $extendedInquiryTransformer));
    }

    /**
     * @param Request $request
     * @param ExtendedInquiryTransformer $extendedInquiryTransformer
     * @return JsonResponse
     */
    public function rejected (Request $request, ExtendedInquiryTransformer $extendedInquiryTransformer) : JsonResponse
    {
        $items = $this
            ->inquiryRepository
            ->setEasyLoad($extendedInquiryTransformer->getEasyLoad())
            ->setOrderBy('updated_at', $request->input('sort', 'desc'))
            ->getByCredentials(['status' => Inquiry::STATUS_REJECTED]);

        return new JsonResponse(transform($items, $extendedInquiryTransformer));
    }

    /**
     * @param Inquiry $inquiry
     * @param ExtendedInquiryTransformer $extendedInquiryTransformer
     * @return JsonResponse
     */
    public function show (Inquiry $inquiry, ExtendedInquiryTransformer $extendedInquiryTransformer) : JsonResponse
    {
        return new JsonResponse(transform($inquiry, $extendedInquiryTransformer));
    }

    /**
     * @param Inquiry $inquiry
     * @return JsonResponse
     */
    public function showIndustries (Inquiry $inquiry) : JsonResponse
    {
        $items = $this->inquiryIndustryRepository->getByCredentials(['inquiry_id' => $inquiry->id]);
        return new JsonResponse(transform($items, new IndustryTransformer()));
    }

    /**
     * @param Inquiry $inquiry
     * @param Request $request
     * @param InquiryIndustryTransformer $transformer
     * @return JsonResponse
     */
    public function updateIndustries (Inquiry $inquiry, Request $request, InquiryIndustryTransformer $transformer) : JsonResponse
    {
        $inquiryIndustries = $this->inquiryIndustryRepository->getByCredentials(['inquiry_id' => $inquiry->id]);

        $firstInquiryIndustry = $inquiryIndustries->first();

        if ($firstInquiryIndustry) {
            $oldTopicsIds = $inquiryIndustries->first()->topics->pluck('id');
        } else {
            $oldTopicsIds = [];
        }


        // Deleting
        $inquiryIndustries->each(function (InquiryIndustry $inquiryIndustry) {
            $inquiryIndustry->delete();
        });

        $ids = array_unique($request->input('ids'));

        $inquiryIndustries = new Collection();

        foreach ($ids as $id) {
            $inquiryIndustry = new InquiryIndustry([
                'industry_id' => $id,
                'inquiry_id' => $inquiry->id
            ]);

            $inquiryIndustry->save();

            foreach ($oldTopicsIds as $oldTopicId) {
                $inquiryIndustry->topics()->attach($oldTopicId);
            }

            $inquiryIndustries->push($inquiryIndustry);
        }

        return new JsonResponse(transform($inquiryIndustries, $transformer));
    }

    /**
     * @param Inquiry $inquiry
     * @param Request $request
     * @param TopicTransformer $transformer
     * @return JsonResponse
     */
    public function updateTopics (Inquiry $inquiry, Request $request, TopicTransformer $transformer) : JsonResponse
    {
        $ids = array_unique($request->input('ids'));

        $inquiryIndustries = $this->inquiryIndustryRepository->getByCredentials(['inquiry_id' => $inquiry->id]);

        $inquiryIndustries->each(function (InquiryIndustry $inquiryIndustry) use ($ids) {
            $inquiryIndustry->topics()->detach();

            $inquiryIndustry->topics()->attach($ids);
        });

        $t = $inquiry->inquiry_industries()->first()->topics;

        return new JsonResponse(transform($t, $transformer));
    }

    /**
     * @param Inquiry $inquiry
     * @param Request $request
     * @param InquiryTransformer $inquiryTransformer
     * @return JsonResponse
     */
    public function updateSummaryForInquiry (Inquiry $inquiry, Request $request, InquiryTransformer $inquiryTransformer) : JsonResponse
    {
        $summaries = array_unique($request->input('summaries'));

        $inquiry->subject = $summaries[0];
        $inquiry->company = $summaries[1];
        $inquiry->website = $summaries[2];

        $inquiry->save();

        return new JsonResponse(transform($inquiry, $inquiryTransformer));
    }

    /**
     * @param Inquiry $inquiry
     * @param Request $request
     * @param InquiryTransformer $inquiryTransformer
     * @return JsonResponse
     */
    public function updateWhysForInquiry (Inquiry $inquiry, Request $request, InquiryTransformer $inquiryTransformer) : JsonResponse
    {
        $whys = array_unique($request->input('whys'));

        $i = 1;
        foreach ($whys as $why) {
            $whyNumber = 'why_point_'.$i;
            $inquiry->$whyNumber = $why;
            $i++;
        }

        $inquiry->save();

        return new JsonResponse(transform($inquiry, $inquiryTransformer));
    }

    /**
     * @param Inquiry $inquiry
     * @param Request $request
     * @param InquiryTransformer $inquiryTransformer
     * @return JsonResponse
     */
    public function updateWhatsForInquiry (Inquiry $inquiry, Request $request, InquiryTransformer $inquiryTransformer) : JsonResponse
    {
        $whats = array_unique($request->input('whats'));

        $i = 1;
        foreach ($whats as $what) {
            $whatNumber = 'what_point_'.$i;
            $inquiry->$whatNumber = $what;
            $i++;
        }

        $inquiry->save();

        return new JsonResponse(transform($inquiry, $inquiryTransformer));
    }

    /**
     * @param Inquiry $inquiry
     * @param Request $request
     * @param InquiryTransformer $inquiryTransformer
     * @return JsonResponse
     */
    public function updateFilesForInquiry (Inquiry $inquiry, Request $request, InquiryTransformer $inquiryTransformer) : JsonResponse
    {
        $files = array_unique($request->input('files'));
        $deletedFiles = array_unique($request->input('deletedFiles'));

        foreach ($deletedFiles as $deletedFile) {
            Storage::disk('s3')->delete($deletedFile['url']);
            $deletedFile = PitchFile::find($deletedFile['id']);
            $deletedFile->delete();
        }

        foreach ($files as $file) {
            $inquiryFile = InquiryFile::find($file['id']);
            $inquiryFile->name = $file['name'];
        }

        $inquiryFile->save();

        return new JsonResponse(transform($inquiry, $inquiryTransformer));
    }

    /**
     * @param Inquiry $inquiry
     * @param TopicTransformer $transformer
     * @return JsonResponse
     */
    public function getTopicsForInquiry (Inquiry $inquiry, TopicTransformer $transformer) : JsonResponse
    {
        $items = new Collection();
        $items = $items->merge($this->topicRepository->setOrderBy('title', 'asc')->getByCredentials(['is_custom' => false]));

        $customItems = $inquiry->topics()->where('is_custom', true);

        if ($customItems->count()) {
            $items = $items->merge($customItems);
        }

        return new JsonResponse(transform($items, $transformer));
    }

    /**
     * @param Inquiry $inquiry
     * @param ExtendedInquiryTransformer $extendedInquiryTransformer
     * @return JsonResponse
     */
    public function setAccept (Inquiry $inquiry, ExtendedInquiryTransformer $extendedInquiryTransformer) : JsonResponse
    {
        $inquiry = $this
            ->inquiryRepository
            ->setEasyLoad($extendedInquiryTransformer->getEasyLoad())
            ->update($inquiry, [
                'status' => Inquiry::STATUS_UPCOMING,
                'accepted_at' => Carbon::now()
            ]);

        return new JsonResponse(transform($inquiry, $extendedInquiryTransformer));
    }

    /**
     * @param Inquiry $inquiry
     * @param ExtendedInquiryTransformer $extendedInquiryTransformer
     * @return JsonResponse
     */
    public function setRejected (Inquiry $inquiry, ExtendedInquiryTransformer $extendedInquiryTransformer) : JsonResponse
    {
        $inquiry = $this
            ->inquiryRepository
            ->setEasyLoad($extendedInquiryTransformer->getEasyLoad())
            ->update($inquiry, [
                'status' => Inquiry::STATUS_REJECTED
            ]);

        return new JsonResponse(transform($inquiry, $extendedInquiryTransformer));
    }

    /**
     * @param Request $request
     * @param InquiryWithNewTopicTransformer $inquiryWithNewTopicTransformer
     * @return JsonResponse
     */
    public function newTopic (Request $request, InquiryWithNewTopicTransformer $inquiryWithNewTopicTransformer) : JsonResponse
    {
        $items = $this
            ->inquiryRepository
            ->setEasyLoad($inquiryWithNewTopicTransformer->getEasyLoad())
            ->setOrderBy('updated_at', $request->input('sort', 'desc'))
            ->getWithNewTopic();

        return new JsonResponse(transform($items, $inquiryWithNewTopicTransformer));
    }
}
