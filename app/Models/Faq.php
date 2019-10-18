<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class Faq extends BaseModel
{
    use SoftDeletes;

    /**
     * Name of the table entity
     *
     * @var string
     */
    protected $table = 'faqs';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'faq_category_id', 'question', 'answer', 'order'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * Get the category that owns the faq
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
	public function category() {
		return $this->belongsTo('App\Models\FaqCategory', 'faq_category_id');
	}


}