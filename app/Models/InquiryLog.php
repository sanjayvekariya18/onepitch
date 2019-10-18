<?php

namespace App\Models;

/**
 * App\Models\InquiryLog
 *
 * @property int $id
 * @property int $inquiry_id
 * @property int $user_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\Inquiry $inquiry
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\InquiryLog whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class InquiryLog extends BaseModel
{
    protected $table = 'inquiry_logs';

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

    public static function getUserInquiryIds ($email, $timestamp)
    {
        $inquiryLogs = new InquiryLog();
        $userId = User::where('email', $email)->where('role', User::ROLE_PUBLICIST)->first()->id;
        $inquiryIds = $inquiryLogs->where('user_id', $userId)->whereDate('created_at', '=', date('Y-m-d', $timestamp))->pluck('inquiry_id');
        return $inquiryIds;
    }
}
