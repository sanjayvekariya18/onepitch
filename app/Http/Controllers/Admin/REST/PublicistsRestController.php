<?php

namespace App\Http\Controllers\Admin\REST;

use App\Models\User;
use App\Repositories\Publicist\PublicistRepositoryInterface;
use App\Transformers\Users\Publicist\PublicistExtendedTransformer;
use App\Transformers\Pitches\UserPitchTransformer;
use App\Transformers\Users\Publicist\PublicistTransformer;
use Illuminate\Contracts\Auth\PasswordBroker;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicistsRestController extends UserRestController
{
    /**
     * @var PublicistRepositoryInterface
     */
    protected $publicistRepository;

    /**
     * PublicistsRestController constructor.
     * @param PasswordBroker $passwordBroker
     * @param PublicistRepositoryInterface $publicistRepository
     */
    public function __construct(PasswordBroker $passwordBroker, PublicistRepositoryInterface $publicistRepository)
    {
        parent::__construct($passwordBroker);
        $this->publicistRepository = $publicistRepository;
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function index (Request $request) : JsonResponse
    {
        $publicists = $this
            ->publicistRepository
            ->setOrderBy('created_at', $request->input('sort', 'desc'))
            ->getAll();



        return new JsonResponse(transform($publicists, new PublicistTransformer()));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function extendedIndex (Request $request) : JsonResponse
    {
        $offset = 0;
        $perPage = 20;
        $branded = 0;

        $paginate = $this
            ->publicistRepository
            ->setOrderBy('created_at', $request->input('sort', 'desc'))
            ->getByCredentials([], $perPage);

        $subscribed = count(
            $this
                ->publicistRepository
                ->setOrderBy('created_at', $request->input('sort', 'desc'))
                ->getByCredentials(['has_industry' => 1])
        );

        $withBrand = User::where('role', '>', 0)->withCount('companies')->get();

        foreach ($withBrand as $user) {
            if ($user->companies_count > 0) {
                $branded++;
            }
        }


        $paginate->subscribed = $subscribed;

        if ($page = $request->input('page')) {
            $paginateJson = json_decode(json_encode($paginate));
            $offset = $paginateJson->per_page * ($paginateJson->current_page - 1);
        }


        $publicists = $this
            ->publicistRepository
            ->setOrderBy('created_at', $request->input('sort', 'desc'))
            ->getByCredentials([])
            // temporary fix
            ->splice($offset, $perPage);
           
        return new JsonResponse([$paginate, transform($publicists, new PublicistExtendedTransformer()), $subscribed, $branded]);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function filteredIndex (Request $request)
    {
        $dates = array($request->input('startDate'), $request->input('endDate'));
        $column = $request->input('column');

        $publicists = $this
            ->publicistRepository
            ->setOrderBy('created_at', $request->input('sort', 'desc'))
            ->getByDateFilter($dates, $column);

        return new JsonResponse(transform($publicists, new PublicistExtendedTransformer()));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function search (Request $request) : JsonResponse
    {
        $publicists = $this->publicistRepository->search($request);

        return new JsonResponse(transform($publicists, new PublicistTransformer()));
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function show (User $user) : JsonResponse
    {
        return new JsonResponse(transform($user, new PublicistExtendedTransformer()));
    }

    /**
     * @param Request $request
     * @param User $user
     * @return JsonResponse
     */
    public function update (Request $request, User $user) : JsonResponse
    {
        $user = $this
            ->publicistRepository
            ->update($user, [
                'is_admin' => $request->input('user.isAdmin', false),
                'email' => $request->input('user.email', $user->email)
            ]);

        return new JsonResponse(transform($user, new PublicistExtendedTransformer()));
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function showPitches (User $user) : JsonResponse
    {
        $pitches = $user->pitches;

        return new JsonResponse(transform($pitches, new UserPitchTransformer()));
    }
}
