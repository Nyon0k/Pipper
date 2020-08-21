<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\User;
use App\Comment;
use App\Post;
use Illuminate\Support\Facades\Validator;
use Auth;
use Illuminate\Support\Facades\Storage;
use DB;

class PostController extends Controller
{
    public function createPost(PostRequest $request){
        $user = Auth::user();
        $id = $user->id;
        $post = new Post;
        $post->createPost($request, $id);
        
        foreach($request->tag_ids as $tag_id){
            $post->tag($tag_id);
        }
        return response()->json($post);
    }
    //Dado o id, busca o post que contém tal id, e o mostra juntamente com todos os seus comentários, tags e número total de comentários.
    public function showPost($id){
        $post = Post::with('user','comments','tags')->where('id', $id)->first();
        $post->loadCount('comments as count_comments');
        return response()->json($post);
    }

    //Lista todos os posts com suas respectivas tags.
    public function listPosts(){
        $post = Post::with('tags');
        return response()->json($post);
    }

    // Busca um post por id e altera suas informações, ou retorna uma mensagem de não autorização se o usuário não for o dono do post
    public function updatePost(Request $request, $id){
        $user = Auth::user();
        $post = Post::findOrFail($id);
        if($user->id == $post->user_id){
            $post->updatePost($request);
            return response()->json($post);
        }
        return response()->json('Este post não pode ser auterado por este usuário');
    }

    public function deletePost($id){
        $post = Post::findOrFail($id);
        if($post->photo){
            Storage::delete($post->photo);
        }
        Post::destroy($id);
        return response()->json(['Post deletado!']);
    }

    public function getUserId($id){
        $post = App\Post::findOrFail($id);
        return $post->user_id;
    }

    public function attachComment($post_id,$comment_id){
        $comment = App\Comment::findOrFail($comment_id);
        $comment->setPost($post_id);
        return response()->json($comment);
    }

    //Listas de posts, com suas respectivas tags e usuários donos, por quantidade de likes, rating e data de criação
    public function listPostsByLike(){
        $like = Post::with('user')->orderBy('like','desc')->get();
        $like->loadCount('comments as count_comments');
        return response()->json($like);
    }
    
    public function listPostsByRating(){
        $rating = Post::with('user', 'tags')->orderBy('general_rating','desc')->get();
        $rating->loadCount('comments as count_comments');
        return response()->json($rating);
    }

    public function listPostsByCreationDate(){
        $creationDate = Post::with('user', 'tags')->orderBy('created_at','desc')->get();
        $creationDate->loadCount('comments as count_comments');
        return response()->json($creationDate);
    }

    //Dado o id de um post e uma nota 'rate', associa a nota ao post
    public function rating($post_id, $rate){
        $user = Auth::user();
        $post = Post::findOrFail($post_id);
        $post->rating($user->id, $rate);
        return response()->json(['Avaliado com sucesso', $post]);
    }

    //incrementa ou descrementa (caso o botão de like já tenha sido clicado)  a quantidade de likes de um post
    public function like($post_liked){
        $user = Auth::user();
        $post = Post::findOrFail($post_liked);
        $verified = DB::table('likes')->where('user_liker', $user->id)->where('post_liked', $post->id)->count()>0;
        if($verified){
            $user->likes()->detach($post);
            $post->dislike();
            return response()->json('Descurtiu!');
        }else{
            $user->likes()->attach($post);
            $post->like();
            return response()->json("Curtiu!");
        }
    }

    //fazer metodo do post integrado entre user e post (lista) (conferir)
    public function listPostUser(){
        $data = Post::with('User')->get();
        return response()->json($data);
    }

    //fazer metodo do post integrado entre user,post,comment.user (post) (conferir)
    public function showPostUserComment($id){
        //$data = Comment::with(['user.ratedPosts' => function($query){$query->select('individual_rating')->where('post_id',$id);}])->where('post_id',$id)->get();
        $data = Comment::with('user')->where('post_id', $id)->get();
        return response()->json($data);
    }   

    //Lista posts com seus respectivos comentários e os donos desses comentários
    public function postUserComment($id){
        $data = Post::with('user', 'comments.user')->where('id', $id)->get();
        return response()->json($data);
    }
    
    //Lista posts com seus respectivos usuários 
    public function listPostsByAUser($id){
        $userPosts = Post::with('user','comments')->where('user_id', $id)->get();
        return response()->json($userPosts);    
    }

}
