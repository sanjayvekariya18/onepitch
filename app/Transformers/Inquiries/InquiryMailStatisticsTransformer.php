<?php

namespace App\Transformers\Inquiries;

use App\Models\User;
use Carbon\Carbon;
use LukeVear\LaravelTransformer\AbstractTransformer;

class InquiryMailStatisticsTransformer extends AbstractTransformer
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
            'inquiry_id' => (int)$model->inquiry_id,
            'journalist_id' => (int)$model->journalist_id,
            'publicist_email' => $model->publicist_email,
            'publicist_id' => (int)$model->publicist_id,
            'created_at' => ($model->created_at) ? Carbon::parse($model->created_at)->format('Y-m-d H:i:s') : null,
            'updated_at' => ($model->created_at) ? Carbon::parse($model->updated_at)->format('Y-m-d H:i:s') : null,
        ];
    }
}