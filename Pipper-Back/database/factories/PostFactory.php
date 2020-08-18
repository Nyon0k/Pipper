<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'title' => $faker->title,
        'text' => $faker->asciify('********************'),
        'like' => rand(0,1000),
        'creator_rating' => rand(0,50)/10, // password
        "tags" => $faker->asciify('********************')
    ];
});