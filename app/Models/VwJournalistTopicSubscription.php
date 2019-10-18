<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VwJournalistTopicSubscription extends Model
{
    /**
     * The table associated with the model
     *
     * @var string
     */
    protected $table = 'vw_journalist_topic_subscription';

    /**
     * Disable model timestamp
     *
     * @var bool
     */
    public $timestamps = FALSE;
}