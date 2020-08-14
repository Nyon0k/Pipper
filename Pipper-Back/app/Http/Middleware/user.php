<?php

namespace App\Http\Middleware;

use App\Comment as CommentModel;
use App\Post as PostModel;
use App\User as UserModel;
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
        $comment = Comment::with('Post')->where('post_id', $request->post_id)->where('user_id', $user->id)->get(); //Verifica se o usuário é dono do comentário
        $post = Post::with('user')->where('user_id', $user->id)->get(); //Verifica se o usuário é o dono do post
        $keyModerator = User::where('type', 1)->get(); //Verifica se o usuário é moderador
        if($keyModerator->type == 1){
            echo 'entrou no keyModerator';
            return $next($request);
        }
        if($comment || $post){
            echo 'entrou no outro';
            return $next($request);
        }
        else{
            return response()->json(['Não é possível alterar este conteúdo!']);
        }
    }
}
