<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Validator;
use App\Comment;
use App\Post;
use Auth; 
use App\Http\requests\UserRequest;
class UserController extends Controller
{

    public function createUser(UserRequest $request){   
        $user = new User;
        $user->createUser($request);
        return response()->json($user);
    }

    public function showUser($id){
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function listUsers(){
        $user = User::all();
        return response()->json($user);
    }

    public function updateUser(Request $request){
        $user = Auth::user();
        $user->updateUser($request);
        return response()->json($user);
    }

    public function deleteUser($id){
        User::destroy($id);
        return response()->json(['Usuário deletado!']);
    }

    //public function

    public function makePost($user_id,$post_id){
        $post = App\Post::findOrFail($post_id);
        $post->setUser($user_id);
        return response()->json($post);
    }

    public function makeComment($user_id,$comment_id){
        $comment = App\Comment::findOrFail($comment_id);
        $comment->setUser($user_id);
        return response()->json($comment);
    }

    public function followUser($userFollower, $userFollowed){
        $user1 = User::findOrFail($userFollower);
        $user2 = User::findOrFail($userFollowed);
        $user1->followUserFollower()->attach($user2);
        return response()->json("Seguindo!");
    }

    public function unfollowUser($userFollower, $userFollowed){
        $user1 = User::findOrFail($userFollower);
        $user2 = User::findOrFail($userFollowed);
        $user1->followUserFollower()->detach($user2);
        return response()->json("Deixou de seguir!");
    }

    public function listFollowerUsers($id){
        $user = User::findOrFail($id);
        return response()->json($user->followUserFollower()->get());
    }

    public function listFollowerPosts($id){
        return response()->json(Post::whereIn('user_id',User::find($id)->followUserFollower()->pluck('users.id'))->get());

    }

}