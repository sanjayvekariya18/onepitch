<?php

namespace App\Transformers\Analytics;

use LukeVear\LaravelTransformer\AbstractTransformer;

class ActiveJournalistLoginTransformer extends AbstractTransformer
{
    public function run($model): array
    {
        return [
            'id' => (int)$model->id,
            'full_name' => $model->full_name,
            'email' => $model->email,
            'last_login' => $model->last_login
        ];
    }
}