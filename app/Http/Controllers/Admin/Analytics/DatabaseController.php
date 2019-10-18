<?php

namespace App\Http\Controllers\Admin\Analytics;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\VwUserAnalytics;
use App\Transformers\Analytics\UserTransformer;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;
use Illuminate\Http\JsonResponse;

class DatabaseController extends Controller
{
    public function users(Request $request): JsonResponse
    {
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');

        $users = VwUserAnalytics::select('*');

        if (!empty($startDate)) {
            $users->where('created_at', '>=', $startDate);
        }
        if (!empty($endDate)) {
            $users->where('created_at', '<=', $endDate);
        }

        $users->orderBy('created_at', 'DESC');

        $arrayResult = transform($users->get(), new UserTransformer());

        return new JsonResponse([
            'users' => $arrayResult->toArray()
        ], HttpFoundationResponse::HTTP_OK);
    }
}