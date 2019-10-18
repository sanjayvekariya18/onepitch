<?php

namespace App\Repositories;

use App\Models\Inquiry;
use App\Models\User;
use Carbon\Carbon;
use DB;

class InquiryRepository
{
    public static function getAll($filters, $limit = 25, $offset = 0)
    {
        $user = isset($filters['user']) ? $filters['user'] : null;

        $query = Inquiry::withCount('saved_inquiries');

        if (isset($filters['term']) && $term = $filters['term']) {
            $query->where('subject', 'LIKE', '%' . $term . '%');
        }
        if ($user) {
            $query->where('user_id', $user->id);
        }

        //$query->where('status', '<>', Inquiry::STATUS_DRAFT);

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

    public static function getDraft($user_id)
    {
        $query = Inquiry::query()
            ->where('user_id', $user_id)
            ->where('status', Inquiry::STATUS_DRAFT);

        return $query->first();
    }

    public static function getForPublicistDaily(User $user)
    {
        $interests = $user->listIndustriesWithTopics();
        $intersts_groups = [];
        foreach ($interests as $interest) {
            $i_data = json_decode($interest['json'], true);
            $intersts_groups[$i_data['industry']] = $i_data['topics'];
        }

        $query = Inquiry::select('inquiries.*')
            ->leftJoin('inquiry_industry as pi', 'pi.inquiry_id', '=', 'inquiries.id')
            ->leftJoin('inquiry_industry_topics as pit', 'pit.inquiry_industry_id', '=', 'pi.id')
            ->where('status', Inquiry::STATUS_UPCOMING)
            ->where('accepted_at', '<', Carbon::now()->toDateString() . ' 05:00:00')
            ->where(function ($query) use ($intersts_groups) {
                foreach ($intersts_groups as $indstr => $topics) {
                    $query->orWhere(function ($query) use ($indstr, $topics) {
                        $query->where('pi.industry_id', $indstr)
                            ->whereIn('pit.topic_id', $topics);
                    });
                }
            })
            ->groupBy('inquiries.id');

        return $query->get();
    }

    public static function markSent($ids)
    {
        Inquiry::whereIn('id', $ids)
            ->update([
                'sent_at' => date('Y-m-d H:i:s'),
                'sent_amount' => DB::raw('sent_amount + 1'),
            ]);
    }

    public static function markOpened($ids)
    {
        Inquiry::whereIn('id', $ids)
            ->update([
                'opens' => DB::raw('opens + 1'),
            ]);
    }

    public static function markViews($ids, $email)
    {
        $user = User::where('email', $email)->where('role', User::ROLE_PUBLICIST)->first();

        if(!empty($user)) {
            foreach ($ids as $id) {
                $inquiry = Inquiry::find($id);

                if (!empty($inquiry) && !$inquiry->views()->where('user_id', $user->id)->count()) {
                    $inquiry->views()->create(['user_id' => $user->id]);
                }
            }
        }
    }

    public static function markClicked($ids, $url, $email)
    {
        $user = User::where(['email' => $email, 'role' => User::ROLE_PUBLICIST])->first();

        if (!empty($user)) {

            $userId = $user->id;

            foreach ($ids as $id) {
                $inquiry = Inquiry::find($id);

                if (!empty($inquiry)) {
                    if (strrpos($inquiry->website, $url) || strrpos($inquiry->website, $url) === 0 ||
                        strrpos($inquiry->what_point_1, $url) || strrpos($inquiry->why_point_1, $url) ||
                        strrpos($inquiry->why_point_2, $url) || strrpos($inquiry->why_point_3, $url)) {

                        $inquiry->increment('clicks');

                        if (!$inquiry->mail_clicks()->where('user_id', $userId)->count()) {
                            $inquiry->mail_clicks()->create(['user_id' => $userId]);
                        }
                    }

                    if ($position = strrpos($url, 'inquiry/')) {
                        $fileUrl = substr($url, $position + 6);

                        if (strrpos($inquiry->files[0]->url, $fileUrl) || strrpos($inquiry->files[1]->url, $fileUrl) ||
                            strrpos($inquiry->files[2]->url, $fileUrl)) {

                            $inquiry->increment('clicks');

                            if (!$inquiry->mail_clicks()->where('user_id', $userId)->count()) {
                                $inquiry->mail_clicks()->create(['user_id' => $userId]);
                            }
                        }
                    }
                }
            }
        }

    }

    public static function publish($ids)
    {
        Inquiry::whereIn('id', $ids)
            ->update([
                'status' => Inquiry::STATUS_PUBLISHED,
            ]);
    }

    public static function getNotMatched($to_date, $matches)
    {
        return Inquiry::query()
            ->where('accepted_at', '<', $to_date)
            ->where('status', Inquiry::STATUS_UPCOMING)
            ->whereNotIn('id', $matches)
            ->get();
    }
}