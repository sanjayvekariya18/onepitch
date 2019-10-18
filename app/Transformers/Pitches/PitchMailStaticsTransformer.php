<?php

namespace App\Transformers\Pitches;

use App\Models\User;
use Carbon\Carbon;
use LukeVear\LaravelTransformer\AbstractTransformer;

class PitchMailStaticsTransformer extends AbstractTransformer
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
            'user_id' => (int)$model->user_id,
            'status' => (int)$model->status,
            'subject' => $model->subject,
            'sent' => (int)$model->logs_count,
            'clicks' => (int)$model->mail_clicks_count,
            'opens' => (int)$model->views_count,
            'responses' => (int)$model->mail_statistics_count,
            'saves' => (int)$model->saved_pitches_count,
            'confirmation_code' => $model->confirmation_code,
            'created_at' => ($model->created_at) ? Carbon::parse($model->created_at)->format('Y-m-d') : null,
        ];
    }
}