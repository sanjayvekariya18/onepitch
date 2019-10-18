<?php

namespace App\Services;


use App\Models\IndustryKeyword;
use App\Models\TopicKeyword;

class DynamicRecommendationService
{
    protected $blacklistedWords;

    protected function getWordsBlacklist () {
        return [
            'from', 'of', 'i', 'it', 'is', 'the', 'this', 'a', 'to', '&'
        ];
    }

    /**
     * @param $collection
     * @return array
     */
    protected function invertedIndex ($collection) {
        $collection = str_replace(array('[',']','(',')'), '',$collection);
        $indexedCollection = array_count_values(explode(' ', strtolower(implode(' ', $collection))));
        arsort($indexedCollection);

        return $indexedCollection;
    }

    /**
     * @param $words
     * @return array
     */
    protected function blacklistWords ($words) {
        foreach ($words as $key => $word) {
            if (in_array($key, $this->getWordsBlacklist())) {
                unset($words[$key]);
            }
            if (strpos($key, ".") !== false) {
                $newKey = str_replace('.', '', $key);
                $words[$newKey] = $words[$key];
                unset($words[$key]);
            }
        }

        return $words;
    }

    public function getKeywordsRecommendations($collection) {
        $industryRecommendations = collect([]);
        $topicRecommendations = collect();
        $invertedWords = $this->invertedIndex($collection);
        $blacklisted = $this->blacklistWords($invertedWords);

        foreach ($blacklisted as $key => $value) {
            $industryResults = IndustryKeyword::where('keyword', 'like', $key)->get();
            $topicResults = TopicKeyword::where('keyword', 'like', $key)->get();

            $industryRecommendations = $industryRecommendations->merge($industryResults);
            $topicRecommendations = $topicRecommendations->merge($topicResults);
        }

        return [
            'industry' => $industryRecommendations,
            'topic' => $topicRecommendations
        ];
    }
}