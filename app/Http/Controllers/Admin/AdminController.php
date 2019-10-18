<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index ()
    {
        if (Auth::check() && in_array(Auth::user()->role, [User::ADMIN, User::SUPER_ADMIN], true)) {
            return view('admin.layouts.layout');
        }

        return $this->getLogin();
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getLogin ()
    {
        return view('admin.auth.login');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector|\Illuminate\View\View
     */
    public function postLogin (Request $request)
    {
        $errors = [];
        if ($request->isMethod('post')) {
            $data = $request->input();

            $rules = array(
                'email' => 'required|exists:users,email',
                'password' => 'required',
            );

            if ($this->validateInput($data, $rules)) {
                try {
                    $user = User::checkAdminLogin($data['email'], $data['password']);
                    if (is_object($user) && $user instanceof User) {
                        Auth::login($user);
                        return redirect('/admin');
                    } else {
                        throw new \Exception('Error!');
                    }
                } catch (\Exception $exception) {
                    $errors[] = $exception->getMessage();
                }

            } else {
                $errors = $this->validationErrors();
            }
        }

        return view('admin.auth.login', array(
            'errors' => $errors,
        ));
    }
}
