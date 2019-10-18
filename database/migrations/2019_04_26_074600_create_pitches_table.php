<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePitchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pitches', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index();
            $table->tinyInteger('status')->default(0)->nullable();
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
            $table->dateTime('uploaded_at')->nullable();
            $table->dateTime('sent_at')->nullable();
            $table->dateTime('accepted_at')->nullable();
            $table->integer('sent_amount')->unsigned()->default(0);
            $table->integer('clicks')->unsigned()->default(0);
            $table->integer('opens')->unsigned()->default(0);
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
            $table->string('confirmation_code', 50)->nullable();
            $table->string('mailnuggets_id')->nullable()->index();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pitches');
    }
}
