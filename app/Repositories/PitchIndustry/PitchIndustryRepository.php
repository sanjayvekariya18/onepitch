<?php

namespace App\Repositories\PitchIndustry;

use App\Models\PitchIndustry;
use App\Repositories\BaseRepository;

class PitchIndustryRepository extends BaseRepository implements PitchIndustryRepositoryInterface
{
    /**
     * @var string
     */
    public $model = PitchIndustry::class;
}