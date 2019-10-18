<?php

namespace App\Transformers\Inquiries;

use App\Models\Inquiry;
use App\Transformers\Users\UserTransformer;
use Carbon\Carbon;
use LukeVear\LaravelTransformer\AbstractTransformer;

class UserInquiryTransformer extends AbstractTransformer
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
            'date' => Carbon::parse($model->created_at)->format('M d, Y'),
            'status' => $model->status,
            'statusTitle' => $model->getStatusText(),
            'statusClass' => $model->getStatusClass(),
            'author' => $model->user ? transform($model->user, new UserTransformer()) : null
        ];
    }
}