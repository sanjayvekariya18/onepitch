<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VwBrandIndex extends Model
{
    /**
     * The table associated with the model
     *
     * @var string
     */
    protected $table = 'vw_brand_index';

    /**
     * Disable model timestamp
     *
     * @var bool
     */
    public $timestamps = FALSE;
}