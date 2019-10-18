<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserTour
 *
 * @property int $id
 * @property int $user_id
 * @property int $profile
 * @property int $interests
 * @property int $pitch
 * @property int $inquiry
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @mixin \Eloquent
 */
class UserTour extends BaseModel
{
    protected $table = 'user_tours';

    protected $fillable = [
        'user_id', 'profile', 'edit_profile', 'interests', 'pitch_what', 'pitch_why', 'pitch_where',
        'inquiry_what', 'inquiry_want', 'inquiry_where',
    ];

    const STATUS_DEFAULT = 0;
    const STATUS_COMPLETED = 3;

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }
}