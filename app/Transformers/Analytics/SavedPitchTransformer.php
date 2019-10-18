<?php

namespace App\Transformers\Analytics;

use LukeVear\LaravelTransformer\AbstractTransformer;

class SavedPitchTransformer extends AbstractTransformer
{
    public function run($model): array
    {
        return [
            'id' => (int)$model->id,
            'pitch_id' => (int)$model->pitch_id,
            'user_id' => (int)$model->user_id,
            'full_name' => $model->full_name,
            'date_saved' => $model->date_saved
        ];
    }
}