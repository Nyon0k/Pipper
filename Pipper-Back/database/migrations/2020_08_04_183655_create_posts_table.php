<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('text');
            $table->integer('like')->nullable()->default(0);
            $table->float('general_rating')->nullable()->default(0);
            $table->string('tags')->nullable();
            $table->integer('count_people')->nullable();
            $table->float('creator_rating')->nullable();
            $table->timestamps();
            $table->unsignedBigInteger("user_id")->nullable();
            $table->mediumText('photo')->nullable();
            $table->foreign("user_id")->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
