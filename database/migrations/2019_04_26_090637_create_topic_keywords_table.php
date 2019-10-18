<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTopicKeywordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('topic_keywords', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('industry_topic_id')->unsigned()->index();
            $table->string('keyword');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });

        // Full Text Index
        DB::statement('ALTER TABLE topic_keywords ADD FULLTEXT keyword_search_index (keyword)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('topic_keywords');
    }
}
