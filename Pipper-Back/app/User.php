<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    public function createUser(UserRequest $request){
        $this->name = $request->name;
        $this->nickname = $request->nickname;
        $this->email =$request->email;
        $this->password = $request->password;
        $this->type = $request->type;
        $this->save();
    }

    public function updateUser(Request $request, $id){
        $user = User::findOrFail($id);
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
            $this->password = $request->password;
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

    public function posts(){
        return $this->hasMany('App\Post');
    }

    public function comments(){
        return $this->hasMany('App\Comment');
    }
    
}
