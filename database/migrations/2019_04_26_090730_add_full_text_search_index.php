<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFullTextSearchIndex extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        DB::statement('ALTER TABLE user_companies ADD FULLTEXT brand_search_index (company, location)');
        DB::statement('ALTER TABLE users ADD FULLTEXT brand_search_index (full_name, company)');
        DB::statement('ALTER TABLE industries ADD FULLTEXT brand_search_index (title, full_title)');
        DB::statement('ALTER TABLE industry_topics ADD FULLTEXT brand_search_index (title)');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::table('user_companies', function($table) {
            $table->dropIndex('brand_search_index');
        });
        Schema::table('users', function($table) {
            $table->dropIndex('brand_search_index');
        });
        Schema::table('industries', function($table) {
            $table->dropIndex('brand_search_index');
        });
        Schema::table('industry_topics', function($table) {
            $table->dropIndex('brand_search_index');
        });
    }
}
