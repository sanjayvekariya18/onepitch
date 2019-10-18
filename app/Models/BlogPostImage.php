<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\BlogPostImage
 *
 * @property int $id
 * @property int $blog_post_id
 * @property int $image
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\BlogPost $blogPost
 * @mixin \Eloquent
 */
class BlogPostImage extends BaseModel
{
    protected $table = 'blog_post_images';

    protected $fillable = [
        'blog_post_id', 'image',
    ];

    public function blogPost()
    {
        return $this->belongsTo('App\Models\BlogPost');
    }
}
