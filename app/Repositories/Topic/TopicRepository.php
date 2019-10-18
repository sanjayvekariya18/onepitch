<?php

namespace App\Repositories\Topic;

use App\Models\IndustryTopic;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class TopicRepository extends BaseRepository implements TopicRepositoryInterface
{
    /**
     * @var string
     */
    public $model = IndustryTopic::class;

    /**
     * @param Request $request
     * @return Collection
     */
    public function search(Request $request): Collection
    {
        $items = new Collection();
        if ($request->input('query')) {
            $items = $this->getQuery()
                ->where('title', 'like', '%'.$request->input('query').'%')
                ->limit(10)->get();
        }

        return $items;
    }

    /**
     * @return Builder
     */
    public function getQuery(): Builder
    {
        return parent::getQuery();
    }
}