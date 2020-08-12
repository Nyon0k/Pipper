<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\User;
use App\Comment;
use App\Post;
use Illuminate\Support\Facades\Validator;
use Auth;

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
        $post = Post::findOrFail($id);
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

    public function listPostComments($id){
        $post = Post::findOrFail($id);
        return response()->json($post->comments()->get());
    }

    public function listPostsByLike(){
        $like = Post::with('user')->orderBy('like','desc')->get();
        return response()->json($like);
    }
    
    public function listPostsByRating(){
        $rating = Post::with('user')->orderBy('rating','desc')->get();
        return response()->json($rating);
    }

    public function listPostsByCreationDate(){
        $creationDate = Post::with('user')->orderBy('created_at','desc')->get();
        return response()->json($creationDate);
    }

    public function like($id){
        $post = Post::findOrFail($id);
        $post->like();
        return response()->json("+1 like");
    }

    public function dislike($id){
        $post = Post::findOrFail($id);
        $post->dislike();
        return response()->json("-1 like");
    }

    //fazer metodo do post integrado entre user e post (lista) (conferir)
    public function listPostUser(){
        $data = Post::with('User')->get();
        return response()->json($data);
    }

    //fazer metodo do post integrado entre user,post,comment.user (post) (conferir)
    public function PostUserComment($id){
        $data = Post::with('user', 'comments.user')->where('id', $id)->get();
        return response()->json($data);
    }
}
