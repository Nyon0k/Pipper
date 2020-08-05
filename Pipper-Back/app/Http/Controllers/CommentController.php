<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use Illuminate\Support\Facades\Validator;


class CommentController extends Controller
{
    public function createComment(Request $request){
        $validator = Validator::make($request->all(),[
        'text' => 'required|string',
        'date' => 'date',
    ]);

        if($validator->fails()){
        return response()->json($validator->errors());
        }
        
        $comment = new Comment;
        $comment->text = $request->text;
        $comment->date = date('Y/m/d');
        $comment->save();
        return response()->json($comment);
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
