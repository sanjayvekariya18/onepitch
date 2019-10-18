<?php

namespace App\Transformers\Pitches;

use App\Models\Pitch;
use App\Transformers\Users\Publicist\PublicistExtendedTransformer;

class ExtendedPitchAuthorTransformer extends PitchTransformer
{
    /**
     * @param Pitch $model
     * @return array
     */
    public function run($model) : array
    {
        return array_merge(parent::run($model), [
            'author' => transform($model->user, new PublicistExtendedTransformer()),
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