<?php

namespace App\Http\Middleware;

use Closure;

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
        $comment = Comment::with('user')->where('user_id', $user->id)->get(); //Verifica se o usuário é dono do comentário
        $post = Post::with('user')->where('user_id', $user->id)-get(); //Verifica se o usuário é o dono do post
        $user1 = User::where('user_id', $user->id)->get(); //Verifica se os ids dos usuários são iguais
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
