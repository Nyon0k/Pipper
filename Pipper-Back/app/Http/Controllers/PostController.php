<?php

namespace App\Http\Controllers;

use Illuminate\Http\PostRequest;
use App\Post;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function createPost(PostRequest $request){
        $post = new Post;
        $post = createPost($request);
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

    public function updatePost(PostRequest $request, $id){
        $post = Post::findOrFail($id);
        $post = updatePost($request);
        return response()->json($post);
    }

    public function deletePost($id){
        Post::destroy($id);
        return response()->json(['Post deletado!']);
    }

    public function getUserId($id){    //Descrever qual o sentido deste método, não estou enxergando. Mas tb to com maior sono hahah
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
        return response()->json(Post::orderBy('like','desc')->get());
    }
    
    public function listPostsByRating(){
        return response()->json(Post::orderBy('rating','desc')->get());
    }

    public function listPostsByCreationDate(){
        return response()->json(Post::orderBy('created_at','desc')->get());
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
}
