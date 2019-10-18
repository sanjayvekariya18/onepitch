<?php

namespace App\Models;

/**
 * App\Models\IndustryKeyword
 *
 * @property int $id
 * @property int $industry_id
 * @property string $keyword
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\Industry $industry
 * @mixin \Eloquent
 */
class IndustryKeyword extends BaseModel
{
    use FullTextSearch;

    protected $table = 'industry_keywords';

    protected $fillable = [
        'industry_id', 'keyword',
    ];

    /**
     * The columns of the full text index
     */
    protected $searchable = [
        'keyword'
    ];

    public function industry()
    {
        return $this->belongsTo('App\Models\Industry');
    }
}
