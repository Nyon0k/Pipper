<?php

namespace App;
use App\Http\Requests\PostRequest;
use Illuminate\Database\Eloquent\Model;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    public function createPost(Request $request, $id){
        $this->title = $request->title;
        $this->text = $request->text;
        $this->like = $request->like;
        $this->rating = $request->rating;
        $this->tags = $request->tags;
        $this->user_id = $id;

        if(!Storage::exists('localPhotos/products/')){
            Storage::makeDirectory('localPhotos/products/',0775,true);
        }
        if($request->photo){
            $image = base64_decode($request->photo);
           $filename = uniqid();
           $path = 'localPhotos/products/'.$filename;
           file_put_contents(storage_path('app/'.$path),$image);
           $this->photo=$path; 
        }

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
            Storage::delete($this->photo);
            $image = base64_decode($request->photo);
           $filename = uniqid();
           $path = 'localPhotos/products/'.$filename;
           file_put_contents(storage_path('app/'.$path),$image);
           $this->photo=$path;
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
