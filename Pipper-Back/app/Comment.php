<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
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
