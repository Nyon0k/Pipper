<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;

class CommentController extends Controller
{
    public function createComment(Request $request){
        $comment = new Comment;
        $comment->text = $request->text;
        $comment->date = $request->date;
        $comment->save();
        return response()->json($post);
    }

    public function showComment($id){
        $comment = Comment::findOrFail($id);
        return response()->json($post);
    }

    public function listComment(){
        $comment = Comment::all();
        return response()->json($post);
    }

    public function updateComment(Request $request, $id){
        $comment = Comment::findOrFail($id);
        if($request->text){
            $this->text = $request->text;
        }
        $this->save();
        return response()->json($post);
    }

    public function deleteComment($id){
        Comment::destroy($id);
        return response()->json(['Comentário deletado!']);
    }
}
