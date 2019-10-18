<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PublicistController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index ()
    {
        $header = ['title' => 'Publicists'];

        $publicists = User::where('role', User::ROLE_PUBLICIST)->get();

        return view('admin.publicists.list', ['header' => $header, 'publicists' => $publicists]);
    }

    /**
     * @param User $user
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function show (User $user)
    {
        return view('admin.publicists.show', ['user' => $user]);
    }
}
