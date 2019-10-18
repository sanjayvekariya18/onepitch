<?php

namespace App\Transformers\Topics;

use App\Models\IndustryTopic;
use LukeVear\LaravelTransformer\AbstractTransformer;

class TopicTagTransformer extends AbstractTransformer
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
            'label' => $model->title,
            'marked' => (bool)$model->is_custom
        ];
    }
}