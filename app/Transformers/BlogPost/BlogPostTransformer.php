<?php

namespace App\Transformers\BlogPost;

use App\Models\BlogPost;
use App\Transformers\BlogCategory\BlogCategoryTransformer;
use App\Transformers\BlogPostCategory\BlogPostCategoryTransformer;
use App\Transformers\BlogPostImages\BlogPostImageTransformer;
use App\Transformers\Users\UserTransformer;
use Carbon\Carbon;
use LukeVear\LaravelTransformer\AbstractTransformer;

class BlogPostTransformer extends AbstractTransformer
{
    /**
     * @param BlogPost $model
     * @return array
     */
    public function run($model) : array
    {
        return [
            'id' => $model->id,
            'title' => $model->title,
            'link' => $model->link,
            'featured_image' => $model->featured_image,
            'excerpt' => $model->excerpt,
            'content' => $model->content,
            'author' => !empty($model->user) ? transform($model->user, new UserTransformer()) : null,
            'status' => $model->status,
            'tags' => !empty($model->categories) ? transform($model->categories, new BlogCategoryTransformer()) : null,
            'images' => !empty($model->images) ? transform($model->images, new BlogPostImageTransformer()) : null,
            'comment_status' => $model->comment_status,
            'created_at' => Carbon::parse($model->created_at)->format('Y-m-d H:i:s'),
            'published_at' => !empty($model->published_at) ? Carbon::parse($model->published_at)->format('Y-m-d H:i:s') : null,
            'createdFromNow' => Carbon::parse($model->created_at)->diffForHumans(),
            'publishedFromNow' => Carbon::parse($model->published_at)->diffForHumans(),
        ];
    }

    /**
     * @return array
     */
    public function getEasyLoad () : array
    {
        return ['industries', 'pitch_industries.topics', 'user'];
    }
}