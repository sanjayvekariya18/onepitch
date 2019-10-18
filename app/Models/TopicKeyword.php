<?php

namespace App\Models;

/**
 * App\Models\TopicKeyword
 *
 * @property int $id
 * @property int $industry_topic_id
 * @property string $keyword
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\IndustryTopic $topic
 * @mixin \Eloquent
 */
class TopicKeyword extends BaseModel
{
    use FullTextSearch;

    protected $table = 'topic_keywords';

    protected $fillable = [
        'industry_topic_id', 'keyword',
    ];

    /**
     * The columns of the full text index
     */
    protected $searchable = [
        'keyword'
    ];

    public function topic()
    {
        return $this->belongsTo('App\Models\IndustryTopic', 'industry_topic_id');
    }
}
