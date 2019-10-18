<?php

namespace App\Http\Controllers\Admin\REST;

use App\Models\Pitch;
use App\Models\PitchEdit;
use App\Models\PitchFile;
use App\Models\PitchIndustry;
use App\Models\PitchPressRelease;
use App\Repositories\Industry\IndustryRepositoryInterface;
use App\Repositories\Topic\TopicRepositoryInterface;
use App\Repositories\PitchIndustry\PitchIndustryRepositoryInterface;
use App\Repositories\Pitch\PitchRepositoryInterface;
use App\Transformers\Industries\IndustryTransformer;
use App\Transformers\PitchIndustries\PitchIndustryTransformer;
use App\Transformers\Pitches\ExtendedPitchTransformer;
use App\Transformers\Pitches\ExtendedPitchAuthorTransformer;
use App\Transformers\Pitches\PitchTransformer;
use App\Transformers\Pitches\PitchWithNewTopicTransformer;
use App\Transformers\Pitches\SimplePitchTransformer;
use App\Transformers\Topics\TopicTransformer;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

class PitchesRestController extends Controller
{
    /**
     * @var PitchRepositoryInterface
     */
    protected $pitchRepository;

    /**
     * @var PitchIndustryRepositoryInterface
     */
    protected $pitchIndustryRepository;

    /**
     * @var IndustryRepositoryInterface
     */
    protected $industryRepository;

    /**
     * @var TopicRepositoryInterface
     */
    protected $topicRepository;

    /**
     * PitchesRestController constructor.
     * @param PitchRepositoryInterface $pitchRepository
     * @param PitchIndustryRepositoryInterface $pitchIndustryRepository
     * @param IndustryRepositoryInterface $industryRepository
     * @param TopicRepositoryInterface $topicRepository
     */
    public function __construct(
        PitchRepositoryInterface $pitchRepository,
        PitchIndustryRepositoryInterface $pitchIndustryRepository,
        IndustryRepositoryInterface $industryRepository,
        TopicRepositoryInterface $topicRepository
    )
    {
        $this->pitchRepository = $pitchRepository;
        $this->pitchIndustryRepository = $pitchIndustryRepository;
        $this->industryRepository = $industryRepository;
        $this->topicRepository = $topicRepository;
    }

    /**
     * @param Request $request
     * @param SimplePitchTransformer $simplePitchTransformer
     * @return JsonResponse
     */
    public function search(Request $request, SimplePitchTransformer $simplePitchTransformer): JsonResponse
    {
        $items = $this
            ->pitchRepository
            ->setEasyLoad($simplePitchTransformer->getEasyLoad())
            ->search($request);
        return new JsonResponse(transform($items, $simplePitchTransformer));
    }

    /**
     * @param Request $request
     * @param ExtendedPitchTransformer $extendedPitchTransformer
     * @return JsonResponse
     */
    public function filteredIndex(Request $request, ExtendedPitchTransformer $extendedPitchTransformer): JsonResponse
    {
        $dates = array($request->input('startDate'), $request->input('endDate'));
        $items = $this
            ->pitchRepository
            ->setEasyLoad($extendedPitchTransformer->getEasyLoad())
            ->setOrderBy('created_at', $request->input('sort', 'desc'))
            ->getByDateFilter($dates, 'sent_at', 'pitch');

        return new JsonResponse(transform($items, $extendedPitchTransformer));
    }

    /**
     * @param Request $request
     * @param ExtendedPitchTransformer $extendedPitchTransformer
     * @return JsonResponse
     */
    public function newPitches(Request $request, ExtendedPitchTransformer $extendedPitchTransformer): JsonResponse
    {
        $items = $this
            ->pitchRepository
            ->setEasyLoad($extendedPitchTransformer->getEasyLoad())
            ->setOrderBy('updated_at', $request->input('sort', 'desc'))
            ->getByCredentials(['status' => Pitch::STATUS_NEW]); 

        return new JsonResponse(transform($items, $extendedPitchTransformer));
    }

