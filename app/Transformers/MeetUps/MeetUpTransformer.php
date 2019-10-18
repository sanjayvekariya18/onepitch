<?php

namespace App\Transformers\MeetUps;

use App\Models\MeetUp;
use Carbon\Carbon;
use LukeVear\LaravelTransformer\AbstractTransformer;

class MeetUpTransformer extends AbstractTransformer
{
    /**
     * @param MeetUp $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'user' => transform($model->user, new UserTransformer()),
            'status' => $model->status,
        ];
    }

    /**
     * @return array
     */
    public function getEasyLoad () : array
    {
        return ['user'];
    }
}