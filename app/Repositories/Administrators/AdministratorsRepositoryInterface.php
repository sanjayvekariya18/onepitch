<?php

namespace App\Repositories\Administrators;

use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

interface AdministratorsRepositoryInterface extends UserRepositoryInterface
{
    /**
     * @return Collection
     */
    public function getWithSuperAdminAdmins() : Collection;

}