<?php

namespace App\Http\Controllers\Admin\REST;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use App\Models\InquiryMailStatistic;
use App\Models\MeetUp;
use App\Models\Pitch;
use App\Models\PitchMailStatistic;
use App\Models\User;
use App\Models\UserIndustry;
use App\Models\UserTour;
use DB;
use Illuminate\Http\JsonResponse;
use Illuminate\Contracts\Auth\PasswordBroker;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserRestController extends Controller
{
    /**
     * @var PasswordBroker
     */
     protected $passwordBroker;

    /**
     * UserRestController constructor.
     * @param PasswordBroker $passwordBroker
     */
    public function __construct (PasswordBroker $passwordBroker)
    {
        $this->passwordBroker = $passwordBroker;
    }
    /**
     * @param User $user
     * @return JsonResponse
     */
    public function resetPassword (User $user) : JsonResponse
    {
        $result = $this->passwordBroker->sendResetLink(['email' => $user->email]);
        if ($result === $this->passwordBroker::RESET_LINK_SENT) {
            return new JsonResponse();
        }

        return new JsonResponse('', Response::HTTP_BAD_REQUEST);
    }

    /**
     * @param  User  $user
     * @return JsonResponse
     */
    public function softDelete(User $user)
    {
        try {
            $user->role = 0;
            $user->save();
            return response()->json(['message' => 'OK']);
        } catch (\Exception $exception) {
            return response()->json(null, 500);
        }
    }

    public function hardDelete(User $user)
    {
        try {
            DB::beginTransaction();

            $emailToUpdate = 'info@onepitch.co';

            InquiryMailStatistic::where('journalist_id', $user->id)->update(['journalist_id' => 1]);
            InquiryMailStatistic::where('publicist_id', $user->id)->update(['publicist_id' => 1]);
            InquiryMailStatistic::where('publicist_id', $user->id)
                ->orWhere('journalist_id', $user->id)
                ->orWhere('publicist_id', 1)
                ->orWhere('journalist_id', 1)
                ->update(['publicist_email' => $emailToUpdate]);

            Inquiry::where('user_id', $user->id)->update(['user_id' => 1]);

            PitchMailStatistic::where('journalist_id', $user->id)->update(['journalist_id' => 1]);
            PitchMailStatistic::where('publicist_id', $user->id)->update(['publicist_id' => 1]);
            PitchMailStatistic::where('publicist_id', $user->id)
                ->orWhere('journalist_id', $user->id)
                ->orWhere('publicist_id', 1)
                ->orWhere('journalist_id', 1)
                ->update(['journalist_email' => $emailToUpdate]);

            Pitch::where('user_id', $user->id)->update(['user_id' => 1]);

            MeetUp::where('user_id', $user->id)->delete();

            UserTour::where('user_id', $user->id)->delete();

            UserIndustry::where('user_id', $user->id)->delete();

            DB::delete('DELETE
                        FROM user_industry_topics
                        WHERE NOT EXISTS(
                            SELECT * 
                            FROM user_industry
                            WHERE user_industry_topics.user_industry_id = user_industry.id
                            )'
            );

            User::where('id', $user->id)->delete();

            DB::commit();

            return response()->json(['message' => 'OK']);
        } catch (\Exception $exception) {
            DB::rollBack();

            return response()->json(['message' => $exception->getMessage()], 500);
        }
    }
}