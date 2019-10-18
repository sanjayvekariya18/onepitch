<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class CreateSuperAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'create-user:super-admin {email=info@onepitch.co} {password=onepitch123}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create super admin user.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        (new User)
            ->where('email', $this->argument('email'))
            ->delete();

        $user = new User([
            'email' => $this->argument('email'),
            'password' => bcrypt($this->argument('password')),
            'full_name' => 'Super Admin',
            'role' => User::SUPER_ADMIN,
            'is_verified' => 1
        ]);

        $user->save();

        return 1;
    }
}
