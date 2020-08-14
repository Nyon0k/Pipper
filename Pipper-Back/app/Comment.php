<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\http\Request\CommentRequest;
use App\Http\Controllers\CommentController;
use App\Comment;
use Illuminate\Http\Request;

class Comment extends Model
{
    public function createComment(Request $request, $user_id, $post_id){
        $this->text = $request->text;
        $this->user_id = $user_id;
        $this->post_id = $post_id;
        $this->save();
    }

    public function updateComment(Request $request){
        if($request->text){
            $this->text = $request->text;
        }
        $this->save();
    }

    public function user(){
        return $this->belongsTo('App\User');
    }
    public function post(){
        return $this->belongsTo('App\Post');
    }

    public function setUser($user_id){
        $this->user_id = $user_id;
        $this->save();
    }
    
    public function setPost($post_id){
        $this->post_id = $post_id;
        $this->save();
    }
}
