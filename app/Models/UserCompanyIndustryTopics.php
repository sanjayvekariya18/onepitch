<?php

namespace App\Models;


/**
 * App\Models\UserCompanyIndustryTopics
 *
 * @property int $user_company_industry_id
 * @property int $topic_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\IndustryTopic $topic
 * @property-read \App\Models\UserCompanyIndustry $user_company_industry
 * @mixin \Eloquent
 */
class UserCompanyIndustryTopics extends BaseModel
{
    protected $table = 'user_company_industry_topics';

    protected $fillable = [
        'user_company_industry_id', 'topic_id',
    ];

    public function user_company_industry()
    {
        return $this->belongsTo('App\Models\UserCompanyIndustry');
    }

    public function topic()
    {
        return $this->belongsTo('App\Models\IndustryTopic', 'topic_id');
    }
}