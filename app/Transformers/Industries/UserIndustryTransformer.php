<?php

namespace App\Transformers\Industries;

use App\Models\UserIndustry;
use App\Transformers\Topics\TopicTransformer;
use LukeVear\LaravelTransformer\AbstractTransformer;

class UserIndustryTransformer extends AbstractTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param UserIndustry $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'title' => $model->industry->title,
            'full_title' => $model->industry->full_title,
            'description' => $model->industry->description,
            'topics' => transform($model->userIndustryTopics, new TopicTransformer())
        ];
    }
}