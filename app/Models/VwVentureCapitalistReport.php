<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VwVentureCapitalistReport extends Model
{
    /**
     * The table associated with the model
     *
     * @var string
     */
    protected $table = 'vw_vccomms_report';

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
    protected $dates = ['created_at'];

}