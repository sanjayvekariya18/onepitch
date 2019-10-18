<?php

namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class UserRepository extends BaseRepository
{
    /**
     * @var Model string
     */
    public $model = User::class;

    /**
     * @param Request $request
     * @return Collection
     */
    public function search (Request $request) : Collection
    {
        $publicists = new Collection();
        if ($request->input('query')) {
            $publicists = $this->getQuery()
                ->where('full_name', 'like', '%'.$request->input('query').'%')
                ->limit(10)->get();
        }

        return $publicists;
    }

    public static function getJournalists()
	{
		$query = User::query()
			->where('role', User::ROLE_JOURNALIST)
			->where('is_verified', 1)
			->where('approved', 1)
			->where('subscribe', 1);

		return $query->get();
	}

    public static function getNoneTimedJournalists()
    {
        $query = User::query()
            ->where('role', User::ROLE_JOURNALIST)
            ->where('is_verified', 1)
            ->where('approved', 1)
            ->where('subscribe', 1)
            ->whereNull('daily_mail_time');

        return $query->get();
    }

    public static function getTimedJournalists($number)
    {
        $query = User::query()
            ->where('role', User::ROLE_JOURNALIST)
            ->where('is_verified', 1)
            ->where('approved', 1)
            ->where('subscribe', 1)
            ->where('daily_mail_time', $number);

        return $query->get();
    }

    public static function getPublicists()
    {
        $query = User::query()
            ->where('role', User::ROLE_PUBLICIST)
            ->where('is_verified', 1)
            ->where('has_industry', 1)
            ->where('subscribe', 1);

        return $query->get();
    }

    public static function getNoneTimedPublicists()
    {
        $query = User::query()
            ->where('role', User::ROLE_PUBLICIST)
            ->where('is_verified', 1)
            ->where('has_industry', 1)
            ->where('subscribe', 1)
            ->whereNull('daily_mail_time');

        return $query->get();
    }

    public static function getTimedPublicists($number)
    {
        $query = User::query()
            ->where('role', User::ROLE_PUBLICIST)
            ->where('is_verified', 1)
            ->where('has_industry', 1)
            ->where('subscribe', 1)
            ->where('daily_mail_time', $number);

        return $query->get();
    }
}