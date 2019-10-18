<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserCompanyMailStatistic extends BaseModel
{
    protected $table = 'user_company_mail_statistics';

    public function publicist()
    {
        return $this->belongsTo('App\Models\User', 'publicist_id');
    }

    public function journalist()
    {
        return $this->belongsTo('App\Models\User', 'journalist_id');
    }

    public static function track(User $user, $journalist_email)
    {
        $journalist = User::journalist()->where('email', $journalist_email)->first();

        $track = new UserCompanyMailStatistic();
        $track->publicist_id = $user->id;
        $track->journalist_email = $journalist_email;
        $track->journalist_id = (!empty($journalist)) ? $journalist->id : null;

        $track->save();

        return $track;
    }
}