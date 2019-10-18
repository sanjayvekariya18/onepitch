<?php

namespace App\Console\Commands;

use App\Models\Industry;
use App\Models\IndustryKeyword;
use App\Models\IndustryTopic;
use App\Models\TopicKeyword;
use App\Services\KeywordService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateKeywords extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'keywords:update';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update Keywords';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $savedIndustries = [];
        $savedTopics = [];

        IndustryKeyword::truncate();
        TopicKeyword::truncate();

        $industryKeywords = KeywordService::getIndustryKeywords();
        $topicKeywords = KeywordService::getTopicKeywords();

        foreach ($industryKeywords as $key => $industryKeyword) {
            $industry = Industry::where('title', $key)->first();

            foreach ($industryKeyword as $keyword) {
                try {
                    $savedIndustry = IndustryKeyword::create(['industry_id' => $industry->id, 'keyword' => $keyword]);
                    if (!in_array($industry->id, $savedIndustries)) {
                        echo $industry->id.PHP_EOL;
                        $savedIndustries[] = $industry->id;
                    }
                } catch (\Exception $e) {

                }
            }
        }

        foreach ($topicKeywords as $key => $topicKeyword) {
            $topic = IndustryTopic::where('title', $key)->first();

            foreach ($topicKeyword as $keyword) {
                try {
                    $savedTopic = TopicKeyword::create(['industry_topic_id' => $topic->id, 'keyword' => $keyword]);
                    if (!in_array($topic->id, $savedTopics)) {
                        echo $topic->id.PHP_EOL;
                        $savedTopics[] = $topic->id;
                    }
                } catch (\Exception $e) {

                }
            }
        }
    }
}
