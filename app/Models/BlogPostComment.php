<?php

namespace App\Models;

/**
 * App\Models\BlogPostComment
 *
 * @property int $id
 * @property int $user_id
 * @property int $post_id
 * @property string|null $content
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @mixin \Eloquent
 * @property int $is_approved
 * @property-read \App\Models\User $user
 * @property-read \App\Models\BlogPost $post
 */
class BlogPostComment extends BaseModel
{
    protected $table = 'blog_post_comments';

    protected $fillable = [
        'user_id', 'blog_post_id', 'content', 'is_approved'
    ];

    const STATUS_DECLINED = 0;
    const STATUS_APPROVED = 1;

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user () : BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo('App\Models\BlogPost');
    }
}
