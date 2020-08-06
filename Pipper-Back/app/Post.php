<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function createPost(){
        $post->title = $request->title;
        $post->originalComment = $request->originalComment;
        $post->like = $request->like;
        $post->rating = $request->rating;
        $post->date = date('Y/m/d');
        $post->tags = $request->tags;
        $post->save();
    }

    public function updatePost(Request $request, $id){
        if($request->title){
            $this->title = $request->title;
        }
        if($request->originalComment){
            $this->originalComment = $request->originalComment;
        }
        $this->save();
    }

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function comment(){
        return $this->hasMany('App\Comment');
    }

    public function setUser($user_id) {
        $this->user_id = $user_id;
        $this->save();
    }
}
