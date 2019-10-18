<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\InquiryIndustry
 *
 * @property int $id
 * @property int $inquiry_id
 * @property int $industry_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read mixed $topics_list
 * @property-read \App\Models\Industry $industry
 * @property-read \App\Models\Inquiry $inquiry
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\IndustryTopic[] $topics
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryIndustry whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryIndustry whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryIndustry whereIndustryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryIndustry whereInquiryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryIndustry whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class InquiryIndustry extends BaseModel
{
    protected $table = 'inquiry_industry';

    protected $fillable = [
        'inquiry_id', 'industry_id',
    ];

    public function inquiry()
    {
        return $this->belongsTo('App\Models\Inquiry');
    }

    public function industry()
    {
        return $this->belongsTo('App\Models\Industry');
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

    public function topics()
    {
        return $this->belongsToMany(
            'App\Models\IndustryTopic', 'inquiry_industry_topics',
            'inquiry_industry_id', 'topic_id'
        );
    }

    public static function setIndustries($inquiry, $data) {
        foreach ($inquiry->inquiry_industries as $p_industry) {
            $p_industry->topics()->where('industry_topics.is_custom', 1)->delete();
            $p_industry->topics()->detach();
        }
        $inquiry->industries()->detach();

        if (is_array($data)) {
            foreach ($data as $item) {
                $inquiry_id = $inquiry->id;
                $industry_id = $item['industry'];

                $inquiry_industry = InquiryIndustry::create([
                    'inquiry_id' => $inquiry_id,
                    'industry_id' => $industry_id,
                ]);

                $topics = [];
                foreach ($item['topics'] as $key => $topic_id) {
                    if (!IndustryTopic::find($topic_id)) {
                        $topic = IndustryTopic::firstOrCreate(['title' => $topic_id, 'is_custom' => 1]);
                        $topics[] = $topic->id;
                    } else {
                        $topics[] = $topic_id;
                    }
                }
                if (isset($item['event']) && $item['event']) {
                    $topic = IndustryTopic::getOneBy('for_event', 1);
                    $topics[] = $topic->id;
                }

                $inquiry_industry->topics()->attach($topics);

                if (isset($item['event']) && $item['event']) {
                    $date = explode(' - ', $item['event_date']);
                    $date_from = isset($date[0]) ? convertDateToStandard($date[0]) : null;
                    $date_to = isset($date[1]) ? convertDateToStandard($date[1]) : null;

                    $event = InquiryEvent::firstOrNew(['inquiry_id' => $inquiry->id]);
                    $event->title = isset($item['event_title']) ? $item['event_title'] : null;
                    $event->date_from = $date_from;
                    $event->date_to = $date_to;

                    if (isset($item['event_time']) && $item['event_time']) {
                        $time = explode(' - ', $item['event_time']);
                        $event->time_from = isset($time[0]) ? date('H:i:00', strtotime($time[0])) : null;
                        $event->time_to = isset($time[1]) ? date('H:i:00', strtotime($time[1])) : null;
                        $event->timezone = isset($item['event_timezone']) && $item['event_timezone'] ? $item['event_timezone'] : null;
                    }

                    $event->save();
                } else {
                    $event = InquiryEvent::getOneBy('inquiry_id', $inquiry->id);
                    if ($event) {
                        $event->delete();
                    }
                }
            }
        }
    }
}