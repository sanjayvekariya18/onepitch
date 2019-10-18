<?php

namespace App\Http\Controllers\Admin\REST;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\FaqCategory;
use App\Repositories\Faq\FaqRepositoryInterface;
use App\Transformers\Faqs\FaqTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class FaqsRestController extends Controller
{
    /**
     * Controller repository
     *
     * @var FaqRepositoryInterface
     */
    protected $faqRepository;

    /**
     * Main model for controller
     * @var Faq
     */
    protected $faq;

    /**
     * FaqsRestController constructor.
     *
     * @param FaqRepositoryInterface $faqRepository
     * @param Faq $faq
     */
    public function __construct(FaqRepositoryInterface $faqRepository, Faq $faq)
    {
        $this->faqRepository = $faqRepository;
        $this->faq = $faq;
    }

    /**
     * Retrieve all Faqs
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $searchFilter = $request->input('search');
        $sort = $request->input('sort', 'asc');

        $items = $this->faq->select('*');

        if (!empty($searchFilter)) {
            $filters = json_decode($searchFilter, true);

            if (!empty($filters['slug'])) {
                $faqCategory = FaqCategory::where('slug', $filters['slug'])->first();
                $items->where('faq_category_id', $faqCategory->id);
            }
        }

        $resultSet = $items->orderBy('order', $sort)->get();

        return new JsonResponse(transform($resultSet, new FaqTransformer()));
    }

    /**
     *  Create new faq item resource
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        $this->validate($request, [
            'faq_category_id' => 'required|numeric',
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

        $dataPost = $request->all();

        if (empty($dataPost['order'])) {
            $faqs = $this->faq->where('faq_category_id', $dataPost['faq_category_id'])->get();
            $dataPost['order'] = $faqs->max('order') + 1;
        }

        $this->faq->create($dataPost);
        return response()->json(['message' => 'OK']);
    }

    /**
     * Update faq item resource
     *
     * @param Request $request
     * @param Faq $faq
     * @return JsonResponse
     */
    public function update(Request $request, Faq $faq)
    {
        $this->validate($request, [
            'faq_category_id' => 'required|numeric',
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

        $faq->fill($request->all())->save();

        return response()->json(['message' => 'OK']);
    }

    /**
     * Delete faq item
     *
     * @param Faq $faq
     * @return JsonResponse
     */
    public function delete(Faq $faq)
    {
        try {
            $faq->delete();
        } catch (\Exception $exception) {
            return new JsonResponse(null, 500);
        }

        return new JsonResponse(null, 200);
    }
}
