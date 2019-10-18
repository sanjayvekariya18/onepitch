<?php

namespace App\Transformers\BlogCategory;

use App\Models\BlogCategory;
use LukeVear\LaravelTransformer\AbstractTransformer;

class BlogCategoryTransformer extends AbstractTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param BlogCategory $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'title' => $model->name,
            'description' => $model->description
        ];
    }

    /**
     * @return array
     */
    public function getEasyLoad () : array
    {
        return ['category'];
    }
}