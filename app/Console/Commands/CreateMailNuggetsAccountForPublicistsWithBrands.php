<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Repositories\User\UserRepository;
use Illuminate\Console\Command;

class CreateMailNuggetsAccountForPublicistsWithBrands extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'brand:publicist';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Journalist daily emails sender';

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
        $users = User::withCount('companies')->where('role', User::ROLE_PUBLICIST)->whereNull('mailnuggets_id')->get()->where('companies_count', '>', 0);

        foreach ($users as $user) {
            if (!$user->mailnuggets_id) {
                $mailnuggets = new \mailNuggets();
                $resp = $mailnuggets->addThrowaway();
                $xml = simplexml_load_string($resp);

                if (isset($xml->throwaway->name)) {
                    $user->mailnuggets_id = getMailnuggetsEmail($xml->throwaway->name);
                    $user->save();
                }
            }
        }
    }
}
