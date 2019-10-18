<?php

namespace App\Repositories\Pitch;

use App\Repositories\RepositoryInterface;
use App\Repositories\SearchesRepository;
use Illuminate\Database\Eloquent\Collection;

interface PitchRepositoryInterface extends RepositoryInterface, SearchesRepository
{
    /**
     * @param array $params
     * @return static
     */
    public function setEasyLoad (array $params = []);

    /**
     * @return Collection
     */
    public function getWithNewTopic () : Collection;
}