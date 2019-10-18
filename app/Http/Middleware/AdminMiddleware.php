<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (Auth::check() && in_array(Auth::user()->role, [User::SUPER_ADMIN, User::ADMIN], true)) {
            return $next($request);
        }

        return redirect(url('admin'));
    }
}
