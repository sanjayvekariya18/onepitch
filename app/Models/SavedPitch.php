<?php

namespace App\Models;

/**
 * App\Models\SavedPitch
 *
 * @property int $id
 * @property int $pitch_id
 * @property int $user_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\Pitch $pitch
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SavedPitch whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\SavedPitch whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class SavedPitch extends BaseModel
{
    protected $table = 'saved_pitches';

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
