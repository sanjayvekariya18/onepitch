<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUserToursTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_tours', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index()->unique();
            $table->tinyInteger('profile')->default(0);
            $table->tinyInteger('edit_profile')->default(0);
            $table->tinyInteger('interests')->default(0);
            $table->tinyInteger('pitch_what')->default(0);
            $table->tinyInteger('pitch_why')->default(0);
            $table->tinyInteger('pitch_where')->default(0);
            $table->tinyInteger('inquiry_what')->default(0);
            $table->tinyInteger('inquiry_want')->default(0);
            $table->tinyInteger('inquiry_where')->default(0);
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_tours');
    }
}
