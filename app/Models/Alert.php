<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class Alert extends BaseModel
{
    use SoftDeletes;

    const ROLE_JOURNALIST = 1;
    const ROLE_PUBLICIST = 2;

    /**
     * Table associated with the model.
     *
     * @var string
     */
    protected $table = 'alerts';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'role',
        'location',
        'link',
        'inquiry_industry_topic_id',
        'pitch_industry_topic_id',
        'message',
        'due_date',
        'status',
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'deleted_at',
        'due_date',
    ];

    /**
     * Scope to return those alerts with status pending.
     *
     * @param $query
     * @return mixed
     */
    public function scopePending($query)
    {
        return $query->where('status', 1);
    }

    /**
     * Return role name.
     *
     * @return string
     */
    public function getRoleName()
    {
        $roles = [
            self::ROLE_JOURNALIST => 'Journalist',
            self::ROLE_PUBLICIST => 'Publicist',
        ];

        return isset($roles[$this->role]) ? $roles[$this->role] : null;
    }

    /**
     * Return status name.
     *
     * @return string
     */
    public function getStatusName()
    {
        $status = [
            1 => 'Pending',
            2 => 'Sending',
            3 => 'Sent',
            4 => 'Failed',
        ];

        return isset($status[$this->status]) ? $status[$this->status] : null;
    }

    /**
     * Return filter description name.
     *
     * @return string
     */
    public function getFilterDescription()
    {
        if (!empty($this->user_id)) {
            return 'User';
        }
        if (!empty($this->role)) {
            return 'Role';
        }
        if (!empty($this->location)) {
            return 'Location';
        }
        if (!empty($this->inquiry_industry_topic_id)) {
            return 'Inquiry Industry Topic';
        }
        if (!empty($this->pitch_industry_topic_id)) {
            return 'Pitch Industry Topic';
        }

        return null;
    }
}