<?php

namespace App\Transformers\Users\Journalists;

use App\Models\Inquiry;
use App\Models\User;
use App\Transformers\Industries\UserIndustryTransformer;

class JournalistExtendedTransformer extends JournalistTransformer
{
    /**
     * Transform the supplied data.
     *
     * @param User $model
     * @return array
     */
    public function run($model) : array
    {
        $countInquiries = [
            'all' => $model->inquiries()->count(),
            'draft' => $model->inquiries->where('status', Inquiry::STATUS_DRAFT)->count(),
            'new' => $model->inquiries->where('status', Inquiry::STATUS_NEW)->count(),
            'upcoming' => $model->inquiries->where('status', Inquiry::STATUS_UPCOMING)->count(),
            'published' => $model->inquiries->where('status', Inquiry::STATUS_PUBLISHED)->count(),
            'rejected' => $model->inquiries->where('status', Inquiry::STATUS_REJECTED)->count()
        ];

        $countJournalistPitches = [
            'saved' => $model->saved_pitches()->count(),
            'all' => $model->pitch_logs()->count(),
        ];
        
        return array_merge(parent::run($model), [
            'inquiries' => $model->inquiries,
            'countInquiries' => $countInquiries,
            'countJournalistPitches' => $countJournalistPitches,
            'industries' => transform($model->user_industries, new UserIndustryTransformer()),
            'socialLinks' => $model->getSocials()
        ]);
    }
}