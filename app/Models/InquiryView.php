<?php

namespace App\Models;

/**
 * App\Models\InquiryView
 *
 * @property int $id
 * @property int $inquiry_id
 * @property int $user_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\Inquiry $inquiry
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryView whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryView whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class InquiryView extends BaseModel
{
    protected $table = 'inquiry_views';

    protected $fillable = [
        'inquiry_id', 'user_id',
    ];

    public function inquiry()
    {
        return $this->belongsTo('App\Models\Inquiry');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }
}
