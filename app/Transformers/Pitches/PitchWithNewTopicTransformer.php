<?php

namespace App\Transformers\Pitches;

use App\Models\Pitch;
use App\Transformers\Topics\TopicTransformer;
use App\Transformers\Users\Publicist\PublicistExtendedTransformer;
use Carbon\Carbon;

class PitchWithNewTopicTransformer extends PitchTransformer
{
    /**
     * @param Pitch $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'author' => $model->user ? transform($model->user, new PublicistExtendedTransformer()) : '',
            'topic' => transform($model->newTopic(), new TopicTransformer()),
            'created_at' => Carbon::parse($model->created_at)->format('Y-m-d H:i:s'),
            'whenCreated' => Carbon::parse($model->created_at)->diffForHumans()
        ];
    }
}