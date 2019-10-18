<?php

namespace App\Models;

use App\Notifications\PitchApproved;
use App\Notifications\PitchDecline;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Pitch
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $subject
 * @property string|null $company
 * @property string|null $website
 * @property string|null $what_point_1
 * @property string|null $what_point_2
 * @property string|null $what_point_3
 * @property string|null $what_point_4
 * @property string|null $what_point_5
 * @property string|null $why_point_1
 * @property string|null $why_point_2
 * @property string|null $why_point_3
 * @property string|null $why_point_4
 * @property string|null $why_point_5
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\PitchEvent $event
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Industry[] $industries
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PitchIndustry[] $pitch_industries
 * @property-read \App\Models\PitchPressRelease $press_release
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PitchFile[] $files
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SavedPitch[] $saved_pitches
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PitchLog[] $logs
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PitchView[] $views
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PitchMailClick[] $mail_clicks
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\PitchMailStatistic[] $mail_statistics
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereWhatPoint1($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereWhatPoint2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereWhatPoint3($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereWhatPoint4($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereWhatPoint5($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereWhyPoint1($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereWhyPoint2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereWhyPoint3($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereWhyPoint4($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereWhyPoint5($value)
 * @mixin \Eloquent
 * @property int $status
 * @property string|null $uploaded_at
 * @property string|null $sent_at
 * @property string|null $clicks
 * @property string|null $opens
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereSentAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereUploadedAt($value)
 * @property string $accepted_at
 * @property int $sent_amount
 * @property string|null $confirmation_code
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereAcceptedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereConfirmationCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Pitch whereSentAmount($value)
 */
class Pitch extends BaseModel
{
	protected $table = 'pitches';
	
	protected $fillable = [
		'user_id', 'status', 'subject', 'company', 'website', 'what_point_1',
		'what_point_2', 'what_point_3', 'what_point_4', 'what_point_5',
		'why_point_1', 'why_point_2', 'why_point_3', 'why_point_4', 'why_point_5',
		'uploaded_at', 'sent_at', 'sent_amount', 'clicks', 'opens', 'confirmation_code',
        'accepted_at', 'mailnuggets_id'
	];

	const STATUS_DRAFT = 0;
	const STATUS_NEW = 1;
	const STATUS_UPCOMING = 2;
	const STATUS_PUBLISHED = 3;
	const STATUS_REJECTED = 10;

	public function industries() {
		return $this->belongsToMany('App\Models\Industry', 'pitch_industry', 'pitch_id', 'industry_id');
	}

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user () : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

	public function event() {
		return $this->hasOne('App\Models\PitchEvent');
	}

    public function pitchEdits() {
        return $this->hasMany('App\Models\PitchEdit');
    }

	public function pitch_industries() {
		return $this->hasMany('App\Models\PitchIndustry');
	}

    public function press_release() {
        return $this->hasOne('App\Models\PitchPressRelease');
    }

    public function files() {
        return $this->hasMany('App\Models\PitchFile');
    }

    public function saved_pitches() {
        return $this->hasMany('App\Models\SavedPitch');
    }

    public function logs() {
        return $this->hasMany('App\Models\PitchLog');
    }

    public function views() {
        return $this->hasMany('App\Models\PitchView');
    }

    public function mail_clicks() {
        return $this->hasMany('App\Models\PitchMailClick');
    }

    public function mail_statistics() {
        return $this->hasMany('App\Models\PitchMailStatistic');
    }

	public function listIndustriesWithTopics() {
		$industries = [];
		foreach ($this->industries as $industry) {
			$temp['industry'] = $industry;
			$temp['json'] = [];
			$p_industry = $this->pitch_industries ? $this->pitch_industries[0] : null;
			if ($p_industry) {
				$topics = $p_industry->topics_list;
				$temp['json']['topics'] = $topics;

			}
			$temp['json']['industry'] = $industry->id;

			$temp['json'] = json_encode($temp['json']);

			$industries[] = $temp;
		}

		return $industries;
	}

	public function listIndustriesAndTopics() {
		$topics = [];
		$temp = [];
		if (count($this->pitch_industries)) {
			$industry = $this->pitch_industries[0];

			$topics = $industry->topics;
		}

		$temp['industries'] = $this->industries;
		$temp['topics'] = $topics;
		$temp['event'] = $this->event;

		return $temp;
	}

    public function listUserIndustriesAndTopics($user) {
        $pitchDetails = $this->listIndustriesAndTopics();

        //Unique User Industries
        $intersect = $user->industries->intersect($pitchDetails['industries']);
        $intersect->all();
        $pitchDetails['industries'] = $intersect;

        $userTopics = [];
        $topicObj = [];
        $pitchTopics = [];

        foreach ($user->listIndustriesWithTopics() as $indus) {
            if (collect($user->listIndustriesWithTopics())->pluck('industry')->contains($indus['industry']->id)) {
                $userTopics = array_unique(array_merge($userTopics, json_decode($indus['json'])->topics));
            }
        }

        foreach ($userTopics as $sam) {
            array_push($topicObj, IndustryTopic::find($sam));
        }

        foreach ($pitchDetails['topics'] as $pitchTopic) {
            array_push($pitchTopics, IndustryTopic::find($pitchTopic->id));
        }

        //Unique User Topics
        $topicIntersect = collect($topicObj)->intersect($pitchTopics);
        $topicIntersect->all();
        $defaultTopics = IndustryTopic::where('is_custom', 0)->get();
        $diff = $pitchDetails['topics']->diff($defaultTopics);
        $diff->all();
        $mergedTopicIntersect = $topicIntersect->merge($diff);
        $mergedTopicIntersect->all();
        if ($mergedTopicIntersect->isEmpty()) {
            $pitchDetails['topics'] = $this->listIndustriesAndTopics()['topics'];
        } else {
            $pitchDetails['topics'] = $mergedTopicIntersect;
        }

        return $pitchDetails;
    }

    /**
     * @return array
     */
    public static function getStatuses () : array
    {
        return [
            self::STATUS_DRAFT,
            self::STATUS_NEW,
            self::STATUS_UPCOMING,
            self::STATUS_PUBLISHED,
            self::STATUS_REJECTED,
        ];
    }

	public static function getStatusesToEdit () : array
	{
		return [
			self::STATUS_DRAFT,
			self::STATUS_NEW,
            self::STATUS_UPCOMING,
            self::STATUS_PUBLISHED,
		];
	}

	public function getStatusClass() {
		$arr = [
			self::STATUS_DRAFT => 'draft',
			self::STATUS_NEW => 'being-reviewed',
			self::STATUS_UPCOMING => 'live-soon',
			self::STATUS_PUBLISHED => 'approved',
			self::STATUS_REJECTED => 'rejected',
		];

		return $arr[$this->status];
	}

    public function getMetricsClass() {
        if ($this->status > self::STATUS_NEW){
            return 'display-metric';
        }
        return '';
    }

    /**
     * @return string
     */
	public function getStatusText($extended = false) : string
    {
		$arr = [
			self::STATUS_DRAFT => 'Saved Draft',
			self::STATUS_NEW => 'Being Reviewed',
			self::STATUS_UPCOMING => 'Live in [in_time]',
			self::STATUS_PUBLISHED => $this->sent_amount ? $this->sent_amount.' Emails Sent' : 'No Matches',
			self::STATUS_REJECTED => 'Pitch Rejected',
		];

		if ($this->status === self::STATUS_UPCOMING && $this->accepted_at < Carbon::now()->toDateString() . ' 05:00:00') {
            return "Live and is in queue";
		}

        if ($this->status === self::STATUS_UPCOMING) {

            if ($extended) {
                $current = Carbon::now();

                $publicDate = $current->copy()->hour(5)->minute(0);

                if ($current->hour >= 5) {
                    $publicDate->addDay();
                }

                $str = $publicDate->diffInHours().' hours '.($publicDate->diffInMinutes() - $publicDate->diffInHours() * Carbon::MINUTES_PER_HOUR) .' minutes';
                return str_replace('[in_time]', $str, $arr[$this->status]);
            }

            if (date('G') < 5) {
                $to = 5; //5am
            } else {
                $to = 29; //24h + 5am
            }

            $diff = $to - date('G');
            $str = $diff . ' hours';
            return str_replace('[in_time]', $str, $arr[$this->status]);
		}

		return $arr[$this->status];
	}

    /**
     * @param string $format
     * @return false|string
     */
    public function sentAtFormat($format = 'l, F j, Y')
    {
        if ($this->sent_at) {
            return date($format, strtotime($this->sent_at));
        }

        if (date('G') < 8) {
            $to = 8; //8am
        } else {
            $to = 32; //24h + 8am
        }
        $diff = $to - date('G');
        $time = time() + $diff*60*60;

        return date($format, $time);
    }

    /**
     * @return Collection
     */
    public function topics () : Collection
    {
        $collection = new Collection();
        foreach ($this->pitch_industries as $pitch_industry) {
            $collection = $collection->merge($pitch_industry->topics);
        }
        return $collection;
    }

    /**
     * @param bool $limit
     * @return string
     */
    public function getTopicsTitle ($limit = false) : string
    {
        $topics = $this->topics();
        $str = '';
        foreach ($topics as $key => $topic) {
            $str .= $topic->title;
            if ($limit !== false && $limit > $key) {
                return $str.' +'.($topics->count() - $key + 1);
            }
        }
        return $str;
    }

    /**
     * @return array
     */
    public function getStatusTypes () : array
    {
        return [
            'draft' => $this->status === self::STATUS_DRAFT,
            'new' => $this->status === self::STATUS_NEW,
            'upcoming' => $this->status === self::STATUS_UPCOMING,
            'published' => $this->status === self::STATUS_PUBLISHED,
            'rejected' => $this->status === self::STATUS_REJECTED
        ];
    }

    /**
     * @return Collection
     */
    public function getWhat () : Collection
    {
        $collection = new Collection();

        for ($i = 1; $i <= 5; $i++) {
            $point = $this->{'what_point_'.$i};
            if ($point !== null) {
                $collection->push($point);
            }
        }

        return $collection;
    }

    /**
     * @return Collection
     */
    public function getWhy () : Collection
    {
        $collection = new Collection();

        for ($i = 1; $i <= 5; $i++) {
            $point = $this->{'why_point_'.$i};
            if ($point !== null) {
                $collection->push($point);
            }
        }

        return $collection;
    }

    /**
     * @return IndustryTopic|null
     */
    public function newTopic ()
    {
        return $this->topics()->where('is_custom', true)->first();
    }

    public static function boot ()
    {
        parent::boot();

        self::updating(function (Pitch $pitch) {
            $currentPitch = (new self())->find($pitch->id);
            if ($pitch->status !== $currentPitch->status) {
                if ($pitch->status === self::STATUS_UPCOMING) {
                    $pitch->user->notify(new PitchApproved($pitch));
                } elseif ($pitch->status === self::STATUS_REJECTED) {
                    $pitch->user->notify(new PitchDecline($pitch));
                }
            }
        });
    }

    public function remove() {
    	foreach ($this->pitch_industries as $pitch_industry) {
    		$pitch_industry->topics()->detach();
    		$pitch_industry->delete();
		}

		$this->delete();
	}
}