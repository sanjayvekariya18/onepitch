<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;

class FaqCategory extends BaseModel
{
    use SoftDeletes;

    /**
     * Table Entity name
     *
     * @var string
     */
    protected $table = 'faq_categories';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'slug'
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = ['deleted_at'];

    /**
     * Get the faqs for the faq category
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
	public function faqs() {
		return $this->hasMany('App\Models\Faq', 'faq_category_id');
	}
}