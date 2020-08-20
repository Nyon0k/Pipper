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
Route::PUT('search', 'UserController@search');
Route::GET('isFollowing/{user_id1}/{user_id2}', 'UserController@isFollowing');


//Rotas de Post
Route::GET('showPost/{id}', 'PostController@showPost');
Route::GET('listPosts', 'PostController@listPosts');
Route::GET('listPostsByLike', 'PostController@listPostsByLike');
Route::GET('listPostsByRating', 'PostController@listPostsByRating');
Route::GET('listPostsByCreationDate', 'PostController@listPostsByCreationDate');
Route::GET('listPostUser', 'PostController@listPostUser');
Route::GET('postUserComment/{id}', 'PostController@postUserComment');
Route::GET('listPostsByAUser/{id}', 'PostController@listPostsByAUser');
Route::GET('showPostUserComment/{id}', 'PostController@showPostUserComment');
//Rotas de Comment
Route::GET('showComment/{id}', 'CommentController@showComment');
Route::GET('listComments', 'CommentController@listComment');
Route::GET('getUserId/{id}', 'CommentController@getUserId');
Route::GET('getPostId/{id}', 'CommentController@getPostId');

//Rotas de Passport
Route::POST('register', 'API\PassportController@register');
Route::POST('login', 'API\PassportController@login');


Route::GET('isFollowing/{user_id1}/{user_id2}', 'UserController@isFollowing');

Route::group(['middleware'=>'auth:api'], function(){
    //Rotas de User autenticado
    Route::PUT('updateUser', 'UserController@updateUser');   
    Route::DELETE('deleteUser/{id}', 'UserController@deleteUser');
    Route::POST('makePost/{user_id}/{post_id}', 'UserController@makePost');
    Route::POST('makeComment/{user_id}/{post_id}', 'UserController@makeComment');
    Route::PUT('followUser/{id}', 'UserController@followUser');
    //Route::PUT('unfollowUser/{user_id1}/{user_id2}', 'UserController@unfollowUser');
    //Rotas de Post autenticado
    Route::POST('createPost', 'PostController@createPost');
    Route::PUT('updatePost/{id}', 'PostController@updatePost');
    Route::DELETE('deletePost/{id}', 'PostController@deletePost')->middleware('user');
    Route::PUT('like/{id}', 'PostController@like');
    //Route::PUT('dislike/{id}', 'PostController@dislike');
    Route::PUT('attachComment/{post_id}/{comment_id}', 'PostController@attachComment');
    //Rotas de Comment autenticado
    Route::POST('createComment/{post_id}', 'CommentController@createComment');
    Route::PUT('updateComment/{id}', 'CommentController@updateComment');
    Route::DELETE('deleteComment/{id}', 'CommentController@deleteComment')->middleware('user');
    Route::GET('logout', 'API\PassportController@logout');
    
    Route::PUT('rating/{post_id}/{rate}','PostController@rating');
    //Rotas de Tag
    Route::put('tag/{tag_id}/{post_id}','TagController@tag'); 
    Route::GET('getDetails', 'API\PassportController@getDetails');
});