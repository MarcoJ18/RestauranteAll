<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password as PasswordRule;
use Illuminate\Foundation\Http\FormRequest;



class RegistroRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name'=> ['required','string'],
            'email' => ['required','email','unique:users,email'],
            'password' => [
                'required',
                'confirmed',
                PasswordRule::min(8)->letters()->symbols()->numbers()
            ]
        ];
    }

    public function messages(){
        return [
            'name' => 'El nombre es obligatorio',
            'email.required' => 'El correo electrónico es obligatorio',
            'email.email' => 'El correo no valido',
            'email.unique' => 'El correo ya existe',
            'password' => 'La contraseña debe contener al menos 8 caracteres, un simbolo y un número'
        ];
    }
}

