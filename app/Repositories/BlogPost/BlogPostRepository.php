<?php

namespace App\Repositories\BlogPost;

use App\Models\BlogPost;
use App\Repositories\BaseRepository;

class BlogPostRepository extends BaseRepository implements BlogPostRepositoryInterface
{
    /**
     * @var string
     */
    public $model = BlogPost::class;
}