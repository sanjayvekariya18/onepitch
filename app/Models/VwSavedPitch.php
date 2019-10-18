<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VwSavedPitch extends Model
{
    /**
     * The table associated with the model
     *
     * @var string
     */
    protected $table = 'vw_saved_pitches';

    /**
     * Disable model timestamp
     *
     * @var bool
     */
    public $timestamps = FALSE;
}