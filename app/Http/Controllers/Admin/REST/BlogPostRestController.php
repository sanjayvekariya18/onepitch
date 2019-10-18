<?php

namespace App\Http\Controllers\Admin\REST;

use App\Models\BlogPost;
use App\Models\BlogPostCategory;
use App\Repositories\BlogPost\BlogPostRepositoryInterface;
use App\Repositories\BlogCategory\BlogCategoryRepositoryInterface;
use App\Repositories\BlogPostCategory\BlogPostCategoryRepositoryInterface;
use App\Transformers\BlogPost\BlogPostTransformer;
use App\Transformers\BlogCategory\BlogCategoryTransformer;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Storage;

class BlogPostRestController extends Controller
{
    /**
     * @var BlogPostRepositoryInterface
     * @var BlogCategoryRepositoryInterface
     * @var BlogPostCategoryRepositoryInterface
     */
    protected $blogPostRepository;
    protected $blogCategoryRepository;
    protected $blogPostCategoryRepository;

    /**
     * BlogPostRestController constructor.
     * @param BlogPostRepositoryInterface $blogPostRepository
     * @param BlogCategoryRepositoryInterface $blogCategoryRepository
     * @param BlogPostCategoryRepositoryInterface $blogPostCategoryRepository
     */
    public function __construct(
        BlogPostRepositoryInterface $blogPostRepository,
        BlogCategoryRepositoryInterface $blogCategoryRepository,
        BlogPostCategoryRepositoryInterface $blogPostCategoryRepository
    ) {
        $this->blogPostRepository = $blogPostRepository;
        $this->blogCategoryRepository = $blogCategoryRepository;
        $this->blogPostCategoryRepository = $blogPostCategoryRepository;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $items = $this
            ->blogPostRepository
            ->setOrderBy('created_at', $request->input('sort', 'desc'))
            ->getAll();
        return new JsonResponse(transform($items, new BlogPostTransformer()));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        $blogPost = new BlogPost($request->all());

        $blogPost->save();

        return new JsonResponse(transform($blogPost, new BlogPostTransformer()));
    }

    /**
     * @param BlogPost $blogPost
     * @param BlogPostTransformer $blogPostTransformer
     * @return JsonResponse
     */
    public function show(BlogPost $blogPost, BlogPostTransformer $blogPostTransformer): JsonResponse
    {
        return new JsonResponse(transform($blogPost, $blogPostTransformer));
    }

    /**
     * @param Request $request
     * @param BlogPost $blogPost
     * @return JsonResponse
     */
    public function update(Request $request, BlogPost $blogPost): JsonResponse
    {
        //dd($request->all());

        $blogPost->fill($request->all())->save();

        return new JsonResponse(transform($blogPost, new BlogPostTransformer()));
    }

    /**
     * @param BlogPost $blogPost
     * @param Request $request
     * @param BlogPostTransformer $blogPostTransformer
     * @return JsonResponse
     */
    public function updateStatus(
        BlogPost $blogPost,
        Request $request,
        BlogPostTransformer $blogPostTransformer
    ): JsonResponse {
        $blogPost->status = $request->input('status');
        $blogPost->published_at = Carbon::now();

        $blogPost->save();

        return new JsonResponse(transform($blogPost, $blogPostTransformer));
    }

    /**
     * @param BlogPost $blogPost
     * @param Request $request
     * @param BlogPostTransformer $blogPostTransformer
     * @return JsonResponse
     */
    public function updateLink(
        BlogPost $blogPost,
        Request $request,
        BlogPostTransformer $blogPostTransformer
    ): JsonResponse {
        $blogPost->link = $request->input('link');

        $blogPost->save();

        return new JsonResponse(transform($blogPost, $blogPostTransformer));
    }

    /**
     * @param BlogPost $blogPost
     * @param Request $request
     * @param BlogPostTransformer $blogPostTransformer
     * @return JsonResponse
     */
    public function updateFeaturedImage(
        BlogPost $blogPost,
        Request $request,
        BlogPostTransformer $blogPostTransformer
    ): JsonResponse {
        $this->validate($request, [
            'file' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        try {
            $exists = Storage::disk('s3')->exists($blogPost->featured_image);

            if ($exists) {
                Storage::disk('s3')->delete($blogPost->featured_image);
            }

            $path = $request->file('file')->store(
                'blog', 's3'
            );

            $blogPost->featured_image = 'https://s3-' . env('AWS_REGION') . '.amazonaws.com/' .
                env('AWS_BUCKET') . '/' . $path;
            $blogPost->save();

            return new JsonResponse(transform($blogPost, $blogPostTransformer));

        } catch (\Exception $e) {
            return new JsonResponse([
                'messages' => $e->getMessage()
            ]);
        }

    }

    /**
     * @param BlogPost $blogPost
     * @param Request $request
     * @param BlogPostTransformer $blogPostTransformer
     * @return JsonResponse
     */
    public function updateAuthor(
        BlogPost $blogPost,
        Request $request,
        BlogPostTransformer $blogPostTransformer
    ): JsonResponse {
        $blogPost->user_id = $request->input('author');

        $blogPost->save();

        return new JsonResponse(transform($blogPost, $blogPostTransformer));
    }

    /**
     * @param BlogPost $blogPost
     * @param Request $request
     * @param BlogPostTransformer $blogPostTransformer
     * @return JsonResponse
     */
    public function updateCategories(
        BlogPost $blogPost,
        Request $request,
        BlogPostTransformer $blogPostTransformer
    ): JsonResponse {
        $ids = array_unique($request->input('ids'));

        $blogPostCategories = $this->blogPostCategoryRepository->getByCredentials(['blog_post_id' => $blogPost->id]);

        // Deleting
        $blogPostCategories->each(function (BlogPostCategory $blogPostCategory) {
            $blogPostCategory->delete();
        });

        $blogPostCategories = new Collection();

        foreach ($ids as $id) {
            $blogPostCategory = new BlogPostCategory([
                'blog_post_category_id' => $id,
                'blog_post_id' => $blogPost->id
            ]);

            $blogPostCategory->save();

            $blogPostCategories->push($blogPostCategory);
        }


        return new JsonResponse(transform($blogPost, $blogPostTransformer));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function getCategoriesForPost(Request $request): JsonResponse
    {
        $items = $this
            ->blogCategoryRepository
            ->getAll();

        return new JsonResponse(transform($items, new BlogCategoryTransformer()));
    }
}
