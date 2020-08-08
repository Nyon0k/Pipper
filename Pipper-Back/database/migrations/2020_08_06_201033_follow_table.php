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
            $table->unsignedBigInteger('userFollower')->nullable();
            $table->unsignedBigInteger('userFollowed')->nullable();
            $table->timestamps();
        });
        Schema::table('follow', function (Blueprint $table){
            $table->foreign('userFollower')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('userFollowed')->references('id')->on('users')->onDelete('cascade');
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
