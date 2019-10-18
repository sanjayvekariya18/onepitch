<?php

namespace App\Http\Controllers\Admin\REST;

use App\Http\Controllers\Controller;
use App\Models\Industry;
use App\Repositories\Industry\IndustryRepositoryInterface;
use App\Transformers\Industries\IndustryTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class IndustriesRestController extends Controller
{
    /**
     * @var IndustryRepositoryInterface
     */
    protected $industryRepository;

    /**
     * IndustriesRestController constructor.
     * @param IndustryRepositoryInterface $industryRepository
     */
    public function __construct(IndustryRepositoryInterface $industryRepository)
    {
        $this->industryRepository = $industryRepository;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function index (Request $request) : JsonResponse
    {
        $items = $this
            ->industryRepository
            ->setOrderBy('title', $request->input('sort', 'asc'))
            ->getAll();
        return new JsonResponse(transform($items, new IndustryTransformer()));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function create (Request $request) : JsonResponse
    {
        $industry = new Industry($request->all());

        $industry->save();

        return new JsonResponse(transform($industry, new IndustryTransformer()));
    }

    /**
     * @param Request $request
     * @param Industry $industry
     * @return JsonResponse
     */
    public function update (Request $request, Industry $industry) : JsonResponse
    {
        $industry->fill($request->all())->save();

        return new JsonResponse(transform($industry, new IndustryTransformer()));
    }

    /**
     * @param Industry $industry
     * @return JsonResponse
     */
    public function delete (Industry $industry) : JsonResponse
    {
        try {
            $industry->delete();
        } catch (\Exception $exception) {
            return new JsonResponse(null, 500);
        }

        return new JsonResponse(null, 200);
    }
}
