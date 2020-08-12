<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\http\Request\PostRequest;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;

class Post extends Model
{
    public function createPost(Request $request, $id){
        $this->title = $request->title;
        $this->originalComment = $request->originalComment;
        $this->like = $request->like;
        $this->rating = $request->rating;
        $this->tags = $request->tags;
        $this->user_id = $id;
        $this->save();
    }

    public function updatePost(Request $request){
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

    public function comments(){
        return $this->hasMany('App\Comment');
    }

    public function setUser($user_id) {
        $this->user_id = $user_id;
        $this->save();
    }

    public function like(){
        $this->like++;
        $this->save();
    }
    public function dislike(){
        $this->like--;
        $this->save();
    }
}
