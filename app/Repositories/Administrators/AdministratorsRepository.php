<?php

namespace App\Repositories\Administrators;

use App\Models\User;
use App\Repositories\User\UserRepository;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class AdministratorsRepository extends UserRepository implements AdministratorsRepositoryInterface
{
    /**
     * @return Collection
     */
    public function getWithSuperAdminAdmins() : Collection
    {
        $users = $this->getQuery()->where('role', [User::ADMIN, User::SUPER_ADMIN])->get();
        return $users instanceof Collection ? $users : new Collection();
    }

    /**
     * @return Builder
     */
    public function getQuery(): Builder
    {
        return parent::getQuery()->where('role', [User::ADMIN]);
    }
}