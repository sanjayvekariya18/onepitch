<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

interface RepositoryInterface
{
    /**
     * @return Collection
     * @internal param string $sort
     */
    public function getAll () : Collection;

    /**
     * @param $id
     * @return Model
     */
    public function getById ($id) : Model;

    /**
     * @param array $params
     * @param $paginate
     */
    public function getByCredentials (array $params, $paginate);

    /**
     * @param array $params
     * @param $column
     * @param $type
     */
    public function getByDateFilter (array $params, $column, $type);

    /**
     * @param array $params
     * @return Collection
     */
    public function getOneByCredentials (array $params) : Collection;

    /**
     * @param Model $model
     * @param array $credentials
     * @return Model
     */
    public function update (Model $model, array $credentials = []) : Model;

    /**
     * @param $field
     * @param string $direction
     * @return static
     */
    public function setOrderBy ($field, $direction = 'desc');
}