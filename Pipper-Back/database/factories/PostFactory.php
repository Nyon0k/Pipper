<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'title' => $faker->title,
        'original_comment' => $faker->asciify('********************'),
        'like' => rand(0,1000),
        'rating' => rand(0,50)/10, // password
        "tags" => $faker->asciify('********************')
    ];
});