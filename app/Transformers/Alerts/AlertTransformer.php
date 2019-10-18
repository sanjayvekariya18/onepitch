<?php

namespace App\Transformers\Alerts;

use Illuminate\Database\Eloquent\Model;
use LukeVear\LaravelTransformer\AbstractTransformer;

class AlertTransformer extends AbstractTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param Model $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => (int)$model->id,
            'user_id' => $model->user_id,
            'role_id' => $model->role,
            'role' => $model->getRoleName(),
            'location' => $model->location,
            'link' => $model->link,
            'inquiry_industry_topic_id' => (int)$model->inquiry_industry_topic_id,
            'pitch_industry_topic_id' => (int)$model->pitch_industry_topic_id,
            'message' => $model->message,
            'status' => $model->getStatusName(),
            'filter' => $model->getFilterDescription(),
            'due_date' => !empty($model->due_date) ? $model->due_date->format('Y-m-d') : null,
            'created_at' => !empty($model->created_at) ? $model->created_at->format('Y-m-d') : null,
            'updated_at' => !empty($model->updated_at) ? $model->updated_at->format('Y-m-d') : null,
        ];
    }
}