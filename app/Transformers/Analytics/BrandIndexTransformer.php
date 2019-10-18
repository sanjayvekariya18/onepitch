<?php

namespace App\Transformers\Analytics;

use App\Models\VwBrandIndex;
use LukeVear\LaravelTransformer\AbstractTransformer;

class BrandIndexTransformer extends AbstractTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param VwBrandIndex $model
     * @return array
     */
    public function run($model): array
    {
        return [
            'id' => (int)$model->id,
            'user_id' => (int)$model->user_id,
            'full_name' => $model->full_name,
            'company' => $model->company,
            'website' => $model->website,
            'location' => $model->location,
            'created_at' => $model->created_at
        ];
    }
}