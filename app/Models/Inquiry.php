<?php

namespace App\Models;

use App\Notifications\InquiryApproved;
use App\Notifications\InquiryDecline;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Inquiry
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
 * @property-read \App\Models\InquiryEvent $event
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Industry[] $industries
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\InquiryIndustry[] $inquiry_industries
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\InquiryFile[] $files
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SavedInquiry[] $saved_inquiries
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\InquiryLog[] $logs
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\InquiryView[] $views
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\InquiryMailClick[] $mail_clicks
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\InquiryMailStatistic[] $mail_statistics
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereCompany($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereWhatPoint1($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereWhatPoint2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereWhatPoint3($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereWhatPoint4($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereWhatPoint5($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereWhyPoint1($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereWhyPoint2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereWhyPoint3($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereWhyPoint4($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereWhyPoint5($value)
 * @mixin \Eloquent
 * @property int $status
 * @property string|null $uploaded_at
 * @property string|null $sent_at
 * @property string|null $clicks
 * @property string|null $opens
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereSentAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereUploadedAt($value)
 * @property string $accepted_at
 * @property int $sent_amount
 * @property string|null $confirmation_code
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereAcceptedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereConfirmationCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\Inquiry whereSentAmount($value)
 */
class Inquiry extends BaseModel
{
    protected $table = 'inquiries';

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
        return $this->belongsToMany('App\Models\Industry', 'inquiry_industry', 'inquiry_id', 'industry_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user () : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function event() {
        return $this->hasOne('App\Models\InquiryEvent');
    }

    public function inquiry_industries() {
        return $this->hasMany('App\Models\InquiryIndustry');
    }

    public function files() {
        return $this->hasMany('App\Models\InquiryFile');
    }

    public function saved_inquiries() {
        return $this->hasMany('App\Models\SavedInquiry');
    }

    public function logs() {
        return $this->hasMany('App\Models\InquiryLog');
    }

    public function views() {
        return $this->hasMany('App\Models\InquiryView');
    }

    public function mail_clicks() {
        return $this->hasMany('App\Models\InquiryMailClick');
    }

    public function mail_statistics() {
        return $this->hasMany('App\Models\InquiryMailStatistic');
    }

    public function listIndustriesWithTopics() {
        $industries = [];
        foreach ($this->industries as $industry) {
            $temp['industry'] = $industry;
            $temp['json'] = [];
            $p_industry = $this->inquiry_industries ? $this->inquiry_industries[0] : null;
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
        if (count($this->inquiry_industries)) {
            $industry = $this->inquiry_industries[0];

            $topics = $industry->topics;
        }

        $temp['industries'] = $this->industries;
        $temp['topics'] = $topics;
        $temp['event'] = $this->event;

        return $temp;
    }

    public function listUserIndustriesAndTopics($user) {
        $inquiryDetails = $this->listIndustriesAndTopics();

        //Unique User Industries
        $intersect = $user->industries->intersect($inquiryDetails['industries']);
        $intersect->all();
        $inquiryDetails['industries'] = $intersect;

        $sample = [];
        $topicObj = [];

        foreach ($user->listIndustriesWithTopics() as $indus) {
            $sample = array_unique(array_merge($sample, json_decode($indus['json'])->topics));
        }
        foreach ($sample as $sam) {
            array_push($topicObj, IndustryTopic::find($sam));
        }

        //Unique User Topics
        $topicIntersect = collect($topicObj)->intersect($inquiryDetails['topics']);
        $topicIntersect->all();
        $defaultTopics = IndustryTopic::where('is_custom', 0)->get();
        $diff = $inquiryDetails['topics']->diff($defaultTopics);
        $diff->all();
        $mergedTopicIntersect = $topicIntersect->merge($diff);
        $mergedTopicIntersect->all();
        if ($mergedTopicIntersect->isEmpty()) {
            $inquiryDetails['topics'] = $this->listIndustriesAndTopics()['topics'];
        } else {
            $inquiryDetails['topics'] = $mergedTopicIntersect;
        }

        return $inquiryDetails;
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
            self::STATUS_REJECTED => 'Inquiry Rejected',
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
                $to = 5; //8am
            } else {
                $to = 29; //24h + 8am
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
        foreach ($this->inquiry_industries as $inquiry_industry) {
            $collection = $collection->merge($inquiry_industry->topics);
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

        self::updating(function (Inquiry $inquiry) {
            $currentInquiry = (new self())->find($inquiry->id);
            if ($inquiry->status !== $currentInquiry->status) {
                if ($inquiry->status === self::STATUS_UPCOMING) {
                    $inquiry->user->notify(new InquiryApproved($inquiry));
                } elseif ($inquiry->status === self::STATUS_REJECTED) {
                    $inquiry->user->notify(new InquiryDecline($inquiry));
                }
            }
        });
    }

    public function remove() {
        foreach ($this->inquiry_industries as $inquiry_industry) {
            $inquiry_industry->topics()->detach();
            $inquiry_industry->delete();
        }

        $this->delete();
    }
}