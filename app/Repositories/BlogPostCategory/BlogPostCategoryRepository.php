<?php

namespace App\Repositories\BlogPostCategory;

use App\Models\BlogPostCategory;
use App\Repositories\BaseRepository;

class BlogPostCategoryRepository extends BaseRepository implements BlogPostCategoryRepositoryInterface
{
    /**
     * @var string
     */
    public $model = BlogPostCategory::class;
}