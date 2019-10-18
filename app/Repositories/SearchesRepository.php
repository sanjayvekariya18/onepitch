<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

interface SearchesRepository
{
    /**
     * @param Request $request
     * @return Collection
     */
    public function search(Request $request) : Collection;
}