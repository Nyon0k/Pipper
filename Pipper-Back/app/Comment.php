<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function createComment(Request $request){
        $comment->text = $request->text;
        $comment->date = date('Y/m/d');
        $comment->save();
    }

    public function updateComment(Request $request, $id){
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
