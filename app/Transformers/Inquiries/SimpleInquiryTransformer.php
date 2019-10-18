<?php

namespace App\Transformers\Inquiries;

use App\Models\Inquiry;
use LukeVear\LaravelTransformer\AbstractTransformer;

class SimpleInquiryTransformer extends AbstractTransformer
{
    /**
     * @param Inquiry $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'subject' => $model->subject,
            'company' => $model->company,
            'author' => $model->user,
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