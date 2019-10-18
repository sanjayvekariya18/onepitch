<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePitchEditsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pitch_edits', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index();
            $table->integer('pitch_id')->unsigned()->index();
            $table->tinyInteger('status')->default(0);
            $table->string('subject', 40)->nullable();
            $table->string('company')->nullable();
            $table->string('website')->nullable();
            $table->string('what_point_1')->nullable();
            $table->string('what_point_2')->nullable();
            $table->string('what_point_3')->nullable();
            $table->string('what_point_4')->nullable();
            $table->string('what_point_5')->nullable();
            $table->string('why_point_1')->nullable();
            $table->string('why_point_2')->nullable();
            $table->string('why_point_3')->nullable();
            $table->string('why_point_4')->nullable();
            $table->string('why_point_5')->nullable();
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
        Schema::dropIfExists('pitch_edits');
    }
}
