<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\InquiryFile
 *
 * @property int $id
 * @property int $inquiry_id
 * @property string $name
 * @property string $url
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\Inquiry $inquiry
 * @mixin \Eloquent
 */
class InquiryFile extends BaseModel
{
    protected $table = 'inquiry_files';

    protected $fillable = [
        'inquiry_id', 'name', 'url',
    ];

    public function inquiry()
    {
        return $this->belongsTo('App\Models\Inquiry');
    }
}
