<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VwUserAnalytics extends Model
{
    /**
     * The table associated with the model
     *
     * @var string
     */
    protected $table = 'vw_user_analytics';

    /**
     * Disable model timestamp
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * Dates treated as carbon instance.
     *
     * @var array
     */
    protected $dates = ['created_at', 'updated_at'];

}