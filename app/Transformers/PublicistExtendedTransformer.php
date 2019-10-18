<?php

namespace App\Transformers;

use App\Models\Pitch;
use App\Models\User;
use App\Transformers\Publicist\PublicistTransformer;

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
            'upcoming' => $model->pitches->where('status', Pitch::STATUS_UPCOMING)->count(),
            'published' => $model->pitches->where('status', Pitch::STATUS_PUBLISHED)->count(),
            'rejected' => $model->pitches->where('status', Pitch::STATUS_REJECTED)->count()
        ];

        $countPublicistInquiries = [
            'saved' => $model->saved_inquiries()->count(),
            'all' => $model->inquiry_logs()->count(),
        ];

        $socialLinks = [
            [
                'type' => 'twitter',
                'link' => '/'.$model->twitter_id,
            ],
            [
                'type' => 'linked-in',
                'link' => '/'.$model->linkedin_id,
            ]
        ];

        return array_merge(parent::run($model), [
            'pitches' => $model->pitches,
            'countPitches' => $countPitches,
            'countPublicistInquiries' => $countPublicistInquiries,
            'socialLinks' => $socialLinks
        ]);
    }
}