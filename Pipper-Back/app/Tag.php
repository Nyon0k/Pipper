<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Tag;

class Tag extends Model
{
    public function createTag(Request $request){
        $this->title = $request->title;
        $this->save();
        $this->save();
    }

    public function updateTag(Request $request){
        if($request->title){
            $this->title = $request->title;
        }
        $this->save();
    }

    public function posts(){
        return $this->belongsToMany('App\Post');
    }
}
