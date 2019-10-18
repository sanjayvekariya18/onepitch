<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        // Editing capabilities for Inquiries
        Gate::define('edit-inquiry', function ($user, $inquiry) {
            return $user->id === $inquiry->user_id;
        });

        // Editing capabilities for Inquiries
        Gate::define('edit-pitch', function ($user, $pitch) {
            return $user->id === $pitch->user_id;
        });

        // Editing capabilities for Pitch Approval Tool
        Gate::define('pitch-tool', function ($user) {
            // mendoza.servando@gmail.com = journalist_id: 638
            return in_array($user->id, [48, 107, 135, 486, 518, 659, 882, 638], true);
        });
    }
}
