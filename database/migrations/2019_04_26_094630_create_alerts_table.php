<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlertsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alerts', function (Blueprint $table) {
            $table->increments('id');
            $table->string('user_id')->nullable()->default(null)->comment('Filter by single or multiple User Ids separated by comma');
            $table->tinyInteger('role')->unsigned()->nullable()->default(null)->comment('Filter by User Role');
            $table->integer('inquiry_industry_topic_id')->unsigned()->nullable()->default(null)->comment('Industry Topic subscriptions (inquiry)');
            $table->integer('pitch_industry_topic_id')->unsigned()->nullable()->default(null)->comment('Industry Topic subscriptions (journalist)');
            $table->string('location')->nullable()->default(null)->comment('Filter users by location');
            $table->string('link')->nullable()->default(null)->comment('Hyperlink for clickable alerts');
            $table->text('message')->comment('The alert body message');
            $table->dateTime('due_date')->nullable()->comment('Schedule date to push alert');
            $table->tinyInteger('status')->unsigned()->default(1)->comment('Alert push status (1:Pending, 2:Sending, 3:Sent, 4:Failed)');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
            $table->dateTime('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alerts');
    }
}
