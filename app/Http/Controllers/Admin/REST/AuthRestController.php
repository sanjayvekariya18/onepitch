<?php

namespace App\Http\Controllers\Admin\REST;

use App\Http\Controllers\Controller;
use App\Transformers\Users\UserTransformer;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthRestController extends Controller
{
    /**
     * @param UserTransformer $transformer
     * @return JsonResponse
     */
    public function getUser (UserTransformer $transformer) : JsonResponse
    {
        $user = Auth::user();
        return new JsonResponse(transform($user, $transformer));
    }

    /**
     * @return JsonResponse
     */
    public function logout () : JsonResponse
    {
        Auth::logout();
        return new JsonResponse();
    }
}