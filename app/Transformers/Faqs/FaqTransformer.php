<?php

namespace App\Transformers\Faqs;

use App\Models\Faq;
use Carbon\Carbon;
use LukeVear\LaravelTransformer\AbstractTransformer;

class FaqTransformer extends AbstractTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param Faq $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => (int)$model->id,
            'faq_category_id' => (int)$model->faq_category_id,
            'question' => $model->question,
            'answer' => $model->answer,
            'order' => (int)$model->order,
        ];
    }
}