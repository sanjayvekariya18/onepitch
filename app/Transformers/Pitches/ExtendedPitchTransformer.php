<?php

namespace App\Transformers\Pitches;

use App\Models\Pitch;
use App\Transformers\Events\EventTransformer;
use App\Transformers\Industries\IndustryTagTransformer;
use App\Transformers\Industries\IndustryTransformer;
use App\Transformers\PitchFiles\PitchFileTransformer;
use App\Transformers\PitchPressRelease\PitchPressReleaseTransformer;
use App\Transformers\Topics\TopicTagTransformer;
use App\Transformers\Users\Publicist\PublicistExtendedTransformer;

class ExtendedPitchTransformer extends PitchTransformer
{
    /**
     * @param Pitch $model
     * @return array
     */
    public function run($model) : array
    {
        return array_merge(parent::run($model), [
            'author' => transform($model->user, new PublicistExtendedTransformer()),
            'tags' => [
                'industries' => transform($model->industries, new IndustryTagTransformer()),
                'topics' => transform($model->topics(), new TopicTagTransformer())
            ],
            'website' => $model->website,
            'http-website' => adjustUrl($model->website),
            'industries' => transform($model->industries, new IndustryTransformer()),
            'event' => $model->event ? transform($model->event, new EventTransformer()) : null,
            'press-release' => $model->press_release ? transform($model->press_release, new PitchPressReleaseTransformer()) : null,
            'files' => $model->files ? transform($model->files, new PitchFileTransformer()) : null,
            'views' => stringifyRelationshipModels($model->views, 'user', 'company', ', '),
            'journalists' => [
                'sent' => $model->logs->pluck('user'),
                'opens' => $model->views->pluck('user'),
                'clicks' => $model->mail_clicks->pluck('user'),
            ]

        ]);
    }

    /**
     * @return array
     */
    public function getEasyLoad () : array
    {
        return ['user'];
    }
}