<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    use Notifiable;
    use HasApiTokens;

    public function createUser(UserRequest $request){
        $this->name = $request->name;
        $this->nickname = $request->nickname;
        $this->email =$request->email;
        $this->password = bcrypt($request->password);
        $this->type = $request->type;
        if(!Storage::exists('localPhotos/users/')){
            Storage::makeDirectory('localPhotos/users/',0775,true);
        }
        if($request->photo){
            $image = base64_decode($request->photo);
           $filename = uniqid();
           $path = 'localPhotos/users/'.$filename;
           file_put_contents(storage_path('app/'.$path),$image);
           $this->photo=$path; 
        }
        $this->save();
    }

    public function updateUser(Request $request){
        if($request->name){
            $this->name = $request->name;
        }
        if($request->nickname){
            $this->nickname = $request->nickname;
        }
        if($request->email){
            $this->email = $request->email;
        }
        if($request->password){
            $this->password = bcrypt($request->password);
        }
        if($request->type){ 
            $this->type = $request->type;
        }

        if($request->photo){
            Storage::delete($this->photo);
            $image = base64_decode($request->photo);
            $filename = uniqid();
            $path = 'localPhotos/users/'.$filename;
            file_put_contents(storage_path('app/'.$path),$image);
            $this->photo=$path;
        }
     

        $this->save();
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function followUserFollower(){
        return $this->belongsToMany('App\User', 'follow', 'user_follower', 'user_followed');
    }

    public function followUserFollowed(){
        return $this->belongsToMany('App\User', 'follow', 'user_followed', 'user_follower');
    }

    public function likes(){
        return $this->belongsToMany('App\User', 'likes', 'user_liker', 'post_liked');
    }

    public function posts(){
        return $this->hasMany('App\Post');
    }

    public function comments(){
        return $this->hasMany('App\Comment');
    }

    public function search(){

    }
    
}
