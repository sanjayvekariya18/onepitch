<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\MassAssignmentException;
use Illuminate\Database\Eloquent\Model;

class BaseRepository implements RepositoryInterface
{
    /**
     * @var Model
     */
    protected $model;

    /**
     * @var null|array
     */
    protected $orderBy = [
        'field' => 'created_at',
        'direction' => 'desc'
    ];

    /**
     * @return Collection
     */
    public function getAll(): Collection
    {
        return $this->getQuery()->get();
    }

    /**
     * @param $id
     * @return Model
     */
    public function getById($id): Model
    {
        return $this->getQuery()->where('id', $id)->first();
    }

    /**
     * @param array $params
     * @param $paginate
     * @return
     */
    public function getByCredentials(array $params, $paginate=null)
    {
        $query = $this->getQuery();
        foreach ($params as $key => $param) {
            if (is_array($param)) {
                $query->whereIn($key, $param);
            } else {
                $query->where($key, $param);
            }
        }
        if ($paginate){
            $response = $query->paginate($paginate);
        } else {
            $response = $query->get();
        }
//        dd($response);
        return $response;
    }

    /**
     * @param array $params
     * @param $column
     * @param $type
     * @return
     */
    public function getByDateFilter(array $params, $column='created_at', $type=null)
    {
        if ($type === 'journalist') {
            $query = $this->getQuery()
                ->where('approved', '=', true)
                ->where($column, '>', $params[0])
                ->where($column, '<', $params[1]);
        } elseif ($type === 'pitch') {
            $query = $this->getQuery()
                ->where('status', '=', 3)
                ->where($column, '>', $params[0])
                ->where($column, '<', $params[1]);
        }else {
            $query = $this->getQuery()
                ->where($column, '>', $params[0])
                ->where($column, '<', $params[1]);
        }

        $response = $query->get();

        return $response;
    }

    /**
     * @param array $params
     * @return Collection
     */
    public function getOneByCredentials(array $params): Collection
    {
        $query = $this->getQuery();
        foreach ($params as $key => $param) {
            $query->where($key, $param);
        }
        return $query->first();
    }

    /**
     * @param Model $model
     * @param array $credentials
     * @return Model
     */
    public function update(Model $model, array $credentials = []): Model
    {
        try {
            $model->fill($credentials);
            $model->save();
        } catch (MassAssignmentException $exception) {
//            $this->logger->error($exception->getMessage());
        }

        return $model;
    }

    /**
     * @return Model
     */
    public function getModel () : Model
    {
        $model = $this->model;
        return new $model();
    }

    /**
     * @return Builder
     */
    public function getQuery () : Builder
    {
        return $this->getModel()->newQuery()->orderBy($this->orderBy['field'], $this->orderBy['direction']);
    }

    /**
     * @param $field
     * @param string $direction
     * @return BaseRepository
     */
    public function setOrderBy ($field, $direction = 'desc')
    {
        $this->orderBy['field'] = $field;
        $this->orderBy['direction'] = $direction;
        return $this;
    }
}