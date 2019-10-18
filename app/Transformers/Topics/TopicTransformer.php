<?php

namespace App\Transformers\Topics;

use App\Models\IndustryTopic;
use Carbon\Carbon;
use LukeVear\LaravelTransformer\AbstractTransformer;

class TopicTransformer extends AbstractTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param IndustryTopic $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'title' => $model->title,
            'description' => $model->description,
            'isCustom' => $model->is_custom,
            'created_at' => Carbon::parse($model->created_at)->format('Y-m-d H:i:s'),
            'whenCreated' => Carbon::parse($model->created_at)->diffForHumans()
        ];
    }
}