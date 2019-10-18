<?php

namespace App\Transformers\BlogPostImages;

use App\Models\BlogPost;
use App\Models\BlogPostImage;
use Carbon\Carbon;
use LukeVear\LaravelTransformer\AbstractTransformer;

class BlogPostImageTransformer extends AbstractTransformer
{
    /**
     * @param BlogPostImage $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'blog_post_id' => $model->blog_post_id,
            'image' => $model->image,
        ];
    }

    /**
     * @return array
     */
    public function getEasyLoad () : array
    {
        return ['user'];
    }
}