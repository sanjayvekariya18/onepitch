<?php

namespace App\Transformers\Industries;

use App\Models\Industry;
use Carbon\Carbon;
use LukeVear\LaravelTransformer\AbstractTransformer;

class IndustryTransformer extends AbstractTransformer
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
            'title' => $model->title,
            'full_title' => $model->full_title,
            'description' => $model->description,
            'created_at' => Carbon::parse($model->created_at)->format('Y-m-d H:i:s'),
            'whenCreated' => Carbon::parse($model->created_at)->diffForHumans()
        ];
    }
}