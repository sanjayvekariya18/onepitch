<?php

namespace App\Repositories\Inquiry;

use App\Models\Inquiry;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class InquiryRepository extends BaseRepository implements InquiryRepositoryInterface
{
    /**
     * @var array
     */
    protected $easyLoad = [];

    /**
     * @var string
     */
    public $model = Inquiry::class;

    /**
     * @param Request $request
     * @return Collection
     */
    public function search (Request $request) : Collection
    {
        $journalists = new Collection();
        if ($request->input('query')) {
            $journalists = $this->getQuery()
                ->where('subject', 'like', '%'.$request->input('query').'%')
                ->limit(10)->get();
        }

        return $journalists;
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
        return $this->getQuery()->whereHas('inquiry_industries', function (Builder $q) {
            $q->whereHas('topics', function (Builder $q) {
                $q->where('is_custom', true);
            });
        })->get();
    }
}