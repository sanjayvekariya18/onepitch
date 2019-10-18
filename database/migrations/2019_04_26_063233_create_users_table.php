<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->tinyInteger('role')->nullable();
            $table->string('full_name', 100)->nullable();
            $table->string('company', 255)->nullable();
            $table->string('publication_url', 255)->nullable();
            $table->string('author_url', 255)->nullable();
            $table->string('email', 100)->unique()->nullable();
            $table->string('username', 255)->nullable();
            $table->string('phone_number', 255)->nullable();
            $table->string('linkedin_id', 100)->nullable();
            $table->string('twitter_id', 100)->nullable();
            $table->string('password', 255)->nullable();
            $table->string('remember_token', 100)->nullable();
            $table->string('photo', 255)->nullable();
            $table->string('twitter_url', 255)->nullable();
            $table->string('linkedin_url', 255)->nullable();
            $table->string('hear_about', 50)->nullable();
            $table->string('hear_about_other', 100)->nullable();
            $table->boolean('subscribe')->default(1);
            $table->boolean('agree_tos')->default(0);
            $table->string('referral_hash', 50)->nullable();
            $table->integer('referral_id')->unsigned()->nullable()->index();
            $table->boolean('is_verified')->default(0);
            $table->string('verification_code', 50)->nullable();
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
            $table->dateTime('last_login')->nullable();
            $table->boolean('is_admin')->default(0);
            $table->boolean('approved')->nullable()->default(null);
            $table->boolean('has_industry')->nullable()->default(null);
            $table->string('daily_mail_timezone', 10)->nullable();
            $table->time('daily_mail_time')->nullable();
            $table->string('mailnuggets_id', 255)->nullable()->index();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
