<?php

namespace App;
use App\Http\Requests\PostRequest;
use Illuminate\Database\Eloquent\Model;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;

class Post extends Model
{
    public function createPost(Request $request, $id){
        $this->title = $request->title;
        $this->original_comment = $request->original_omment;
        $this->like = $request->like;
        $this->rating = $request->rating;
        $this->tags = $request->tags;
        $this->user_id = $id;
        $this->count_people = 0;
        $this->save();
    }

    public function updatePost(Request $request){
        if($request->title){
            $this->title = $request->title;
        }
        if($request->original_comment){
            $this->original_comment = $request->original_comment;
        }
        $this->save();
    }

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function comments(){
        return $this->hasMany('App\Comment');
    }

    public function likes(){
        return $this->belongsToMany('App\Post', 'likes', 'user_liker', 'post_liked');
    }

    public function setUser($user_id) {
        $this->user_id = $user_id;
        $this->save();
    }

    public function rating($rate){
        $this->count_people = $this->count_people + 1;
        $this->rating = ($this->rating + $rate)/$count;
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
