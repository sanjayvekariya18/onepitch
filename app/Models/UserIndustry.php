<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\UserIndustry
 *
 * @property int $id
 * @property int $user_id
 * @property int $industry_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read mixed $topics_list
 * @property-read \App\Models\Industry $industry
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\IndustryTopic[] $topics
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\UserIndustry whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\UserIndustry whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\UserIndustry whereIndustryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\UserIndustry whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\UserIndustry whereUserId($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\IndustryTopic[] $userIndustryTopics
 */
class UserIndustry extends BaseModel
{
	protected $table = 'user_industry';
	
	protected $fillable = [
			'user_id', 'industry_id',
	];
	
	public function user()
	{
		return $this->belongsTo('App\Models\User');
	}
	
	public function industry()
	{
		return $this->belongsTo('App\Models\Industry');
	}

	public function topics()
	{
		return $this->belongsToMany(
			'App\Models\IndustryTopic', 'user_industry_topics',
			'user_industry_id', 'topic_id'
		);
	}

	public function getTopicsListAttribute()
	{
		$list = [];
		foreach ($this->topics as $topic) {
			if (!$topic->is_custom) {
				$list[] = $topic->id;
			} else {
				$list['custom'] = $topic->title;
			}
		}
		return $list;
	}

	public static function setIndustries($user, $data) {
		foreach ($user->user_industries as $u_industry) {
			$u_industry->topics()->detach();
		}
		$user->industries()->detach();

		foreach ($data as $item) {
			$user_id = $user->id;
			$industry_id = $item['industry'];
			$topics = $item['topics'];

			$user_industry = UserIndustry::create([
				'user_id' => $user_id,
				'industry_id' => $industry_id,
			]);

			$user_industry->topics()->attach($topics);
		}
	}

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
	public function userIndustryTopics ()
    {
        return $this->belongsToMany(IndustryTopic::class, 'user_industry_topics', 'user_industry_id','topic_id');
    }
}