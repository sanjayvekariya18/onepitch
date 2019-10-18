<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VwActiveJournalistLogin extends Model
{
    /**
     * The table associated with the model
     *
     * @var string
     */
    protected $table = 'vw_active_journalist_login';

    /**
     * Disable model timestamp
     *
     * @var bool
     */
    public $timestamps = FALSE;
}