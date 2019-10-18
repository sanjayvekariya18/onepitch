<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SocialKeyword extends BaseModel
{
	protected $table = 'social_keywords';
	
	protected $fillable = [
		'user_id', 'keyword'
	];

}