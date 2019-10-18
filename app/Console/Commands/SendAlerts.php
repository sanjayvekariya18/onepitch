<?php

namespace App\Console\Commands;

use App\Models\Alert;
use App\Models\User;
use DB;
use Illuminate\Console\Command;

class SendAlerts extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'alert:send';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send admin programed alerts to filtered users';

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
        $alerts = Alert::pending()->get();

        foreach ($alerts as $alert) {
            $alert->status = 2;
            $alert->save();
        }

        foreach ($alerts as $alert) {

            try {
                DB::connection()->getPdo()->beginTransaction();
                $filterBy = $alert->getFilterDescription();

                if ($filterBy == 'User') {
                    $ids = explode(",", $alert->user_id);

                    foreach ($ids as $id) {
                        $user = User::find($id);

                        if (!empty($user)) {
                            $user->alerts()->create([
                                'message' => $alert->message,
                                'link' => $alert->link
                            ]);
                        }
                    }
                }

                if ($filterBy == 'Role') {
                    $users = User::where('role', $alert->role)->get();
                    foreach ($users as $user) {
                        $user->alerts()->create([
                            'message' => $alert->message,
                            'link' => $alert->link
                        ]);
                    }
                }

                $alert->status = 3;
                $alert->save();

                DB::connection()->getPdo()->commit();

            } catch (\Exception $e) {
                DB::connection()->getPdo()->rollBack();

                $alert->status = 4;
                $alert->save();
            }
        }

        return 1;
    }
}
