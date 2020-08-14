<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Likes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('likes', function (Blueprint $table){
            $table->id();
            $table->unsignedBigInteger('user_liker')->nullable();
            $table->unsignedBigInteger('post_liked')->nullable();
            $table->timestamps();
        });
        Schema::table('likes', function (Blueprint $table){
            $table->foreign('user_liker')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('post_liked')->references('id')->on('posts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
