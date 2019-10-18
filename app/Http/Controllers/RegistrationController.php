<?php

namespace App\Http\Controllers;

use App;
use Exception;
use Illuminate\Http\Request;
use Session;

class RegistrationController extends Controller
{
    public function __construct(Request $request)
    {
        if(App::environment() === 'production'){
            abort(404);
        }
    }

    public function signupConfirmation(Request $request)
    {
        return view('registration.signup-confirmation');
    }

}