<?php

namespace App\Transformers\Analytics;

use App\Models\User;
use LukeVear\LaravelTransformer\AbstractTransformer;

class UserTransformer extends AbstractTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param User $model
     * @return array
     */
    public function run($model): array
    {
        return [
            'id' => (int)$model->id,
            'role' => (int)$model->role,
            'full_name' => $model->full_name,
            'company' => $model->company,
            'email' => $model->email,
            'username' => $model->username,
            'phone_number' => $model->phone_number,
            'linkedin_id' => $model->linkedin_id,
            'twitter_id' => $model->twitter_id,
            'photo' => $model->photo,
            'twitter_url' => $model->twitter_url,
            'linkedin_url' => $model->linkedin_url,
            'hear_about' => $model->hear_about,
            'hear_about_other' => $model->hear_about_other,
            'subscribe' => (int)$model->subscribe,
            'agree_tos' => (int)$model->agree_tos,
            'referral_hash' => $model->referral_hash,
            'referral_id' => (int)$model->referral_id,
            'is_verified' => (int)$model->is_verified,
            'verification_code' => $model->verification_code,
            'created_at' => (!empty($model->created_at)) ? $model->created_at->toDateString() : null,
            'updated_at' => (!empty($model->updated_at)) ? $model->updated_at->toDateString() : null,
            'last_login' => $model->last_login,
            'is_admin' => (int)$model->is_admin,
            'approved' => (int)$model->approved,
            'has_industry' => (int)$model->has_industry
        ];
    }
}