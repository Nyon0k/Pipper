<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;

class PostController extends Controller
{
    public function createPost(Request $request){
        $post = new Post;
        $post->title = $request->title;
        $post->originalComment = $request->nickname;
        $post->like = $request->like;
        $post->rating = $request->rating;
        $post->date = $request->date;
        $post->save();
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
        if($request->title){
            $this->title = $request->title;
        }
        if($request->originalComment){
            $this->originalComment = $request->originalComment;
        }
        $this->save();
        return response()->json($post);
    }

    public function deletePost($id){
        Post::destroy($id);
        return response()->json(['Post deletado!']);
    }

    public function ratePost($id){}
}
