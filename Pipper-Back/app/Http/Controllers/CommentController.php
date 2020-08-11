<?php

namespace App\Http\Controllers;

use App\Http\requests\CommentRequest;
use App\Comment;
use Illuminate\Support\Facades\Validator;


class CommentController extends Controller
{
    public function createComment(CommentRequest $request){
        $comment = new Comment;
        $comment->createComment($request);
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

    public function updateComment(CommentRequest $request, $id){
        $comment = Comment::findOrFail($id);
        $comment->updateComment($request);
        return response()->json($comment);
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
