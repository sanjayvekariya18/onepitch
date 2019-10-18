<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\InquiryEvent
 *
 * @property int $id
 * @property int $inquiry_id
 * @property string $title
 * @property string|null $date_from
 * @property string|null $date_to
 * @property string|null $time_from
 * @property string|null $time_to
 * @property string|null $timezone
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\Inquiry $inquiry
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryEvent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryEvent whereDateFrom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryEvent whereDateTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryEvent whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryEvent whereInquiryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryEvent whereTimeFrom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryEvent whereTimeTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryEvent whereTimezone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryEvent whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryEvent whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class InquiryEvent extends BaseModel
{
    protected $table = 'inquiry_events';

    protected $fillable = [
        'inquiry_id', 'title', 'date_from', 'date_to',
        'time_from', 'time_to', 'timezone',
    ];

    public function inquiry()
    {
        return $this->belongsTo('App\Models\Inquiry');
    }

    public function isRange() {
        if ($this->date_from && $this->date_to) {
            return true;
        }

        return false;
    }

    public function getDateString() {
        $str = '';
        if ($this->date_from) {
            $str .= date('F j', strtotime($this->date_from));
        }
        if ($this->date_to) {
            $format = date('F', strtotime($this->date_from)) == date('F', strtotime($this->date_to)) ? 'j' : 'F j';
            $str .= '-'.date($format, strtotime($this->date_to));
        }

        return $str;
    }

    public function getTimeString() {
        $str = '';
        if ($this->time_from) {
            $str .= date('g:i A', strtotime($this->time_from));
        }
        if ($this->time_to) {
            $str .= ' - '.date('g:i A', strtotime($this->time_to));
        }

        return $str;
    }
}