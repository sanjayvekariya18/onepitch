<?php

namespace App\Transformers\Inquiries;

use App\Models\Inquiry;
use App\Transformers\Events\EventTransformer;
use App\Transformers\Industries\IndustryTagTransformer;
use App\Transformers\Industries\IndustryTransformer;
use App\Transformers\InquiryFiles\InquiryFileTransformer;
use App\Transformers\Topics\TopicTagTransformer;
use App\Transformers\Users\Journalists\JournalistExtendedTransformer;

class ExtendedInquiryTransformer extends InquiryTransformer
{
    /**
     * @param Inquiry $model
     * @return array
     */
    public function run($model) : array
    {
        return array_merge(parent::run($model), [
            'author' => transform($model->user, new JournalistExtendedTransformer()),
            'tags' => [
                'industries' => transform($model->industries, new IndustryTagTransformer()),
                'topics' => transform($model->topics(), new TopicTagTransformer())
            ],
            'website' => $model->website,
            'http-website' => adjustUrl($model->website),
            'industries' => transform($model->industries, new IndustryTransformer()),
            'event' => $model->event ? transform($model->event, new EventTransformer()) : null,
            'files' => $model->files ? transform($model->files, new InquiryFileTransformer()) : null,
            'views' => stringifyRelationshipModels($model->views, 'user', 'company', ', '),
            'publicists' => [
                'sent' => $model->logs->pluck('user'),
                'opens' => $model->views->pluck('user'),
                'clicks' => $model->mail_clicks->pluck('user'),
            ]

        ]);
    }
}