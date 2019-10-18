<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Http\Controllers\Controller;

class JournalistController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index ()
    {
        $header = ['title' => 'Journalists'];

        $publicists = User::where('role', User::ROLE_JOURNALIST)->get();

        return view('admin.journalists.list', ['header' => $header, 'publicists' => $publicists]);
    }

    /**
     * @param User $user
     * @return User
     */
    public function show (User $user)
    {
        return $user;
    }
}
