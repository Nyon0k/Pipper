<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function createUser(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required|string',
            'nickname' => 'string',
            'email' => 'required|unique:Users,email|email',
            'password' => 'required',            
            'type' => 'required'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }
        
        $user = new User;
        $user->name = $request->name;
        $user->nickname = $request->nickname;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->type = $request->type;
        $user->save();
        return response()->json($user);
    }

    public function showUser($id){
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function listUsers(){
        $user = User::all();
        return response()->json($user);
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
        return response()->json($user);
    }

    public function deleteUser($id){
        User::destroy($id);
        return response()->json(['Usuário deletado!']);
    }

    public function makePost($user_id,$post_id){
        $post = App\Post::findOrFail($post_id);
        $post->setUser($user_id);
        return response()->json($post);
    }

    public function makeComment($user_id,$comment_id){
        $comment = App\Comment::findOrFail($comment_id);
        $comment->setUser($user_id);
        return response()->json($comment);
    }

}
