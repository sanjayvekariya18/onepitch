<?php

namespace App\Http\Controllers\Admin\REST;

use App\Models\UserCompany;
use App\Models\UserCompanyIndustry;
use App\Models\UserCompanyIndustryTopics;
use App\Repositories\Brand\BrandRepositoryInterface;
use App\Transformers\Brands\BrandTransformer;
use App\Transformers\Industries\IndustryTransformer;
use App\Transformers\PitchIndustries\PitchIndustryTransformer;
use App\Transformers\Pitches\ExtendedPitchTransformer;
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

class BrandsRestController extends Controller
{
    /**
     * @var BrandRepositoryInterface
     */
    protected $brandRepository;

    /**
     * BrandsRestController constructor.
     * @param BrandRepositoryInterface $brandRepository
     */
    public function __construct(
        BrandRepositoryInterface $brandRepository
    ) {
        $this->brandRepository = $brandRepository;
    }

    /**
     * @param UserCompany $brand
     * @param BrandTransformer $brandTransformer
     * @return JsonResponse
     */
    public function show (UserCompany $brand, BrandTransformer $brandTransformer) : JsonResponse
    {
        return new JsonResponse(transform($brand, $brandTransformer));
    }


    public function updateIndustries (UserCompany $brand, Request $request, BrandTransformer $brandTransformer) : JsonResponse
    {
        $ids = array_unique($request->input('ids'));
        $topicIds = $brand->industries[0]->topics->pluck('topic_id');

        foreach ($brand->industries as $industry) {
            foreach ($industry->topics as $topic) {
                $topic->delete();
            }
        }

        foreach ($brand->industries as $industry) {
            $industry->delete();
        }

        foreach ($ids as $industry) {
            $userCompanyIndustry = UserCompanyIndustry::create(['user_company_id' => $brand->id, 'industry_id' => $industry]);

            foreach ($topicIds as $topic) {
                UserCompanyIndustryTopics::create(['user_company_industry_id' => $userCompanyIndustry->id, 'topic_id' => $topic]);
            }
        }

        return new JsonResponse(transform($brand, $brandTransformer));
    }


    public function updateTopics (UserCompany $brand, Request $request, BrandTransformer $brandTransformer) : JsonResponse
    {
        $ids = array_unique($request->input('ids'));
        $industryIds = $brand->industries->pluck('industry_id');

        foreach ($brand->industries as $industry) {
            foreach ($industry->topics as $topic) {
                $topic->delete();
            }
        }

        foreach ($brand->industries as $industry) {
            $industry->delete();
        }

        foreach ($industryIds as $industry) {
            $userCompanyIndustry = UserCompanyIndustry::create(['user_company_id' => $brand->id, 'industry_id' => $industry]);

            foreach ($ids as $topic) {
                UserCompanyIndustryTopics::create(['user_company_industry_id' => $userCompanyIndustry->id, 'topic_id' => $topic]);
            }
        }

        return new JsonResponse(transform($brand, $brandTransformer));
    }

    /**
     * @param UserCompany $brand
     * @param Request $request
     * @param BrandTransformer $brandTransformer
     * @return JsonResponse
     */
    public function updateSummaryForBrand (UserCompany $brand, Request $request, BrandTransformer $brandTransformer) : JsonResponse
    {
        $summaries = array_unique($request->input('summaries'));

        $brand->company = $summaries[0];
        $brand->website = $summaries[1];
        $brand->location = $summaries[2];

        $brand->save();

        return new JsonResponse(transform($brand, $brandTransformer));
    }

    /**
     * @param UserCompany $brand
     * @return JsonResponse
     */
    public function delete (UserCompany $brand) : JsonResponse
    {
        try {
            foreach ($brand->industries as $industry) {
                foreach ($industry->topics as $topic) {
                    $topic->delete();
                }
            }

            foreach ($brand->industries as $industry) {
                $industry->delete();
            }

            $brand->delete();
        } catch (\Exception $exception) {
            return new JsonResponse(null, 500);
        }

        return new JsonResponse(null, 200);
    }
}
