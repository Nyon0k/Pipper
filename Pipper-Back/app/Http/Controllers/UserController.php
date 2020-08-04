<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class UserController extends Controller
{
    public function createUser(Request $request){
        $user = new User;
        $user->name = $request->name;
        $user->nickname = $request->nickname;
        $user->email = $request->email;
        $user->password = $request->password;
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

}
