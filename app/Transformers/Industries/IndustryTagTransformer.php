<?php

namespace App\Transformers\Industries;

use App\Models\Industry;
use LukeVear\LaravelTransformer\AbstractTransformer;

class IndustryTagTransformer extends AbstractTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param Industry $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'label' => $model->title,
            'marked' => false
        ];
    }
}