<?php

namespace App\Repositories\Alert;

use App\Models\Alert;
use App\Repositories\BaseRepository;

class AlertRepository extends BaseRepository implements AlertRepositoryInterface
{
    /**
     * @var string
     */
    public $model = Alert::class;
}