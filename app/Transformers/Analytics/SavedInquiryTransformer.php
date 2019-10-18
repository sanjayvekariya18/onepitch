<?php

namespace App\Transformers\Analytics;

use App\Models\VwSavedInquiry;
use LukeVear\LaravelTransformer\AbstractTransformer;

class SavedInquiryTransformer extends AbstractTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param VwSavedInquiry $model
     * @return array
     */
    public function run($model): array
    {
        return [
            'id' => (int)$model->id,
            'inquiry_id' => (int)$model->inquiry_id,
            'user_id' => (int)$model->user_id,
            'full_name' => $model->full_name,
            'date_saved' => $model->date_saved
        ];
    }
}