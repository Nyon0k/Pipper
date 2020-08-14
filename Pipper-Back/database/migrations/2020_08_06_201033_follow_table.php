<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FollowTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('follow', function (Blueprint $table){
            $table->id();
            $table->unsignedBigInteger('user_follower')->nullable();
            $table->unsignedBigInteger('user_followed')->nullable();
            $table->timestamps();
        });
        Schema::table('follow', function (Blueprint $table){
            $table->foreign('user_follower')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('user_followed')->references('id')->on('users')->onDelete('cascade');
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
