<?php

namespace App\Transformers\InquiryFiles;

use App\Models\InquiryFile;
use LukeVear\LaravelTransformer\AbstractTransformer;

class InquiryFileTransformer extends AbstractTransformer
{
    /**
     * @param InquiryFile $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'pitch_id' => $model->inquiry_id,
            'name' => $model->name,
            'url' => $model->url,
        ];
    }

    /**
     * @return array
     */
    public function getEasyLoad () : array
    {
        return ['user'];
    }
}