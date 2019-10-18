<?php

namespace App\Transformers\PitchIndustries;

use App\Models\PitchIndustry;
use LukeVear\LaravelTransformer\AbstractTransformer;

class PitchIndustryTransformer extends AbstractTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param PitchIndustry $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'title' => $model->industry->title,
            'full_title' => $model->industry->full_title,
            'description' => $model->industry->description
        ];
    }

    /**
     * @return array
     */
    public function getEasyLoad () : array
    {
        return ['industry'];
    }
}