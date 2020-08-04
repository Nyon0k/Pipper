<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

//Rotas de User
Route::POST('createUser', 'UserController@createUser');
Route::GET('showUser/{id}', 'UserController@showUser');
Route::POST('listUsers', 'UserController@listUsers');
Route::POST('updateUser/{id}', 'UserController@updateUser');
Route::POST('deleteUser/{id}', 'UserController@deleteUser');

//Rotas de Post
Route::POST('createPost', 'PostController@createPost');
Route::GET('showPost/{id}', 'PostController@showPost');
Route::POST('listPosts', 'PostController@listPost');
Route::POST('updatePost/{id}', 'PostController@updatePost');
Route::POST('deletePost/{id}', 'PostController@deletePost');

//Rotas de Comment
Route::POST('createComment', 'CommentController@createComment');
Route::GET('showComment/{id}', 'CommentController@showComment');
Route::POST('listComments', 'CommentController@listComment');
Route::POST('updateComment/{id}', 'CommentController@updateComment');
Route::POST('deleteComment/{id}', 'CommentController@deleteComment');