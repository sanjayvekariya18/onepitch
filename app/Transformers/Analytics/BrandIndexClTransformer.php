<?php

namespace App\Transformers\Analytics;

use App\Models\VwBrandIndexCl;
use LukeVear\LaravelTransformer\AbstractTransformer;

class BrandIndexClTransformer extends AbstractTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param VwBrandIndexCl $model
     * @return array
     */
    public function run($model): array
    {
        return [
            'id' => (int)$model->id,
            'user_id' => (int)$model->user_id,
            'journalist_name' => $model->journalist_name,
            'brand_user_id' => (int)$model->brand_user_id,
            'publicist_name' => $model->publicist_name,
            'clicked' => $model->clicked,
            'created_at' => $model->created_at
        ];
    }
}