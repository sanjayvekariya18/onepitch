<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\IndustryTopic
 *
 * @property int $id
 * @property string $title
 * @property string|null $description
 * @property int $is_custom
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IndustryTopic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IndustryTopic whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IndustryTopic whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IndustryTopic whereIsCustom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IndustryTopic whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IndustryTopic whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int $for_event
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\IndustryTopic whereForEvent($value)
 */
class IndustryTopic extends BaseModel
{
    use FullTextSearch, SoftDeletes;

	protected $table = 'industry_topics';
	
	protected $fillable = [
        'title', 'description', 'is_custom', 'for_event',
	];

    protected $dates = ['deleted_at'];
    /**
     * The columns of the full text index
     */
    protected $searchable = [
        'title'
    ];

    public function user_company_industry_topics() {
        return $this->hasMany('App\Models\UserCompanyIndustryTopics', 'topic_id');
    }

    public function keywords() {
        return $this->hasMany('App\Models\TopicKeyword');
    }
}