<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateInquiryMailStatisticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inquiry_mail_statistics', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('inquiry_id')->unsigned()->index();
            $table->integer('journalist_id')->unsigned()->index();
            $table->string('publicist_email');
            $table->integer('publicist_id')->unsigned()->index()->nullable();
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
        Schema::dropIfExists('inquiry_mail_statistics');
    }
}
