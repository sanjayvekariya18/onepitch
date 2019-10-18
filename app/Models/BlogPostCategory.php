<?php

namespace App\Models;

/**
 * App\Models\BlogPostCategory
 *
 * @property int $id
 * @property int $blog_post_id
 * @property int $blog_post_category_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Models\BlogPost $post
 * @property-read \App\Models\BlogPostCategory $category
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogPostCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogPostCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogPostCategory wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogPostCategory whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogPostCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class BlogPostCategory extends BaseModel
{
    protected $table = 'blog_post_categories';

    protected $fillable = [
        'blog_post_id', 'blog_post_category_id',
    ];

    public function post()
    {
        return $this->belongsTo('App\Models\BlogPost');
    }

    public function category()
    {
        return $this->belongsTo('App\Models\BlogCategory', 'blog_post_category_id');
    }
}
