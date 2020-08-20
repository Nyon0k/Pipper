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

        // if(!Storage::exists('localPhotos/products/')){
        //     Storage::makeDirectory('localPhotos/products/',0775,true);
        // }
        // if($request->photo){
        //     $image = base64_decode($request->photo);
        //    $filename = uniqid();
        //    $path = 'localPhotos/products/'.$filename;
        //    file_put_contents(storage_path('app/'.$path),$image);
        //    $this->photo=$path; 
        // }

        $this->count_people = 0;
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
        //     Storage::delete($this->photo);
        //     $image = base64_decode($request->photo);
        //    $filename = uniqid();
        //    $path = 'localPhotos/products/'.$filename;
        //    file_put_contents(storage_path('app/'.$path),$image);
        //    $this->photo=$path;
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

    public function rating($rate){
        $user = Auth::user();
        $this->raterUsers()->attach($user,['individual_rating' => $rate]);
        $this->count_people = $this->count_people + 1;
        $this->general_rating = ($this->general_rating + $rate)/$this->count_people;
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
