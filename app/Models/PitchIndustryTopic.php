<?php

namespace App\Models;

/**
 * App\Models\PitchIndustryTopic
 *
 * @property int $pitch_industry_id
 * @property int $topic_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\PitchIndustry $pitch_industry
 * @property-read \App\Models\IndustryTopic $topic
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PitchIndustryTopic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PitchIndustryTopic wherePitchIndustryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PitchIndustryTopic whereTopicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PitchIndustryTopic whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PitchIndustryTopic extends BaseModel
{
	protected $table = 'pitch_industry_topics';
	
	protected $fillable = [
			'pitch_industry_id', 'topic_id',
	];
	
	public function pitch_industry()
	{
		return $this->belongsTo('App\Models\PitchIndustry');
	}
	
	public function topic()
	{
		return $this->belongsTo('App\Models\IndustryTopic', 'topic_id');
	}
}