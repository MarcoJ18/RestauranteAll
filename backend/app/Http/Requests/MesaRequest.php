<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MesaRequest extends FormRequest
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
            'nombre'=> ['required','string'],
            'current_mesa' => ['required','integer','unique:mesas,current_mesa'],
            'mesa' => ['integer','required','integer','unique:mesas,mesa']
        ];
    }

    public function messages(){
        return [
            'nombre' => 'El nombre es obligatorio',
            'current_mesa.required' => 'La mesa es obligatoria',
            'current_mesa.unique' => 'La mesa ya esta en uso',
            'mesa.required' => 'La mesa es obligatoria',
            'mesa.unique' => 'Se esta procesando el pedido...',
        ];
    }
}
