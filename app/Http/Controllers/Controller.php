<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Validator;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	private $validation_errors;

	protected function validateInput($data, $rules, $messages = [])
	{
		// make a new validator object
		$v = Validator::make($data, $rules, $messages);

		// check for failure
		if ($v->fails())
		{
			// set errors and return false
			$this->validation_errors = $v->errors()->all();
			return false;
		}

		// validation pass
		return true;
	}

	protected function validationErrors()
	{
		return $this->validation_errors;
	}
}
