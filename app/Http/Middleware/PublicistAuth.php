<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Session;
use App\Models\User;
use Route;

class PublicistAuth
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

        if (strpos(Route::current()->getName(), 'pitch-2') !== false) {
            Session::put('pom_redirect', Route::current()->getName());
        }

		if (!$user && Session::get('publicist_id')) {
			$user_id = Session::get('publicist_id');
			$user = User::find($user_id);
		}

        if (!$user || $user->role != User::ROLE_PUBLICIST) {
            return redirect()->guest('login');
        }

        return $next($request);
    }
}
