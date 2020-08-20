<?php

use Illuminate\Database\Seeder;
use App\Tag;
class TagTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tag = new Tag;
        $tag->title = 'Serviço';
        $tag->save();       
        
        $tag = new Tag;
        $tag->title = 'Produto';
        $tag->save();

        $tag = new Tag;
        $tag->title = 'Físico';
        $tag->save();

        $tag = new Tag;
        $tag->title = 'Online';
        $tag->save();

        $tag = new Tag;
        $tag->title = 'Entretenimento';
        $tag->save();

        $tag = new Tag;
        $tag->title = 'Saúde';
        $tag->save();

        $tag = new Tag;
        $tag->title = 'Esporte';
        $tag->save();

        $tag = new Tag;
        $tag->title = 'Alimentação';
        $tag->save();

        $tag = new Tag;
        $tag->title = 'Utilidades Domésticas';
        $tag->save();

        $tag = new Tag;
        $tag->title = 'Infantis';
        $tag->save();
    }
}
