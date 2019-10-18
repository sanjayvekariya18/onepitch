<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\MeetUp
 *
 * @property int $id
 * @property int $user_id
 * @property int $status
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @mixin \Eloquent
 */
class MeetUp extends BaseModel
{
    protected $table = 'meet_ups';

    protected $fillable = [
        'user_id', 'status',
    ];

    const STATUS_DECLINED = 0;
    const STATUS_ACCEPTED = 1;

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}