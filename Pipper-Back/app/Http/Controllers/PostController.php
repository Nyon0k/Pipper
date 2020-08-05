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
        $post->title = $request->title;
        $post->originalComment = $request->originalComment;
        $post->like = $request->like;
        $post->rating = $request->rating;
        $post->date = date('Y/m/d');
        $post->tags = $request->tags;
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
