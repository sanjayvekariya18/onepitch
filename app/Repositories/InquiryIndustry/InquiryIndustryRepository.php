<?php

namespace App\Repositories\InquiryIndustry;

use App\Models\InquiryIndustry;
use App\Repositories\BaseRepository;

class InquiryIndustryRepository extends BaseRepository implements InquiryIndustryRepositoryInterface
{
    /**
     * @var string
     */
    public $model = InquiryIndustry::class;
}