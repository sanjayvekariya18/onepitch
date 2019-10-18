<?php

namespace App\Models;

/**
 * App\Models\PitchMailClick
 *
 * @property int $id
 * @property int $pitch_id
 * @property int $user_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\Pitch $pitch
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PitchMailClick whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PitchMailClick whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PitchMailClick extends BaseModel
{
    protected $table = 'pitch_mail_clicks';

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
}
