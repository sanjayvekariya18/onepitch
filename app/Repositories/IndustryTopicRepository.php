<?php

namespace App\Repositories;

use App\Models\IndustryTopic; 
use DB;

class IndustryTopicRepository
{
	public static function getBasic($no_event = false, $searchterm=null) {
		$query = IndustryTopic::query()
			->where('is_custom', 0)
			->orderBy('title', 'asc');
			
		if ($searchterm!=null) {
			$query->where('title', 'like', '%' . $searchterm . '%');
		}

		if ($no_event) {
			$query->where('for_event', 0);
		}

		return $query->get();
	}

    public function getNumberOfAllSubmittedPitch ($topicId)
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT 
		            DISTINCT pitch_id
		          FROM pitch_industry_topics
		          INNER JOIN (
		            SELECT 
		              *
		            FROM pitch_industry
	              ) as p
	              ON p.id = pitch_industry_topics.pitch_industry_id
	              WHERE topic_id = :topic_id;
                "), array(
            'topic_id' => $topicId,
        ));

        return count($results);
    }

    public function getNumberOfAllDraftPitch ($topicId)
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT 
		            DISTINCT pitch_id
	              FROM pitch_industry_topics
	              INNER JOIN (
		            SELECT 
			          *
		            FROM pitch_industry
	              ) as p
	              ON p.id = pitch_industry_topics.pitch_industry_id
	              INNER JOIN (
		            SELECT 
			          *
		            FROM pitches
		            WHERE pitches.status = 0
	              ) as ps
	              ON ps.id = p.pitch_id
	              WHERE topic_id = :topic_id;
                "), array(
            'topic_id' => $topicId,
        ));

        return count($results);
    }

    public function getNumberOfAllRejectedPitch ($topicId)
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT 
		            DISTINCT pitch_id
	              FROM pitch_industry_topics
	              INNER JOIN (
		            SELECT 
			          *
		            FROM pitch_industry
	              ) as p
	              ON p.id = pitch_industry_topics.pitch_industry_id
	              INNER JOIN (
		            SELECT 
			          *
		            FROM pitches
		            WHERE pitches.status = 10
	              ) as ps
	              ON ps.id = p.pitch_id
	              WHERE topic_id = :topic_id;
                "), array(
            'topic_id' => $topicId,
        ));

        return count($results);
    }

    public function getNumberOfAllSentPitch ($topicId)
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT 
		            DISTINCT pitch_id
	              FROM pitch_industry_topics
	              INNER JOIN (
		            SELECT 
			          *
		            FROM pitch_industry
	              ) as p
	              ON p.id = pitch_industry_topics.pitch_industry_id
	              INNER JOIN (
		            SELECT 
			          *
		            FROM pitches
		            WHERE pitches.status = 3
	              ) as ps
	              ON ps.id = p.pitch_id
	              WHERE topic_id = :topic_id;
                "), array(
            'topic_id' => $topicId,
        ));

        return count($results);
    }

    public function getNumberOfAllRespondedPitch ($topicId)
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT 
		            DISTINCT ps.pitch_id
	              FROM pitch_industry_topics
	              INNER JOIN (
		            SELECT 
			          *
		            FROM pitch_industry
	              ) as p
	              ON p.id = pitch_industry_topics.pitch_industry_id
	              INNER JOIN (
		            SELECT 
		              * 
	                FROM 
		              pitches 
	                INNER JOIN ( 
		              SELECT 
			            pitch_id 
		              FROM
			            pitch_mail_statistics 
	                ) AS a 
	                ON pitches.id = a.pitch_id
	              ) as ps
	              ON ps.id = p.pitch_id
	              WHERE topic_id = :topic_id;
                "), array(
            'topic_id' => $topicId,
        ));

        return count($results);
    }

    public function getNumberOfAllJournalistsSubscribed ($topicId)
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT 
		            DISTINCT users.id
	              FROM
		            user_industry_topics
	              INNER JOIN (
		            SELECT 
			          *
		            FROM
			          user_industry
	              ) AS uid 
	              ON user_industry_topics.user_industry_id = uid.id
	              INNER JOIN users 
	              ON uid.user_id = users.id
	              WHERE
		            users.role = 1
	              AND
		            topic_id = :topic_id;
                "), array(
            'topic_id' => $topicId,
        ));

        return count($results);
    }

    public function getNumberOfAllPublicistSubscribed ($topicId)
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT 
		            DISTINCT users.id
	              FROM
		            user_industry_topics
	              INNER JOIN (
		            SELECT 
			          *
		            FROM
			          user_industry
	              ) AS uid 
	              ON user_industry_topics.user_industry_id = uid.id
	              INNER JOIN users 
	              ON uid.user_id = users.id
	              WHERE
		            users.role = 2
	              AND
		            topic_id = :topic_id;
                "), array(
            'topic_id' => $topicId,
        ));

        return count($results);
    }
}