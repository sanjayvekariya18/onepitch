<?php

namespace App\Transformers\Users\Publicist;

use App\Models\Pitch;
use App\Models\User;
use App\Transformers\Industries\UserIndustryTransformer;

class PublicistExtendedTransformer extends PublicistTransformer
{
    /**
     * @param User $model
     * @return array
     */
    public function run($model) : array
    {
        $countPitches = [
            'all' => $model->pitches()->count(),
            'draft' => $model->pitches->where('status', Pitch::STATUS_DRAFT)->count(),
            'new' => $model->pitches->where('status', Pitch::STATUS_NEW)->count(),
            'upcoming' => $model->pitches->where('status', Pitch::STATUS_UPCOMING)->count(),
            'published' => $model->pitches->where('status', Pitch::STATUS_PUBLISHED)->count(),
            'rejected' => $model->pitches->where('status', Pitch::STATUS_REJECTED)->count()
        ];

        $countPublicistInquiries = [
            'saved' => $model->saved_inquiries()->count(),
            'all' => $model->inquiry_logs()->count(),
        ];

        return array_merge(parent::run($model), [
            'pitches' => $model->pitches,
            'countPitches' => $countPitches,
            'countPublicistInquiries' => $countPublicistInquiries,
            'socialLinks' => $model->getSocials(),
            'industries' => transform($model->user_industries, new UserIndustryTransformer()),
        ]);
    }
}