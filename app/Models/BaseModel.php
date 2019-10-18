<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use DB;

/**
 * App\Models\BaseModel
 *
 * @mixin \Eloquent
 */
class BaseModel extends Model
{
	public static function getOneBy($field, $value) {
		return self::where($field, $value)->first();
	}
	
	public static function getBy($field, $value) {
		return self::where($field, $value)->get();
	}
}
