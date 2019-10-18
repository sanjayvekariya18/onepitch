<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;

class PitchEdit extends BaseModel
{
	protected $table = 'pitch_edits';
	
	protected $fillable = [
		'user_id', 'pitch_id', 'status', 'subject', 'company', 'website', 'what_point_1',
		'what_point_2', 'what_point_3', 'what_point_4', 'what_point_5',
		'why_point_1', 'why_point_2', 'why_point_3', 'why_point_4', 'why_point_5'
	];

    public function pitch()
    {
        return $this->belongsTo('App\Models\Pitch');
    }

    /**
     * @return Collection
     */
    public function getWhat () : Collection
    {
        $collection = new Collection();

        for ($i = 1; $i <= 5; $i++) {
            $point = $this->{'what_point_'.$i};
            if ($point !== null) {
                $collection->push($point);
            }
        }

        return $collection;
    }

    /**
     * @return Collection
     */
    public function getWhy () : Collection
    {
        $collection = new Collection();

        for ($i = 1; $i <= 5; $i++) {
            $point = $this->{'why_point_'.$i};
            if ($point !== null) {
                $collection->push($point);
            }
        }

        return $collection;
    }
}