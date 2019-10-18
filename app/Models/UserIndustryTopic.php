<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserIndustryTopic
 *
 * @property int $user_industry_id
 * @property int $topic_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\IndustryTopic $topic
 * @property-read \App\Models\UserIndustry $user_industry
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\UserIndustryTopic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\UserIndustryTopic whereTopicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\UserIndustryTopic whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\UserIndustryTopic whereUserIndustryId($value)
 * @mixin \Eloquent
 */
class UserIndustryTopic extends BaseModel
{
	protected $table = 'user_industry_topics';
	
	protected $fillable = [
			'user_industry_id', 'topic_id',
	];
	
	public function user_industry()
	{
		return $this->belongsTo('App\Models\UserIndustry');
	}
	
	public function topic()
	{
		return $this->belongsTo('App\Models\IndustryTopic', 'topic_id');
	}
}