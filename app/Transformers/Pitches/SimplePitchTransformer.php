<?php

namespace App\Transformers\Pitches;

use App\Models\Pitch;
use LukeVear\LaravelTransformer\AbstractTransformer;

class SimplePitchTransformer extends AbstractTransformer
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
            'company' => $model->company,
            'author' => $model->user,
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