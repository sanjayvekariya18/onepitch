<?php

namespace App\Models;

/**
 * App\Models\InquiryIndustryTopic
 *
 * @property int $inquiry_industry_id
 * @property int $topic_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\InquiryIndustry $inquiry_industry
 * @property-read \App\Models\IndustryTopic $topic
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryIndustryTopic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryIndustryTopic whereInquiryIndustryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryIndustryTopic whereTopicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryIndustryTopic whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class InquiryIndustryTopic extends BaseModel
{
    protected $table = 'inquiry_industry_topics';

    protected $fillable = [
        'inquiry_industry_id', 'topic_id',
    ];

    public function inquiry_industry()
    {
        return $this->belongsTo('App\Models\InquiryIndustry');
    }

    public function topic()
    {
        return $this->belongsTo('App\Models\IndustryTopic', 'topic_id');
    }
}