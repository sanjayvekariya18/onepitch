<?php

namespace App\Models;

/**
 * App\Models\BlogPost
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $title
 * @property string|null $excerpt
 * @property string|null $content
 * @property string|null $link
 * @property string|null $featured_image
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\BlogCategory[] $categories
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\BlogPostImage[] $images
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\BlogPostCategory[] $blog_post_categories
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogPost whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogPost whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogPost whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogPost whereUserId($value)
 * @mixin \Eloquent
 * @property int $status
 * @property int $comment_status
 * @property string|null $published_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogPost wherePublishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogPost whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Models\BlogPost whereCommentStatus($value)
 */
class BlogPost extends BaseModel
{
    const STATUS_DRAFT = 0;
    const STATUS_UPCOMING = 1;
    const STATUS_PUBLISHED = 2;
    const STATUS_SCHEDULED = 3;

    protected $table = 'blog_posts';

    protected $fillable = [
        'user_id',
        'status',
        'title',
        'excerpt',
        'content',
        'link',
        'featured_image',
        'comment_status',
        'published_at'
    ];

    protected $dates = ['published_at'];

    public function categories()
    {
        return $this->belongsToMany('App\Models\BlogCategory', 'blog_post_categories', 'blog_post_id',
            'blog_post_category_id');
    }

    public function images()
    {
        return $this->hasMany('App\Models\BlogPostImage', 'blog_post_id', 'id');
    }

    /**
     * User that owns the post.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function blog_post_categories()
    {
        return $this->hasMany('App\Models\BlogPostCategory');
    }

    public function listCategories()
    {
        $temp = [];
        $temp['categories'] = $this->categories();
        return $temp;
    }

    /**
     * @return array
     */
    public static function getStatuses(): array
    {
        return [
            self::STATUS_DRAFT,
            self::STATUS_UPCOMING,
            self::STATUS_PUBLISHED,
            self::STATUS_SCHEDULED,
        ];
    }

    public static function getStatusesToEdit(): array
    {
        return [
            self::STATUS_DRAFT,
        ];
    }

    public function getStatusClass()
    {
        $arr = [
            self::STATUS_DRAFT => 'draft',
            self::STATUS_UPCOMING => 'live-soon',
            self::STATUS_PUBLISHED => 'approved',
            self::STATUS_SCHEDULED => 'live-soon',
        ];

        return $arr[$this->status];
    }

    /**
     * @return array
     */
    public function getStatusTypes(): array
    {
        return [
            'draft' => $this->status === self::STATUS_DRAFT,
            'upcoming' => $this->status === self::STATUS_UPCOMING,
            'published' => $this->status === self::STATUS_PUBLISHED,
            'scheduled' => $this->status === self::STATUS_SCHEDULED
        ];
    }

    /**
     * @param string $format
     * @return false|string
     */
    public function publishedAtFormat($format = 'l, F j, Y')
    {
        if ($this->published_at) {
            return date($format, strtotime($this->published_at));
        }

        if (date('G') < 8) {
            $to = 8; //8am
        } else {
            $to = 32; //24h + 8am
        }
        $diff = $to - date('G');
        $time = time() + $diff * 60 * 60;

        return date($format, $time);
    }
}
