<?php

namespace App\Repositories\BlogCategory;

use App\Models\BlogCategory;
use App\Repositories\BaseRepository;

class BlogCategoryRepository extends BaseRepository implements BlogCategoryRepositoryInterface
{
    /**
     * @var string
     */
    public $model = BlogCategory::class;
}