<?php

namespace App\Transformers\Brands;

use App\Models\UserCompany;
use App\Transformers\Users\Publicist\PublicistExtendedTransformer;
use Carbon\Carbon;
use LukeVear\LaravelTransformer\AbstractTransformer;

class BrandTransformer extends AbstractTransformer
{
    /**
     * @param UserCompany $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'company' => $model->company,
            'website' => $model->website,
            'location' => $model->location,
            'industries' => $model->industries,
            'tags' => [
                'industries' => $model->getIndustries(),
                'topics' => $model->getTopics()
            ],
            'author' => transform($model->user, new PublicistExtendedTransformer()),
            'created_at' => Carbon::parse($model->created_at)->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::parse($model->updated_at)->format('Y-m-d H:i:s'),
            'createdFromNow' => Carbon::parse($model->created_at)->diffForHumans(),
            'updatedFromNow' => Carbon::parse($model->updated_at)->diffForHumans(),
        ];
    }

    /**
     * @return array
     */
    public function getEasyLoad () : array
    {
        return ['industries', 'industries.industry', 'industries.topics', 'user'];
    }
}