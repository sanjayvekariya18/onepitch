<?php

namespace App\Transformers\Analytics;

use App\Models\VwBrandIndexSl;
use LukeVear\LaravelTransformer\AbstractTransformer;

class BrandIndexSlTransformer extends AbstractTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param VwBrandIndexSl $model
     * @return array
     */
    public function run($model): array
    {
        return [
            'id' => (int)$model->id,
            'user_id' => (int)$model->user_id,
            'full_name' => $model->full_name,
            'term' => $model->term,
            'title' => $model->title,
            'industry_title' => $model->industry_title,
            'created_at' => $model->created_at
        ];
    }
}