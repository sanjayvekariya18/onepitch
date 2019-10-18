<?php

namespace App\Transformers\Pitches;

use App\Models\Pitch;
use App\Transformers\Users\UserTransformer;
use Carbon\Carbon;
use LukeVear\LaravelTransformer\AbstractTransformer;

class UserPitchTransformer extends AbstractTransformer
{
    /**
     * @param Pitch $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'subject' => $model->subject,
            'date' => Carbon::parse($model->created_at)->format('M d, Y'),
            'status' => $model->status,
            'statusTitle' => $model->getStatusText(),
            'statusClass' => $model->getStatusClass(),
            'author' => $model->user ? transform($model->user, new UserTransformer()) : null
        ];
    }
}