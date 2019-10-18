<?php

namespace App\Models;

/**
 * App\Models\UserCompanyIndustry
 *
 * @property int $id
 * @property int $user_company_id
 * @property int $industry_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read mixed $topics_list
 * @property-read \App\Models\Industry $industry
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\UserCompanyIndustryTopics[] $topics
 */
class UserCompanyIndustry extends BaseModel
{
    protected $table = 'user_company_industries';

    protected $fillable = [
        'user_company_id', 'industry_id',
    ];

    public function user_company()
    {
        return $this->belongsTo('App\Models\UserCompany');
    }

    public function industry()
    {
        return $this->belongsTo('App\Models\Industry');
    }

    public function topics()
    {
        return $this->hasMany('App\Models\UserCompanyIndustryTopics');
    }
}