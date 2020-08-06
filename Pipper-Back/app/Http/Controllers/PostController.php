<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function createPost(Request $request){
        $validator = Validator::make($request->all(),[
            'title' => 'required|string',
            'originalComment' => 'required|string',
            'like' => 'required|boolean',
            'rating' => 'required',
            'date' => 'required|date',
            'tags' => 'required|string',
        ]);
    
        if($validator->fails()){
            return response()->json($validator->errors());
        }
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

    public function updatePost(Request $request, $id){
        $post = Post::findOrFail($id);
        $post = updatePost($request);
        return response()->json($post);
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

    
}
