<?php

namespace App\Http\Middleware;

use Closure;
use App\Comment;
use App\Post;

class user
{
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
        $comment = Comment::with('user')->where('user_id', $request->user_id)->get(); //Verifica se o usuário é dono do comentário
        $post = Post::with('user')->where('user_id', $request->user_id)->get(); //Verifica se o usuário é o dono do post
        $user1 = User::where('id', $request->id)->get(); //Verifica se os ids dos usuários são iguais
        $keyModerator = User::where('type', 1)->get(); //Verifica se o usuário é moderador
        if($keyModerator){
            return $next($request);
        }
        if($comment || $post || $user1){
            return $next($request);
        }
        else{
            return response()->json(['Não é possível alterar este conteúdo!']);
        }
    }
}
