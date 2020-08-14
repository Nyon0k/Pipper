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

    public function listTags(){
        return response()->json(Tag::all());
    }

    public function deleteTag(Request $request, $id){
        Tag::destroy($id);
        return response()->json("Tag deletada!");
    }

    public function tag($post_id,$tag_id){
        $post = Post::findOrFail($post_id);
        $tag = Tag::findOrFail($tag_id);
        $post->tags()->attach($tag);
    }
}
