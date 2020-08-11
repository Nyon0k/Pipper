<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class PostRequest extends FormRequest
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
        if($this->isMethod('post')){
            return [
                'title' => 'required|alpha|string',
                'originalComment' => 'required|string',
                'like' => 'number',
                'rating' => 'number',
                'tags' => 'string',
            ];
        }
        if($this->isMethod('put')){
            return [
                'title' => 'string',
                'originalComment' => 'string',
                'like' => 'boolean',
                'rating' => 'float',
                'date' => 'date',
                'tags' => 'string',
            ];
        }
    }

    public function message(){
        return [
            'title.alpha' => 'Apenas caracteres alfabeticos!',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json($validator->errors(),422));
    }

}
