<?php

namespace App\Transformers\PitchPressRelease;

use App\Models\PitchPressRelease;
use Carbon\Carbon;
use LukeVear\LaravelTransformer\AbstractTransformer;

class PitchPressReleaseTransformer extends AbstractTransformer
{
    /**
     * @param PitchPressRelease $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'pitch_id' => $model->pitch_id,
            'name' => $model->name,
            'url' => $model->url,
        ];
    }

    /**
     * @return array
     */
    public function getEasyLoad () : array
    {
        return ['pitch'];
    }
}