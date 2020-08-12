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
Route::GET('listFollowerUsers/{id}', 'UserController@listFollowerUsers');
Route::GET('listFollowerPosts/{id}', 'UserController@listFollowerPosts');
Route::PUT('updateUser/{id}', 'UserController@updateUser');
Route::DELETE('deleteUser/{id}', 'UserController@deleteUser');
Route::POST('makePost/{user_id}/{post_id}', 'UserController@makePost');
Route::POST('makeComment/{user_id}/{post_id}', 'UserController@makeComment');
Route::PUT('followUser/{user_id1}/{user_id2}', 'UserController@followUser');
Route::PUT('unfollowUser/{user_id1}/{user_id2}', 'UserController@unfollowUser');
//Route::PUT('updateUser/{id}', 'UserController@updateUser');
//Route::DELETE('deleteUser/{id}', 'UserController@deleteUser');
//Route::POST('makePost/{user_id}/{post_id}', 'UserController@makePost');
//Route::POST('makeComment/{user_id}/{post_id}', 'UserController@makeComment');
//Route::PUT('followUser/{user_id1}/{user_id2}', 'UserController@followUser');
//Route::PUT('unfollowUser/{user_id1}/{user_id2}', 'UserController@unfollowUser');

//Rotas de Post
//Route::POST('createPost', 'PostController@createPost');
Route::GET('showPost/{id}', 'PostController@showPost');
Route::GET('listPosts', 'PostController@listPosts');
Route::GET('listPostsByLike', 'PostController@listPostsByLike');
Route::GET('listPostsByRating', 'PostController@listPostsByRating');
Route::GET('listPostsByCreationDate', 'PostController@listPostsByCreationDate');
Route::PUT('updatePost/{id}', 'PostController@updatePost');
Route::PUT('like/{id}', 'PostController@like');
Route::PUT('dislike/{id}', 'PostController@dislike');
Route::DELETE('deletePost/{id}', 'PostController@deletePost');
//Route::GET('getUserId/{id}', 'PostController@getUserId');
//Route::PUT('updatePost/{id}', 'PostController@updatePost');
//Route::DELETE('deletePost/{id}', 'PostController@deletePost');
Route::GET('getUserId/{id}', 'PostController@getUserId');
Route::PUT('attachComment/{post_id}/{comment_id}', 'PostController@attachComment');

//Rotas de Comment
//Route::POST('createComment', 'CommentController@createComment');
Route::GET('showComment/{id}', 'CommentController@showComment');
Route::GET('listComments', 'CommentController@listComment');
//Route::PUT('updateComment/{id}', 'CommentController@updateComment');
//Route::DELETE('deleteComment/{id}', 'CommentController@deleteComment');
Route::GET('getUserId/{id}', 'CommentController@getUserId');
Route::GET('getPostId/{id}', 'CommentController@getPostId');

//Rotas de Passport
Route::POST('register', 'API\PassportController@register');
Route::POST('login', 'API\PassportController@login');
Route::group(['middleware'=>'auth:api'], function(){
    //Rotas de User autenticado
    Route::PUT('updateUser/{id}', 'UserController@updateUser');
    Route::DELETE('deleteUser/{id}', 'UserController@deleteUser')->middleware('user');
    Route::POST('makePost/{user_id}/{post_id}', 'UserController@makePost');
    Route::POST('makeComment/{user_id}/{post_id}', 'UserController@makeComment');
    Route::PUT('followUser/{user_id1}/{user_id2}', 'UserController@followUser')->middleware('user');
    Route::PUT('unfollowUser/{user_id1}/{user_id2}', 'UserController@unfollowUser')->middleware('user');
    //Rotas de Post autenticado
    Route::POST('createPost', 'PostController@createPost');
    Route::PUT('updatePost/{id}', 'PostController@updatePost')->middleware('user');
    Route::DELETE('deletePost/{id}', 'PostController@deletePost')->middleware('user');
    //Rotas de Comment autenticado
    Route::POST('createComment', 'CommentController@createComment');
    Route::PUT('updateComment/{id}', 'CommentController@updateComment')->middleware('user');
    Route::DELETE('deleteComment/{id}', 'CommentController@deleteComment')->middleware('user');

    Route::GET('logout', 'API\PassportController@logout');
    Route::POST('getDetails', 'API\PassportController@getDetails');
});