    /**
     * @param Request $request
     * @param ExtendedPitchTransformer $extendedPitchTransformer
     * @return JsonResponse
     */
    public function upcoming(Request $request, ExtendedPitchTransformer $extendedPitchTransformer): JsonResponse
    {
        $items = $this
            ->pitchRepository
            ->setEasyLoad($extendedPitchTransformer->getEasyLoad())
            ->setOrderBy('updated_at', $request->input('sort', 'desc'))
            ->getByCredentials(['status' => Pitch::STATUS_UPCOMING]);

        return new JsonResponse(transform($items, $extendedPitchTransformer));
    }

    /**
     * @param Request $request
     * @param PitchTransformer $pitchTransformer
     * @return JsonResponse
     */
    public function updated(Request $request, PitchTransformer $pitchTransformer): JsonResponse
    {
        $pitches = Pitch::has('pitchEdits')->with(['pitchEdits' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }])->get();

        return new JsonResponse(transform($pitches, $pitchTransformer));
    }

    /**
     * @param Pitch $pitch
     * @param ExtendedPitchTransformer $extendedPitchTransformer
     * @return JsonResponse
     */
    public function comparison(Pitch $pitch, ExtendedPitchTransformer $extendedPitchTransformer): JsonResponse
    {
        $pitchList = $pitch->pitchEdits()->orderBy('created_at', 'desc')->get();
        $editedPitch1 = $pitchList->first();
        $author = $pitch->user;

        $response = [
            'stats' => [
                'editCount' => $pitchList->count(),
            ],
            'edit' => [
                'subject' => $editedPitch1->subject,
                'company' => $editedPitch1->company,
                'website' => $editedPitch1->website,
                'what_point_1' => $editedPitch1->what_point_1,
                'why_point_1' => $editedPitch1->why_point_1,
                'why_point_2' => $editedPitch1->why_point_2,
                'why_point_3' => $editedPitch1->why_point_3,
                'created_at' => $editedPitch1->created_at->format('Y-m-d H:i:s'),
                'updated_at' => $editedPitch1->updated_at->format('Y-m-d H:i:s'),
            ],
            'original' => [
                'author' => [
                    'id' => $author->id,
                    'full_name' => $author->full_name,
                    'company' => $author->company,
                    'email' => $author->email,
                    'roleName' => $author->getRoleName(),
                    'photo' => $author->getPhotoUrl(),
                    'socialLinks' => $author->getSocials()
                ],
                'subject' => $pitch->subject,
                'company' => $pitch->company,
                'website' => $pitch->website,
                'what_point_1' => $pitch->what_point_1,
                'why_point_1' => $pitch->why_point_1,
                'why_point_2' => $pitch->why_point_2,
                'why_point_3' => $pitch->why_point_3,
                'submitted' => $pitch->uploaded_at,
                'accepted' => $pitch->accepted_at,
                'opens' => $pitch->opens,
                'clicks' => $pitch->clicks,
                'sent_amount' => $pitch->sent_amount,
            ]
        ];

        return new JsonResponse($response);
    }

    public function getInitialsAttribute ($name) : string
    {
        $initials = '';
        $words = preg_split("/[\s,_-]+/", preg_replace('/[^A-Za-z0-9\s\-]/', '', $name));
        foreach ($words as $w) {
            $initials .= $w[0];
        }
        return $initials;
    }

    /**
     * @param Request $request
     * @param ExtendedPitchTransformer $extendedPitchTransformer
     * @return JsonResponse
     */
    public function published(Request $request, ExtendedPitchAuthorTransformer $extendedPitchTransformer): JsonResponse
    {
        $statusCode = HttpFoundationResponse::HTTP_OK;             

        /* $offset = 0;
        $perPage = 20;

        $paginate = $this
            ->pitchRepository
            ->setEasyLoad($extendedPitchTransformer->getEasyLoad())
            ->setOrderBy('sent_at', $request->input('sort', 'desc'))
            ->getByCredentials(['status' => Pitch::STATUS_PUBLISHED], $perPage);

        if ($page = $request->input('page')) {
            $paginateJson = json_decode(json_encode($paginate));
            $offset = $paginateJson->per_page * ($paginateJson->current_page - 1);
        }

        $items = $this
            ->pitchRepository
            ->setEasyLoad($extendedPitchTransformer->getEasyLoad())
            ->setOrderBy('sent_at', $request->input('sort', 'desc'))
            ->getByCredentials(['status' => Pitch::STATUS_PUBLISHED])
            // temporary fix
            ->splice($offset, $perPage);

        return new JsonResponse([$paginate,$statusCode,transform($items, $extendedPitchTransformer)]); */

                       
        $items = $this
            ->pitchRepository
            ->setEasyLoad($extendedPitchTransformer->getEasyLoad())
            ->setOrderBy('sent_at', $request->input('sort', 'desc'))
            ->getByCredentials(['status' => Pitch::STATUS_PUBLISHED])
            ->splice(0,200);

        /* $author = array();
        foreach($items as $key => $item){
            $author[$key]['initial'] = $this->getInitialsAttribute($item->user->full_name);
            $author[$key]['photo'] = !empty($item->user->photo)?"https://s3-.amazonaws.com/".$item->user->photo:"";            
        }     

        return new JsonResponse([
            'published' => $items,
            'authors' => $author
        ], $statusCode); */

        return new JsonResponse([transform($items, $extendedPitchTransformer)]);
    }

    /**
     * @param Request $request
     * @param ExtendedPitchTransformer $extendedPitchTransformer
     * @return JsonResponse
     */
    public function rejected(Request $request, ExtendedPitchTransformer $extendedPitchTransformer): JsonResponse
    {
        $items = $this
            ->pitchRepository
            ->setEasyLoad($extendedPitchTransformer->getEasyLoad())
            ->setOrderBy('updated_at', $request->input('sort', 'desc'))
            ->getByCredentials(['status' => Pitch::STATUS_REJECTED]);

        return new JsonResponse(transform($items, $extendedPitchTransformer));
    }


    /**
     * @param Pitch $pitch
     * @param ExtendedPitchTransformer $extendedPitchTransformer
     * @return JsonResponse
     */
    public function show(Pitch $pitch, ExtendedPitchTransformer $extendedPitchTransformer): JsonResponse
    {
        return new JsonResponse(transform($pitch, $extendedPitchTransformer));
    }

    /**
     * @param Pitch $pitch
     * @return JsonResponse
     */
    public function showIndustries(Pitch $pitch): JsonResponse
    {
        $items = $this->pitchIndustryRepository->getByCredentials(['pitch_id' => $pitch->id]);
        return new JsonResponse(transform($items, new IndustryTransformer()));
    }

    /**
     * @param Pitch $pitch
     * @param Request $request
     * @param PitchIndustryTransformer $transformer
     * @return JsonResponse
     */
    public function updateIndustries(Pitch $pitch, Request $request, PitchIndustryTransformer $transformer): JsonResponse
    {
        $pitchIndustries = $this->pitchIndustryRepository->getByCredentials(['pitch_id' => $pitch->id]);

        $firstPitchIndustry = $pitchIndustries->first();

        if ($firstPitchIndustry) {
            $oldTopicsIds = $pitchIndustries->first()->topics->pluck('id');
        } else {
            $oldTopicsIds = [];
        }


        // Deleting
        $pitchIndustries->each(function (PitchIndustry $pitchIndustry) {
            $pitchIndustry->delete();
        });

        $ids = array_unique($request->input('ids'));

        $pitchIndustries = new Collection();

        foreach ($ids as $id) {
            $pitchIndustry = new PitchIndustry([
                'industry_id' => $id,
                'pitch_id' => $pitch->id
            ]);

            $pitchIndustry->save();

            foreach ($oldTopicsIds as $oldTopicId) {
                $pitchIndustry->topics()->attach($oldTopicId);
            }

            $pitchIndustries->push($pitchIndustry);
        }

        return new JsonResponse(transform($pitchIndustries, $transformer));
    }

    /**
     * @param Pitch $pitch
     * @param Request $request
     * @param TopicTransformer $transformer
     * @return JsonResponse
     */
    public function updateTopics(Pitch $pitch, Request $request, TopicTransformer $transformer): JsonResponse
    {
        $ids = array_unique($request->input('ids'));

        $pitchIndustries = $this->pitchIndustryRepository->getByCredentials(['pitch_id' => $pitch->id]);

        $pitchIndustries->each(function (PitchIndustry $pitchIndustry) use ($ids) {
            $pitchIndustry->topics()->detach();

            $pitchIndustry->topics()->attach($ids);
        });

        $t = $pitch->pitch_industries()->first()->topics;

        return new JsonResponse(transform($t, $transformer));
    }

    /**
     * @param Pitch $pitch
     * @param Request $request
     * @param PitchTransformer $pitchTransformer
     * @return JsonResponse
     */
    public function updateSummaryForPitch(Pitch $pitch, Request $request, PitchTransformer $pitchTransformer): JsonResponse
    {
        $summaries = array_unique($request->input('summaries'));

        $pitch->subject = $summaries[0];
        $pitch->company = $summaries[1];
        $pitch->website = $summaries[2];

        $pitch->save();

        return new JsonResponse(transform($pitch, $pitchTransformer));
    }

    /**
     * @param Pitch $pitch
     * @param Request $request
     * @param ExtendedPitchTransformer $pitchTransformer
     * @return JsonResponse
     */
    public function updateEventForPitch(Pitch $pitch, Request $request, ExtendedPitchTransformer $pitchTransformer): JsonResponse
    {
        $event = array_unique($request->input('event'));

        $pitch->event->title = $event[0];
        $pitch->event->date_from = $event[1];
        $pitch->event->date_to = $event[2];
        $pitch->event->time_from = $event[3];
        $pitch->event->time_to = $event[4];
        $pitch->event->timezone = $event[5];

        $pitch->event->save();

        return new JsonResponse(transform($pitch, $pitchTransformer));
    }

    /**
     * @param Pitch $pitch
     * @param Request $request
     * @param PitchTransformer $pitchTransformer
     * @return JsonResponse
     */
    public function updateWhysForPitch(Pitch $pitch, Request $request, PitchTransformer $pitchTransformer): JsonResponse
    {
        $whys = array_unique($request->input('whys'));

        $i = 1;
        foreach ($whys as $why) {
            $whyNumber = 'why_point_' . $i;
            $pitch->$whyNumber = $why;
            $i++;
        }

        $pitch->save();

        return new JsonResponse(transform($pitch, $pitchTransformer));
    }

    /**
     * @param Pitch $pitch
     * @param Request $request
     * @param PitchTransformer $pitchTransformer
     * @return JsonResponse
     */
    public function updateWhatsForPitch(Pitch $pitch, Request $request, PitchTransformer $pitchTransformer): JsonResponse
    {
        $whats = array_unique($request->input('whats'));

        $i = 1;
        foreach ($whats as $what) {
            $whatNumber = 'what_point_' . $i;
            $pitch->$whatNumber = $what;
            $i++;
        }

        $pitch->save();

        return new JsonResponse(transform($pitch, $pitchTransformer));
    }

    /**
     * @param Pitch $pitch
     * @param Request $request
     * @param PitchTransformer $pitchTransformer
     * @return JsonResponse
     */
    public function updatePressReleaseForPitch(Pitch $pitch, Request $request, PitchTransformer $pitchTransformer): JsonResponse
    {
        $pressRelease = $request->input('pressRelease');
        $deletedPressRelease = $request->input('deletedPressRelease');

        $pitchPressRelease = PitchPressRelease::find($pressRelease['id']);
        $pitchPressRelease->name = $pressRelease['name'];

        $pitchPressRelease->save();

        if ($deletedPressRelease) {
//            Storage::disk('s3')->delete($deletedFile['url']);
            $deletedPitchPressRelease = PitchPressRelease::find($deletedPressRelease['id']);
            $deletedPitchPressRelease->delete();
        }

        return new JsonResponse(transform($pitch, $pitchTransformer));
    }

    /**
     * @param Pitch $pitch
     * @param Request $request
     * @param PitchTransformer $pitchTransformer
     * @return JsonResponse
     */
    public function updateFilesForPitch(Pitch $pitch, Request $request, PitchTransformer $pitchTransformer): JsonResponse
    {
        $files = array_unique($request->input('files'));
        $deletedFiles = array_unique($request->input('deletedFiles'));

        foreach ($deletedFiles as $deletedFile) {
//            Storage::disk('s3')->delete($deletedFile['url']);
            $deletedFile = PitchFile::find($deletedFile['id']);
            $deletedFile->delete();
        }

        foreach ($files as $file) {
            $pitchFile = PitchFile::find($file['id']);
            $pitchFile->name = $file['name'];
        }

        $pitchFile->save();

        return new JsonResponse(transform($pitch, $pitchTransformer));
    }

    /**
     * @param Pitch $pitch
     * @param TopicTransformer $transformer
     * @return JsonResponse
     */
    public function getTopicsForPitch(Pitch $pitch, TopicTransformer $transformer): JsonResponse
    {
        $items = new Collection();
        $items = $items->merge($this->topicRepository->setOrderBy('title', 'asc')->getByCredentials(['is_custom' => false]));

        $customItems = $pitch->topics()->where('is_custom', true);

        if ($customItems->count()) {
            $items = $items->merge($customItems);
        }

        return new JsonResponse(transform($items, $transformer));
    }

    /**
     * @param Pitch $pitch
     * @param ExtendedPitchTransformer $extendedPitchTransformer
     * @return JsonResponse
     */
    public function setAccept(Pitch $pitch, ExtendedPitchTransformer $extendedPitchTransformer): JsonResponse
    {
        $pitch = $this
            ->pitchRepository
            ->setEasyLoad($extendedPitchTransformer->getEasyLoad())
            ->update($pitch, [
                'status' => Pitch::STATUS_UPCOMING,
                'accepted_at' => Carbon::now()
            ]);

        return new JsonResponse(transform($pitch, $extendedPitchTransformer));
    }

    /**
     * @param Pitch $pitch
     * @param ExtendedPitchTransformer $extendedPitchTransformer
     * @return JsonResponse
     */
    public function setRejected(Pitch $pitch, ExtendedPitchTransformer $extendedPitchTransformer): JsonResponse
    {
        $pitch = $this
            ->pitchRepository
            ->setEasyLoad($extendedPitchTransformer->getEasyLoad())
            ->update($pitch, [
                'status' => Pitch::STATUS_REJECTED
            ]);

        return new JsonResponse(transform($pitch, $extendedPitchTransformer));
    }

    /**
     * @param Request $request
     * @param PitchWithNewTopicTransformer $pitchWithNewTopicTransformer
     * @return JsonResponse
     */
    public function newTopic(Request $request, PitchWithNewTopicTransformer $pitchWithNewTopicTransformer): JsonResponse
    {
        $items = $this
            ->pitchRepository
            ->setEasyLoad($pitchWithNewTopicTransformer->getEasyLoad())
            ->setOrderBy('updated_at', $request->input('sort', 'desc'))
            ->getWithNewTopic();

        return new JsonResponse(transform($items, $pitchWithNewTopicTransformer));
    }
}
