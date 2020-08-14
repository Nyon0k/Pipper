<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\http\Requests\CommentRequest;
use App\User;
use App\Comment;
use App\Post;
use Illuminate\Support\Facades\Validator;
use Auth;

class CommentController extends Controller
{
    public function createComment(CommentRequest $request, $post_id){
        $user = Auth::user();
        $user_id = $user->id;
        $comment = new Comment;
        $comment->createComment($request, $user_id, $post_id);
        return response()->json($comment);
    }

    public function showComment($id){
        $comment = Comment::findOrFail($id);
        return response()->json($post);
    }

    public function listComment(){
        $comment = Comment::all();
        return response()->json($comment);
    }

    public function updateComment(Request $request, $id){
        $user = Auth::user();
        $comment = Post::findOrFail($id);
        if($user->id == $comment->user_id){
            $comment->updatePost($request);
            return response()->json($comment);
        }
        return response()->json('Este comentário não pode ser auterado por este usuário');
    }

    public function deleteComment($id){
        Comment::destroy($id);
        return response()->json(['Comentário deletado!']);
    }

    public function getUserId($id){
        $comment = App\Comment::findOrfail($id);
        return response()->json($comment->user_id);
    }

    public function getPostId($id){
        $comment = App\Comment::findOrFail($id);
        return response()->json($comment->post_id);
    }
    
}
