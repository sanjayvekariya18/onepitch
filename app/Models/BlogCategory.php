<?php

namespace App\Models;

/**
 * App\Models\BlogCategory
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\BlogPostCategory[] $post_categories
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogCategory whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogCategory whereFullTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogCategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogCategory whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogCategory whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class BlogCategory extends BaseModel
{
    protected $table = 'blog_categories';

    protected $fillable = [
        'name', 'description',
    ];

    public function post_categories() {
        return $this->hasMany('App\Models\BlogPostCategory');
    }
}
