<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use Faker\Generator as Faker;

$factory->define(Post::class, function (Faker $faker) {
    $initial_rating =  rand(0,50)/10;
    return [
        'title' => $faker->title,
        'text' => $faker->asciify('********************'),
        'like' => rand(0,1000),
        'creator_rating' => $initial_rating, 
        'general_rating' => $initial_rating, 
        'count_people' => 1, 
        "tags" => $faker->asciify('********************')
    ];
});