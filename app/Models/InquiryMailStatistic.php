<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InquiryMailStatistic extends BaseModel
{
    protected $table = 'inquiry_mail_statistics';

    public function inquiry()
    {
        return $this->belongsTo('App\Models\Inquiry');
    }

    public function publicist()
    {
        return $this->belongsTo('App\Models\User', 'publicist_id');
    }

    public function journalist()
    {
        return $this->belongsTo('App\Models\User', 'journalist_id');
    }

    public static function track(Inquiry $inquiry, $publicist_email)
    {
        $publicist = User::publicist()->where('email', $publicist_email)->first();

        $track = new InquiryMailStatistic();
        $track->inquiry_id = $inquiry->id;
        $track->journalist_id = $inquiry->user_id;
        $track->publicist_email = $publicist_email;
        $track->publicist_id = (!empty($publicist)) ? $publicist->id : null;

        $track->save();

        return $track;
    }
}