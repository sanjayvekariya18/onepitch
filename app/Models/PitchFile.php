<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\PitchFile
 *
 * @property int $id
 * @property int $pitch_id
 * @property string $name
 * @property string $url
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\Pitch $pitch
 * @mixin \Eloquent
 */
class PitchFile extends BaseModel
{
    protected $table = 'pitch_files';

    protected $fillable = [
        'pitch_id', 'name', 'url',
    ];

    public function pitch()
    {
        return $this->belongsTo('App\Models\Pitch');
    }
}
