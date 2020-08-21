<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Tag;
use App\Post;

class TagController extends Controller
{
    public function createTag(Request $request, $id){
        $tag = Tag::findOrFail($id);
        $tag->createTag($request);
        $this->save();
    }

    public function updateTag(Request $request){
        $tag = Tag::findOrFail($id);
        $tag->updateTag($request);
        $this->save();
    }

    public function showTag($id){
        return response()->json(Tag::findOrFail($id));
    }

    //Busca um post por id e lista suas tags
    public function listTagsPost($post_id){
        return response()->json(Post::findOrFail($post_id)->tags()->get());
    }
    
    public function deleteTag(Request $request, $id){
        Tag::destroy($id);
        return response()->json("Tag deletada!");
    }
}
