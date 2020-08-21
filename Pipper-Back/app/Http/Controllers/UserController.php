<?php

namespace App\Http\Controllers;

use DB;
use Auth;
use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;

use App\User;
use Illuminate\Support\Facades\Validator;
use App\Comment;
use App\Post;

use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
    public function createUser(UserRequest $request){   
        $user = new User;
        $user->createUser($request);
        return response()->json($user);
    }

    public function showUser($id){
        $user = User::findOrFail($id);
        //Carrega  quantidade de seguidores e seguidos na instância do servidor
        $user->loadCount('followUserFollower as followed','followUserFollowed as followers');
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
        
        $user = User::findOrFail($id);
        if($user->photo){
            
            Storage::delete($user->photo);
        }

        User::destroy($id);
        return response()->json(['Usuário deletado!']);
    }

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


    //Associa (ou desassocia, se já estiver associado) um usuário a outro como seguidor
    public function followUser($userFollowed){
        $user1 = Auth::user();
        $user2 = User::findOrFail($userFollowed);
        $verified = DB::table('follow')->where('user_follower', $user1->id)->where('user_followed', $user2->id)->count()>0;
        if($verified){
            $user1->followUserFollower()->detach($user2);
            return response()->json('Seguir!');
        }else{
            $user1->followUserFollower()->attach($user2);
            return response()->json("Seguindo!");
        }
    }


    public function listFollowerUsers($id){
        $user = User::findOrFail($id);
        return response()->json($user->followUserFollower()->get());
    }

    //Dado o id de um usuário, lista os posts dos usuários que ele segue
    public function listFollowerPosts($id){
        $followerPosts = Post::with('tags')->whereIn('user_id',User::find($id)->followUserFollower()->pluck('users.id'))->with('user')->get();
        $followerPosts->loadCount('comments as count_comments');
        return response()->json($followerPosts);
    }

    //Faz uma busca de usuários ou posts por nome de usuário, nickname de usuário ou título de post.
    public function search(Request $request){
        $nameUser = $request->name;
        $idName = $request->name;
        $nameUser = User::where('name', $request->name)->get();
        $idNameUser = User::where('name', $idName)->get()->pluck('id');

        $nicknameUser = $request->nickname;
        $idNickname = $request->nickname;
        $nicknameUser = User::where('nickname', $nicknameUser)->get();
        $idNicknameUser = User::where('nickname', $idNickname)->get()->pluck('id');

        $titlePost = $request->title;
        $titlePost = Post::where('title', $titlePost)->get();

        if(!($nameUser->isEmpty())){
            $array[] = $nameUser;
            $count = User::where('name', $request->name)->count();
            for($i=0; $i<$count; $i++){
                $postId = Post::with('user')->where('user_id', $idNameUser)->get()->pluck('id');
                $array[] = Post::findOrFail($postId);
            }
            return response()->json($array);
        }
        if(!($nicknameUser->isEmpty())){
            $array[] = $nicknameUser;
            $count = User::where('nickname', $request->nickname)->count();
            for($i=0; $i<$count; $i++){
                $postId = Post::with('user')->where('user_id', $idNicknameUser)->get()->pluck('id');
                $array[] = Post::findOrFail($postId);
            }
            return response()->json($array);
        }
        if(!($titlePost->isEmpty())){
            return response()->json($titlePost);
        }
        return response()->json('Não existe!');
    }

    //Faz uma busca de posts por suas tags
    public function searchtag(Request $request){
        // return response()->json($request);
        // foreach($c=0; $c<count($request); $c++){
        //     $tags[] = $request[$c];
        // }
        if($request){
            $postTags = Post::whereHas('tags', function($q) use ($request){
                $q->whereIn('tag_id',  $request);
            })->with('tags', 'user')->get();
            return response()->json($postTags);
        }
        return response()->json('Não existe!');
    }

    
    public function isFollowing($user_id1,$user_id2){
        $user1 = User::findOrFail($user_id1);
        $user2 = User::findOrFail($user_id2);
        if($user1->followUserFollower()->get()->contains($user2)){
            return 1;
        }else{
            return 0;
        }
    }
}
