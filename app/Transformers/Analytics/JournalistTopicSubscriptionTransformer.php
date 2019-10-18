<?php

namespace App\Transformers\Analytics;

use LukeVear\LaravelTransformer\AbstractTransformer;

class JournalistTopicSubscriptionTransformer extends AbstractTransformer
{
    public function run($model): array
    {
        return [
            'id' => (int)$model->id,
            'full_name' =>$model->full_name,
            'company' => $model->company,
            'email' => $model->email,
            'topic' => $model->topic
        ];
    }
}