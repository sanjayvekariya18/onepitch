<?php

namespace App\Models;

/**
 * App\Models\PitchLog
 *
 * @property int $id
 * @property int $pitch_id
 * @property int $user_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\Pitch $pitch
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PitchLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PitchLog whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PitchLog extends BaseModel
{
    protected $table = 'pitch_logs';

    protected $fillable = [
        'pitch_id', 'user_id',
    ];

    public function pitch()
    {
        return $this->belongsTo('App\Models\Pitch');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }

    public static function getUserPitchIds ($email, $timestamp)
    {
        $pitchLogs = new PitchLog();
        $userId = User::where('email', $email)->where('role', User::ROLE_JOURNALIST)->first()->id;
        $pitchIds = $pitchLogs->where('user_id', $userId)->whereDate('created_at', '=', date('Y-m-d', $timestamp))->pluck('pitch_id');
        return $pitchIds;
    }
}
