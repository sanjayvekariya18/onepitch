<?php

namespace App\Transformers\InquiryIndustries;

use App\Models\InquiryIndustry;
use LukeVear\LaravelTransformer\AbstractTransformer;

class InquiryIndustryTransformer extends AbstractTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param InquiryIndustry $model
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