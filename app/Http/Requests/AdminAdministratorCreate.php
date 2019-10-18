<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdminAdministratorCreate extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() : bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() : array
    {
        return [
            'full_name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ];
    }

    /**
     * @return array
     */
    public function messages() : array
    {
        return array_merge(parent::messages(), [
            'full_name.required' => 'Full name is required',
            'email.required' => 'Email is required',
            'password.required' => 'Password is required',
        ]);
    }
}
