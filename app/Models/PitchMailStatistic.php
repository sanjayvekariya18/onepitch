<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PitchMailStatistic extends BaseModel
{
    protected $table = 'pitch_mail_statistics';

    public function pitch()
    {
        return $this->belongsTo('App\Models\Pitch');
    }

    public function publicist()
    {
        return $this->belongsTo('App\Models\User', 'publicist_id');
    }

    public function journalist()
    {
        return $this->belongsTo('App\Models\User', 'journalist_id');
    }

    public static function track(Pitch $pitch, $journalist_email)
    {
        $journalist = User::journalist()->where('email', $journalist_email)->first();

        $track = new PitchMailStatistic();
        $track->pitch_id = $pitch->id;
        $track->publicist_id = $pitch->user_id;
        $track->journalist_email = $journalist_email;
        $track->journalist_id = (!empty($journalist)) ? $journalist->id : null;

        $track->save();

        return $track;
    }
}