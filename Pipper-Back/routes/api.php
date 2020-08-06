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
Route::GET('listUsers', 'UserController@listUsers');
Route::PUT('updateUser/{id}', 'UserController@updateUser');
Route::DELETE('deleteUser/{id}', 'UserController@deleteUser');
Route::POST('makePost/{user_id}/{post_id}', 'UserController@makePost');
Route::POST('makeComment/{user_id}/{post_id}', 'UserController@makeComment');

//Rotas de Post
Route::POST('createPost', 'PostController@createPost');
Route::GET('showPost/{id}', 'PostController@showPost');
Route::GET('listPosts', 'PostController@listPost');
Route::PUT('updatePost/{id}', 'PostController@updatePost');
Route::DELETE('deletePost/{id}', 'PostController@deletePost');
//Route::GET('getUserId/{id}', 'PostController@getUserId');
Route::PUT('attachComment/{post_id}/{comment_id}', 'PostController@attachComment');

//Rotas de Comment
Route::POST('createComment', 'CommentController@createComment');
Route::GET('showComment/{id}', 'CommentController@showComment');
Route::GET('listComments', 'CommentController@listComment');
Route::PUT('updateComment/{id}', 'CommentController@updateComment');
Route::DELETE('deleteComment/{id}', 'CommentController@deleteComment');
//Route::GET('getUserId/{id}', 'CommentController@getUserId');
Route::GET('getPostId/{id}', 'CommentController@getPostId');