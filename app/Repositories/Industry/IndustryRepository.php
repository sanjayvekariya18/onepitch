<?php

namespace App\Repositories\Industry;

use DB;
use App\Models\Industry;
use App\Repositories\BaseRepository;

class IndustryRepository extends BaseRepository implements IndustryRepositoryInterface
{
    /**
     * @var string
     */
    public $model = Industry::class;

    public function getNumberOfAllSubmittedPitch ($industryId)
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT 
		            *
		          FROM pitch_industry
			      WHERE industry_id = :industry_id;
                "), array(
            'industry_id' => $industryId,
        ));

        return count($results);
    }

    public function getNumberOfAllDraftPitch ($industryId)
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT 
	                *
	              FROM pitch_industry
	              INNER JOIN (
		            SELECT 
		              *
		            FROM pitches
		            WHERE pitches.status = 0
	              ) as p
	              ON p.id = pitch_industry.pitch_id
			      WHERE industry_id = :industry_id;
                "), array(
            'industry_id' => $industryId,
        ));

        return count($results);
    }

    public function getNumberOfAllRejectedPitch ($industryId)
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT 
	                *
	              FROM pitch_industry
	              INNER JOIN (
		            SELECT 
		              *
		            FROM pitches
		            WHERE pitches.status = 10
	              ) as p
	              ON p.id = pitch_industry.pitch_id
			      WHERE industry_id = :industry_id;
                "), array(
            'industry_id' => $industryId,
        ));

        return count($results);
    }

    public function getNumberOfAllSentPitch ($industryId)
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT 
	                *
	              FROM pitch_industry
	              INNER JOIN (
		            SELECT 
		              *
		            FROM pitches
		            WHERE pitches.status = 3
	              ) as p
	              ON p.id = pitch_industry.pitch_id
			      WHERE industry_id = :industry_id;
                "), array(
            'industry_id' => $industryId,
        ));

        return count($results);
    }

    public function getNumberOfAllRespondedPitch ($industryId)
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT 
	                * 
                  FROM pitch_industry 
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
                  ) AS p on p.id = pitch_industry.pitch_id
			      WHERE industry_id = :industry_id;
                "), array(
            'industry_id' => $industryId,
        ));

        return count($results);
    }

    public function getNumberOfAllJournalistsSubscribed ($industryId)
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT
	                * 
                  FROM
	                users 
                  INNER JOIN (
	                SELECT 
		              user_id, industry_id 
	                FROM
		              user_industry
                  ) AS uid 
                  ON users.id = uid.user_id
                  WHERE 
	                users.role = 1 
                  AND 
			      uid.industry_id = :industry_id;
                "), array(
            'industry_id' => $industryId,
        ));

        return count($results);
    }

    public function getNumberOfAllPublicistSubscribed ($industryId)
    {
        $results = DB::select(
            DB::raw(
                "
                  SELECT
	                * 
                  FROM
	                users 
                  INNER JOIN (
	                SELECT 
		              user_id, industry_id 
	                FROM
		              user_industry
                  ) AS uid 
                  ON users.id = uid.user_id
                  WHERE 
	                users.role = 2 
                  AND 
			      uid.industry_id = :industry_id;
                "), array(
            'industry_id' => $industryId,
        ));

        return count($results);
    }
}