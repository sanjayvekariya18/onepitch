<?php

namespace App\Models;

/**
 * App\Models\UserCompanyClicksLog
 *
 * @property int $id
 * @property int $user_id
 * @property int $brand_user_id
 * @property string|null $clicked
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \App\Models\User $brand_user
 */
class UserCompanyClicksLog extends BaseModel
{
    protected $table = 'user_company_clicks_logs';

    protected $fillable = [
        'user_id', 'brand_user_id', 'clicked'
    ];

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function brand_user()
    {
        return $this->belongsTo('App\Models\User', 'brand_user_id');
    }
}