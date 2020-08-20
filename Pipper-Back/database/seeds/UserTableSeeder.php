<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = factory(App\User::class,10)->create()->each(function($user){
            $posts = factory(App\Post::class,rand(0,5))->create()->each(function($posts){
                $comments = factory(App\Comment::class,rand(0,5))->create();
                $posts->comments()->saveMany($comments);
            });
            $user->posts()->saveMany($posts);        
        });

        $posts = App\Post::all();
        foreach($posts as $post){
            foreach($users as $user){
                $post->rating($user->id,rand(1,5));
            }
        }

        $comments = App\Comment::all();
        foreach($comments as $comment){
            App\User::find(rand(1,10))->comments()->save($comment);
        }

     
       
        for($i=0;$i<10;$i++){
            for($j=0;$j<10;$j++){
                if($i!=$j){
                    $users->values()->get($i)->followUserFollower()->attach( $users->values()->get($j));
                }
            }
        }
    }
}
