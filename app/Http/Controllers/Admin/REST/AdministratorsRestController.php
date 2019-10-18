<?php

namespace App\Http\Controllers\Admin\REST;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminAdministratorUpdate;
use App\Http\Requests\AdminAdministratorCreate;
use App\Models\User;
use App\Repositories\Administrators\AdministratorsRepositoryInterface;
use App\Transformers\Users\Administrators\AdministratorTransformer;
use App\Transformers\Users\UserTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdministratorsRestController extends Controller
{
    /**
     * @var AdministratorsRepositoryInterface
     */
    protected $administratorsRepository;

    /**
     * AdministratorsRestController constructor.
     * @param AdministratorsRepositoryInterface $administratorsRepository
     */
    public function __construct(AdministratorsRepositoryInterface $administratorsRepository)
    {
        $this->administratorsRepository = $administratorsRepository;
    }

    /**
     * @param AdministratorTransformer $transformer
     * @return JsonResponse
     */
    public function index (AdministratorTransformer $transformer) : JsonResponse
    {
        $items = $this->administratorsRepository->getAll();
        return new JsonResponse(transform($items, $transformer));
    }

    /**
     * @param Request $request
     * @param UserTransformer $userTransformer
     * @return JsonResponse
     */
    public function search (Request $request, UserTransformer $userTransformer) : JsonResponse
    {
        $items = $this->administratorsRepository->search($request);
        return new JsonResponse(transform($items, $userTransformer));
    }

    /**
     * @param AdminAdministratorCreate $request
     * @param AdministratorTransformer $transformer
     * @return JsonResponse
     */
    public function create (AdminAdministratorCreate $request, AdministratorTransformer $transformer) : JsonResponse
    {
        $user = new User([
            'full_name' => $request->input('full_name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
            'role' => User::ADMIN,
            'is_verified' => true
        ]);

        $user->save();

        return new JsonResponse(transform($user, $transformer));
    }

    /**
     * @param AdminAdministratorUpdate $request
     * @param User $user
     * @param AdministratorTransformer $transformer
     * @return JsonResponse
     */
    public function update (AdminAdministratorUpdate $request, User $user, AdministratorTransformer $transformer) : JsonResponse
    {
        if ($request->has('password') && $request->input('password') !== '') {
            $user->password = bcrypt($request->input('password'));
        }

        $user->email = $request->input('email');
        $user->full_name = $request->input('full_name');

        $user->save();

        return new JsonResponse(transform($user, $transformer));
    }

    /**
     * @param User $user
     * @return JsonResponse
     */
    public function delete (User $user) : JsonResponse
    {
        try {
            $user->delete();
        } catch (\Exception $exception) {
            return new JsonResponse(null, 500);
        }

        return new JsonResponse(null, 200);
    }
}