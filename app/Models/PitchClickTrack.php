<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\PitchClickTrack
 *
 * @property int $id
 * @property int $pitch_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\Pitch $pitch
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PitchClickTrack whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PitchClickTrack whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PitchClickTrack wherePitchId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\PitchClickTrack whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class PitchClickTrack extends BaseModel
{
	protected $table = 'pitch_click_tracks';
	
	public function pitch() {
		return $this->belongsTo('App\Models\Pitch');
	}

	public static function track($pitch_id) {
		$track = new PitchClickTrack();
		$track->pitch_id = $pitch_id;
		$track->save();
	}
}