<?php

namespace App\Repositories\Brand;

use App\Models\UserCompany;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class BrandRepository extends BaseRepository implements BrandRepositoryInterface
{
    /**
     * @var array
     */
    protected $easyLoad = [];

    /**
     * @var string
     */
    public $model = UserCompany::class;

    /**
     * @param Request $request
     * @return Collection
     */
    public function search (Request $request) : Collection
    {
        $publicists = new Collection();
        if ($request->input('query')) {
            $publicists = $this->getQuery()
                ->where('subject', 'like', '%'.$request->input('query').'%')
                ->limit(10)->get();
        }

        return $publicists;
    }

    /**
     * @return Builder
     */
    public function getQuery(): Builder
    {
        return parent::getQuery()->with($this->easyLoad);
    }

    /**
     * @param array $params
     * @return $this
     */
    public function setEasyLoad (array $params = [])
    {
        $this->easyLoad = $params;
        return $this;
    }

    /**
     * @return Collection
     */
    public function getWithNewTopic(): Collection
    {
        return $this->getQuery()->whereHas('pitch_industries', function (Builder $q) {
            $q->whereHas('topics', function (Builder $q) {
                $q->where('is_custom', true);
            });
        })->get();
    }
}