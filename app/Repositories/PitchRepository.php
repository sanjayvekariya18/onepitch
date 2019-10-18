<?php

namespace App\Repositories;

use App\Models\Pitch;
use App\Models\User;
use Carbon\Carbon;
use DB;

class PitchRepository
{
	public static function getAll($filters, $limit = 25, $offset = 0) {
		$user = isset($filters['user']) ? $filters['user'] : null;

		$query = Pitch::withCount('saved_pitches');
        //$query = Pitch::query();

		if (isset($filters['term']) && $term = $filters['term']) {
			$query->where('subject', 'LIKE', '%'.$term.'%');
		}
		if ($user) {
			$query->where('user_id', $user->id);
		}

		//$query->where('status', '<>', Pitch::STATUS_DRAFT);

		$tpl = getMultipleDataTemplate();
		$tpl['total'] = $query->count();

		$query->orderBy('uploaded_at', 'DESC');

		if ($limit) {
			$offset = $limit * $offset;

			$query->limit($limit)
				->offset($offset);
		}

		$tpl['offset'] = $offset;
		$tpl['limit'] = $limit;
		$tpl['items'] = $query->get();

		return $tpl;
	}

    public static function getAllSaved($filters, $limit = 25, $offset = 0) {
        $user = isset($filters['user']) ? $filters['user'] : null;

        $query = Pitch::query();

        if (isset($filters['term']) && $term = $filters['term']) {
            $query->where('subject', 'LIKE', '%'.$term.'%');
        }
        if ($user) {
            $query->where('user_id', $user->id);
        }

        //$query->where('status', '<>', Pitch::STATUS_DRAFT);

        $tpl = getMultipleDataTemplate();
        $tpl['total'] = $query->count();

        $query->orderBy('uploaded_at', 'DESC');

        if ($limit) {
            $offset = $limit * $offset;

            $query->limit($limit)
                ->offset($offset);
        }

        $tpl['offset'] = $offset;
        $tpl['limit'] = $limit;
        $tpl['items'] = $query->get();

        return $tpl;
    }

	public static function getDraft($user_id) {
		$query = Pitch::query()
			->where('user_id', $user_id)
			->where('status', Pitch::STATUS_DRAFT);

		return $query->first();
	}

	public static function getForJournalistDaily(User $user) {
		$interests = $user->listIndustriesWithTopics();
		$intersts_groups = [];
		foreach ($interests as $interest) {
			$i_data = json_decode($interest['json'], true);
			$intersts_groups[$i_data['industry']] = $i_data['topics'];
		}

		$query = Pitch::select('pitches.*')
			->leftJoin('pitch_industry as pi', 'pi.pitch_id', '=', 'pitches.id')
			->leftJoin('pitch_industry_topics as pit', 'pit.pitch_industry_id', '=', 'pi.id')
			->where('status', Pitch::STATUS_UPCOMING)
            ->where('accepted_at', '<', Carbon::now()->toDateString() . ' 05:00:00')
			->where(function($query) use ($intersts_groups) {
				foreach ($intersts_groups as $indstr => $topics) {
					$query->orWhere(function($query) use ($indstr, $topics) {
						$query->where('pi.industry_id', $indstr)
							->whereIn('pit.topic_id', $topics);
					});
				}
			})
			->groupBy('pitches.id');

		return $query->get();
	}

	public static function markSent($ids) {
		Pitch::whereIn('id', $ids)
			->update([
				'sent_at' => date('Y-m-d H:i:s'),
				'sent_amount' => DB::raw('sent_amount + 1'),
			]);
	}

    public static function markOpened($ids) {
        Pitch::whereIn('id', $ids)
            ->update([
                'opens' => DB::raw('opens + 1'),
            ]);
    }

    public static function markViews($ids, $email) {
        $user = User::where(['email' => $email, 'role' => User::ROLE_JOURNALIST])->first();

        if(!empty($user)){
            foreach ($ids as $id) {
                $pitch = Pitch::find($id);

                if (!empty($pitch) && !$pitch->views()->where('user_id', $user->id)->count()) {
                    $pitch->views()->create(['user_id' => $user->id]);
                }
            }
        }
    }

    public static function markClicked($ids, $url, $email)
    {
        $user = User::where(['email' => $email, 'role' => User::ROLE_JOURNALIST])->first();

        if (!empty($user)) {
            foreach ($ids as $id) {
                $pitch = Pitch::find($id);

                if (!empty($pitch)) {

                    if (strrpos($pitch->website, $url) || strrpos($pitch->website, $url) === 0 ||
                        strrpos($pitch->what_point_1, $url) || strrpos($pitch->why_point_1, $url) ||
                        strrpos($pitch->why_point_2, $url) || strrpos($pitch->why_point_3, $url)) {

                        $pitch->increment('clicks');

                        if (!$pitch->mail_clicks()->where('user_id', $user->id)->count()) {
                            $pitch->mail_clicks()->create(['user_id' => $user->id]);
                        }
                    }

                    if ($position = strrpos($url, 'pitch/')) {
                        $fileUrl = substr($url, $position + 6);
                        if (strrpos($pitch->press_release->url, $fileUrl) || strrpos($pitch->files[0]->url, $fileUrl) ||
                            strrpos($pitch->files[1]->url, $fileUrl)) {

                            $pitch->increment('clicks');

                            if (!$pitch->mail_clicks()->where('user_id', $user->id)->count()) {
                                $pitch->mail_clicks()->create(['user_id' => $user->id]);
                            }
                        }
                    }
                }

            }
        }

    }

	public static function publish($ids) {
		Pitch::whereIn('id', $ids)
			->update([
				'status' => Pitch::STATUS_PUBLISHED,
			]);
	}

	public static function getNotMatched($to_date, $matches) {
		return Pitch::query()
			->where('accepted_at', '<', $to_date)
			->where('status', Pitch::STATUS_UPCOMING)
			->whereNotIn('id', $matches)
			->get();
	}
}