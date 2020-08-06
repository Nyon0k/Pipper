<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    return [
        'title' => $faker->title,
        'originalComment' => $faker->asciify('********************'),
        'like' => rand(0,1),
        'rating' => rand(0,50)/10, // password
        'date' => date('Y/m/d'),
        "tags" => $faker->asciify('********************')
    ];
});