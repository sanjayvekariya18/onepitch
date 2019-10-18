<?php

namespace App\Transformers\Users\Publicist;

use App\Models\User;
use App\Transformers\Users\UserTransformer;

class PublicistTransformer extends UserTransformer
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
//            'url' => route('admin.publicists.show', $model),
            'brands' => $model->companies,
            'hear_about' => $model->hear_about,
            'countBrands' => count($model->companies)
        ]);
    }
}