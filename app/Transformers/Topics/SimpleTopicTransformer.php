<?php

namespace App\Transformers\Topics;

use App\Models\IndustryTopic;
use LukeVear\LaravelTransformer\AbstractTransformer;

class SimpleTopicTransformer extends AbstractTransformer
{
    /**
     * @param IndustryTopic $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'title' => $model->title
        ];
    }
}