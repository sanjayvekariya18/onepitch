<?php

namespace App\Models;

/**
 * App\Models\UserCompanySearchLog
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $term
 * @property int $industry_id
 * @property int topic_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\Industry $industry
 * @property-read \App\Models\IndustryTopic $topic
 */
class UserCompanySearchLog extends BaseModel
{
    protected $table = 'user_company_search_logs';

    protected $fillable = [
        'user_id', 'term', 'industry_id', 'topic_id'
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function industry()
    {
        return $this->belongsTo('App\Models\Industry', 'industry_id');
    }

    public function topic()
    {
        return $this->belongsTo('App\Models\IndustryTopic', 'topic_id');
    }
}