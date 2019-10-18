<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePitchMailStatisticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pitch_mail_statistics', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('pitch_id')->unsigned()->index();
            $table->integer('publicist_id')->unsigned()->index();
            $table->string('journalist_email');
            $table->integer('journalist_id')->unsigned()->index()->nullable();
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
        Schema::dropIfExists('pitch_mail_statistics');
    }
}
