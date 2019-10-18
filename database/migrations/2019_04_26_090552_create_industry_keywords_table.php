<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateIndustryKeywordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('industry_keywords', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('industry_id')->unsigned()->index();
            $table->string('keyword');
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
        });

        // Full Text Index
        DB::statement('ALTER TABLE industry_keywords ADD FULLTEXT keyword_search_index (keyword)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('industry_keywords');
    }
}
