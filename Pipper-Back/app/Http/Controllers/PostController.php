<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\User;
use App\Comment;
use App\Post;
use Illuminate\Support\Facades\Validator;
use Auth;
use Illuminate\Support\Facades\Storage;
use DB;

class PostController extends Controller
{
    public function createPost(PostRequest $request){
        $user = Auth::user();
        $id = $user->id;
        $post = new Post;
        $post->createPost($request, $id);
        return response()->json($post);
    }

    public function showPost($id){
        $post = Post::with('user','comments')->where('id', $id)->first();
        $post->loadCount('comments as count_comments');
        return response()->json($post);
    }

    public function listPosts(){
        $post = Post::all();
        return response()->json($post);
    }

    public function updatePost(Request $request, $id){
        $user = Auth::user();
        $post = Post::findOrFail($id);
        if($user->id == $post->user_id){
            $post->updatePost($request);
            return response()->json($post);
        }
        return response()->json('Este post não pode ser auterado por este usuário');
    }

    public function deletePost($id){
        $post = Post::findOrFail($id);
        if($post->photo){
            Storage::delete($post->photo);
        }
        Post::destroy($id);
        return response()->json(['Post deletado!']);
    }

    public function getUserId($id){
        $post = App\Post::findOrFail($id);
        return $post->user_id;
    }

    public function attachComment($post_id,$comment_id){
        $comment = App\Comment::findOrFail($comment_id);
        $comment->setPost($post_id);
        return response()->json($comment);
    }

    public function listPostsByLike(){
        $like = Post::with('user')->orderBy('like','desc')->get();
        $like->loadCount('comments as count_comments');
        return response()->json($like);
    }
    
    public function listPostsByRating(){
        $rating = Post::with('user')->orderBy('rating','desc')->get();
        $rating->loadCount('comments as count_comments');
        return response()->json($rating);
    }

    public function listPostsByCreationDate(){
        $creationDate = Post::with('user')->orderBy('created_at','desc')->get();
        $creationDate->loadCount('comments as count_comments');
        return response()->json($creationDate);
    }

    public function rating(Request $request, $post_id){
        $user = Auth::user();
        $post = Post::findOrFail($post_id);
        $post->rating($request);
        return response()->json('Avaliado com sucesso');
    }

    public function like($post_liked){
        $user = Auth::user();
        $post = Post::findOrFail($post_liked);
        $verified = DB::table('likes')->where('user_liker', $user->id)->where('post_liked', $post->id)->count()>0;
        if($verified){
            $user->likes()->detach($post);
            $post->dislike();
            return response()->json('Descurtiu!');
        }else{
            $user->likes()->attach($post);
            $post->like();
            return response()->json("Curtiu!");
        }
    }

    //fazer metodo do post integrado entre user e post (lista) (conferir)
    public function listPostUser(){
        $data = Post::with('User')->get();
        return response()->json($data);
    }

    //fazer metodo do post integrado entre user,post,comment.user (post) (conferir)
    public function showPostUserComment($id){
        $data = Comment::with('user')->where('post_id', $id)->get();
        return response()->json($data);
    }   
    
    public function postUserComment($id){
        $data = Post::with('user', 'comments.user')->where('id', $id)->get();
        return response()->json($data);
    }

    public function listPostsByAUser($id){
        $userPosts = Post::with('user','comments')->where('user_id', $id)->get();
        return response()->json($userPosts);    
    }
}
