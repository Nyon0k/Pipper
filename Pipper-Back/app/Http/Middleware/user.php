<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use App\Comment as CommentModel;
use App\Post as PostModel;
use App\User as UserModel;
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
        
        $comment = CommentModel::with('user')->where('user_id', $request->user_id)->get(); //Verifica se o usuário é dono do comentário
        $post = PostModel::with('user')->where('user_id', $request->user_id)->get(); //Verifica se o usuário é o dono do post
        $user1 = UserModel::where('id', $request->id)->get(); //Verifica se os ids dos usuários são iguais

        $keyModerator = UserModel::where('type', 1)->get(); //Verifica se o usuário é moderador
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
