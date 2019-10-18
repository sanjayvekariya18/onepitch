<?php

namespace App\Repositories\Faq;

use DB;
use App\Models\Faq;
use App\Repositories\BaseRepository;

class FaqRepository extends BaseRepository implements FaqRepositoryInterface
{
    /**
     * @var string
     */
    public $model = Faq::class;


}