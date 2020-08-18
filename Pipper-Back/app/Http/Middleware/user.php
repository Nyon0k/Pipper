<?php

namespace App\Http\Middleware;

use App\Comment;
use App\Post;
use AppUser;
use Closure;
use Auth;

class user{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::user();
        $comment = Comment::with('user')->where('id', $request->id)->where('user_id', $user->id)->first(); //Verifica se o usuário é dono do comentário
        $post = Post::with('user')->where('id', $request->id)->where('user_id', $user->id)->first(); //Verifica se o usuário é o dono do post
        //Verifica se o usuário é moderador
        if($user->type == 1){
            return $next($request);
        }
        if($comment){
            echo 'entrou no comment';
            return $next($request);
        }
        if($post){
            return $next($request);
        }
        else{
            return response()->json(['Não é possível alterar este conteúdo!']);
        }
    }
}
