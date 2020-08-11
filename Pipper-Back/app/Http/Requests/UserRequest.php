<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        if ($this->isMethod('post')){
            return [
                'name' => 'required|alpha|string',
                'nickname' => 'unique:Users,nickname|string',
                'email' => 'required|unique:Users,email|email',
                'password' => 'required|string',            
                'type' => 'integer|max:3',
            ];
        }
        if ($this->isMethod('put')){
            return [
                'name' => 'string',
                'nickname' => 'unique:Users,nickname|string',
                'email' => 'unique:Users,email|email',
                'password' => 'string',            
                'type' => 'boolean',
            ];
        }
    }

    public function message(){
        return [
            'name.alpha' => 'Apenas caracteres alfabeticos!',
            'nickname.unique' => 'Este nome de usuário já existe!',
            'email.email' => 'Email inválido!',
            'email.unique' => 'Este email já está cadastrado!',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(),422));
    }

}
