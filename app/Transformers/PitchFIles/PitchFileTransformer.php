<?php

namespace App\Transformers\PitchFiles;

use App\Models\PitchFile;
use Carbon\Carbon;
use LukeVear\LaravelTransformer\AbstractTransformer;

class PitchFileTransformer extends AbstractTransformer
{
    /**
     * @param PitchFile $model
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