<?php

namespace App\Transformers\Users\Administrators;

use App\Transformers\Users\UserTransformer;

class AdministratorTransformer extends UserTransformer
{
    /**
     * @param \App\Models\User $model
     * @return array
     */
    public function run($model): array
    {
        return [
            'id' => $model->id,
            'full_name' => $model->full_name,
            'email' => $model->email
        ];
    }
}