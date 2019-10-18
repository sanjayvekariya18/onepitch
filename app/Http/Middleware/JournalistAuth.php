<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Session;
use App\Models\User;

class JournalistAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
		$user = Auth::user();

		if (!$user && Session::get('journalist_id')) {
			$user_id = Session::get('journalist_id');
			$user = User::find($user_id);
		}

        if (!$user || $user->role != User::ROLE_JOURNALIST) {
            return redirect()->guest('login');
        }

//		if (!$user || $user->role != User::ROLE_JOURNALIST) {
//			return redirect('/');
//		}

        return $next($request);
    }
}
