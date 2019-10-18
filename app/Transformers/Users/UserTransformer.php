<?php

namespace App\Transformers\Users;

use App\Models\User;
use Carbon\Carbon;
use LukeVear\LaravelTransformer\AbstractTransformer;

class UserTransformer extends AbstractTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param User $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id'    => $model->id,
            'full_name'  => $model->full_name,
            'initials'  => $model->initials,
            'email'  => $model->email,
            'author_url'  => $model->author_url,
            'title'  => $model->title,
            'birthday'  => !empty($model->birthday)?Carbon::parse($model->birthday)->format('F d, Y'):"",
            'phone_number'  => $model->phone_number,
            'photo' => $model->getPhotoUrl(),
            'isAdmin' => $model->is_admin,
            'company' => $model->company,
            'whenJoining' => $model->getFormattedDate($model->created_at),
            'created_at' => $model->created_at,
            'lastLoggedIn' => $model->getFormattedDate($model->last_login),
            'last_login' => $model->last_login,
            'roleName' => $model->getRoleName(),
            'joinedOn' => Carbon::parse($model->created_at)->format('F d, Y'),
            'signUpOn' => Carbon::parse($model->created_at)->format('F d, Y  h:i a'),
            'hasIndustry' => $model->has_industry == 1 ? 'Yes' : '',
            'dailyMailTime' => $model->daily_mail_time,
            'dailyMailTimeZone' => $model->daily_mail_timezone
        ];
    }
}