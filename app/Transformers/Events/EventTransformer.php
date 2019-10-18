<?php

namespace App\Transformers\Events;

use App\Models\PitchEvent;
use LukeVear\LaravelTransformer\AbstractTransformer;

class EventTransformer extends AbstractTransformer
{
    /**
     * @param PitchEvent $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'title' => $model->title,
            'date_from' => $model->date_from,
            'date_to' => $model->date_to,
            'time_from' => $model->time_from,
            'time_to' => $model->time_to,
            'timezone' => $model->timezone
        ];
    }
}