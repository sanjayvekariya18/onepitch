<?php

namespace App\Transformers\Users\Journalists;

use App\Models\User;
use App\Transformers\Users\UserTransformer;

class JournalistTransformer extends UserTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param User $model
     * @return array
     */
    public function run($model) : array
    {
        return array_merge(parent::run($model), [
            'approved' => $model->approved,
            'hear_about' => $model->hear_about,
        ]);
    }
}