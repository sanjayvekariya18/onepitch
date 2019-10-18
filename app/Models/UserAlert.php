<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserAlert extends BaseModel
{
    use SoftDeletes;

    /**
     * Table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_alerts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'message',
        'link',
        'seen'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * Get the user that owns the alert.
     *
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }

    /**
     * Scope to get unread alerts.
     *
     * @param $query
     * @return mixed
     */
    public function scopeNotifiable($query)
    {
        return $query->where('notifiable', 1);
    }
}