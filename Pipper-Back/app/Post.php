<?php

namespace App;
use App\Http\Requests\PostRequest;
use Illuminate\Database\Eloquent\Model;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Auth;

class Post extends Model
{
    public function createPost(Request $request, $id){
        $this->title = $request->title;
        $this->text = $request->text;
        $this->like = $request->like;
        $this->creator_rating = $request->creator_rating;
        $this->tags = $request->tags;
        $this->user_id = $id;
        $this->photo = $request->photo;
        $this->creator_rating = $request->creator_rating;
        $this->general_rating = $request->creator_rating;
        $this->count_people = 1;
        $this->save();
    }

    public function updatePost(Request $request){
        if($request->title){
            $this->title = $request->title;
        }
        if($request->text){
            $this->text = $request->text;
        }
        if($request->photo){
            $this->photo = $request->photo;
        }
        $this->save();
    }

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function comments(){
        return $this->hasMany('App\Comment');
    }

    public function tags(){
        return $this->belongsToMany('App\Tag');
    }
    
    public function likes(){
        return $this->belongsToMany('App\Post', 'likes', 'user_liker', 'post_liked');
    }
    
    public function raterUsers(){
        return $this->belongsToMany('App\User','user_rates_post','post_id','user_id')->withPivot(['individual_rating']);
    }

    public function setUser($user_id) {
        $this->user_id = $user_id;
        $this->save();
    }

    //Adiciona uma nova nota de um usuário a um post
    public function rating($user_id, $rate){
        $user = User::findOrFail($user_id);
        if($this->raterUsers()->get()->contains($user)){
            $previousRating = $this->raterUsers()->where('user_id',$user->id)->first()->pivot->individual_rating;
            //linha para alterar o rating na pivot
            $this->raterUsers()->updateExistingPivot($user, array('individual_rating' => $rate), true);
            $this->general_rating = $this->general_rating*$this->count_people;
            $this->general_rating = $this->general_rating-$previousRating;
            $this->general_rating = $this->general_rating+$rate;
            $this->general_rating = $this->general_rating/$this->count_people;
        }else{
            $this->raterUsers()->attach($user,['individual_rating' => $rate]);
            $this->general_rating = $this->general_rating*$this->count_people;
            $this->count_people = $this->count_people + 1;
            $this->general_rating = $this->general_rating+$rate;
            $this->general_rating = $this->general_rating/$this->count_people;
        }
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

    //Associa uma tag a um post   
    public function tag($tag_id){
        $tag = Tag::findOrFail($tag_id);
        if(!$this->tags()->get()->contains($tag)){
            $this->tags()->attach($tag);
        }
    }
}
