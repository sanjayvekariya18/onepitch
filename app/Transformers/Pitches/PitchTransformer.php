<?php

namespace App\Transformers\Pitches;

use App\Models\Pitch;
use App\Transformers\Topics\TopicTransformer;
use App\Transformers\Users\UserTransformer;
use Carbon\Carbon;
use LukeVear\LaravelTransformer\AbstractTransformer;

class PitchTransformer extends AbstractTransformer
{
    /**
     * @param Pitch $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'subject' => $model->subject,
            'company' => $model->company,
            'what' => $model->getWhat(),
            'why' => $model->getWhy(),
            'author' => transform($model->user, new UserTransformer()),
            'status' => $model->status,
            'statusObj' => [
                'value' => $model->status,
                'title' => $model->getStatusText(true),
                'class' => $model->getStatusClass(),
                'type' => $model->getStatusTypes()
            ],
            'topics' => transform($model->topics(), new TopicTransformer()),
            'topicsText' => $model->getTopicsTitle(3),
            'created_at' => Carbon::parse($model->created_at)->format('Y-m-d H:i:s'),
            'uploaded_at' => Carbon::parse($model->uploaded_at)->format('Y-m-d H:i:s'),
            'accepted_at' => Carbon::parse($model->accepted_at)->format('Y-m-d H:i:s'),
            'sent_at' => $model->sent_at,
            'sentAmount' => $model->sent_amount,
            'clicks' => $model->clicks,
            'opens' => $model->opens,
            'responses' => count($model->mail_statistics),
            'createdFromNow' => Carbon::parse($model->created_at)->diffForHumans(),
            'updatedFromNow' => Carbon::parse($model->updated_at)->diffForHumans(),
            'uploadedFromNow' => Carbon::parse($model->uploaded_at)->diffForHumans(),
            'acceptedFromNow' => Carbon::parse($model->accepted_at)->diffForHumans(),
            'sentFromNow' => Carbon::parse($model->sent_at)->diffForHumans(),
        ];
    }

    /**
     * @return array
     */
    public function getEasyLoad () : array
    {
        return ['industries', 'pitch_industries.topics', 'user'];
    }
}