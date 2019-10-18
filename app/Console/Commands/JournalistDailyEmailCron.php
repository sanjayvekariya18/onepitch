<?php

namespace App\Console\Commands;

use App\Models\PitchLog;
use App\Notifications\JournalistDailyEmail;
use App\Notifications\NoPitchMatches;
use App\Notifications\PitchSent;
use App\Repositories\PitchRepository;
use App\Repositories\User\UserRepository;
use Illuminate\Console\Command;
use DB;

class JournalistDailyEmailCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mail:journalist_daily {number?}';

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
        $number = $this->argument('number');

        switch ($number) {
            case '05:00:00':
                $users = UserRepository::getJournalists();
                $to_publish = [];
                $to_send = [];
                foreach ($users as $user) {
                    $pitches = PitchRepository::getForJournalistDaily($user);
                    foreach ($pitches as $pitch) {
                        if (!$pitch->mailnuggets_id) {
                            $mailnuggets = new \mailNuggets();
                            $resp = $mailnuggets->addThrowaway();
                            $xml = simplexml_load_string($resp);

                            if (isset($xml->throwaway->name)) {
                                $pitch->mailnuggets_id = getMailnuggetsEmail($xml->throwaway->name);
                                $pitch->save();
                            }
                        }

                        if (!in_array($pitch->id, $to_publish)) {
                            $to_publish[] = $pitch->id;
                            $to_send[$pitch->id] = $pitch;
                        }
                    }
                }

                $nonTimedUsers = UserRepository::getNoneTimedJournalists();
                $timedUsers = UserRepository::getTimedJournalists($number);
                $allFirstUsers = $nonTimedUsers->merge($timedUsers);
                $this->sendDailyMail($allFirstUsers);

                foreach ($to_send as $pitch) {
                    $pitch->user->notify(new PitchSent($pitch));
                }

                $date = date('Y-m-d 05:00:00');
                $no_matches = PitchRepository::getNotMatched($date, $to_publish);

                foreach ($no_matches as $pitch) {
                    $pitch->user->notify(new NoPitchMatches());

                    $to_publish[] = $pitch->id;
                }

                break;
            case '08:00:00':
                $timedUsers = UserRepository::getTimedJournalists($number);
                $this->sendDailyMail($timedUsers);

                break;
            case '11:00:00':
                $timedUsers = UserRepository::getTimedJournalists($number);
                $this->sendDailyMail($timedUsers);

                break;
            case '14:00:00':
                $users = UserRepository::getJournalists();
                $to_publish = [];
                $to_send = [];

                foreach ($users as $user) {
                    $pitches = PitchRepository::getForJournalistDaily($user);

                    foreach ($pitches as $pitch) {
                        if (!in_array($pitch->id, $to_publish)) {
                            $to_publish[] = $pitch->id;
                            $to_send[$pitch->id] = $pitch;
                        }
                    }
                }

                $timedUsers = UserRepository::getTimedJournalists($number);
                $this->sendDailyMail($timedUsers);

                $date = date('Y-m-d 05:00:00');
                $no_matches = PitchRepository::getNotMatched($date, $to_publish);

                foreach ($no_matches as $pitch) {
                    $to_publish[] = $pitch->id;
                }

                PitchRepository::publish($to_publish);

                break;
        }
	}

	protected function sendDailyMail($users) {
        foreach ($users as $user) {
            $pitches = PitchRepository::getForJournalistDaily($user);
            $pitchesId = $pitches->pluck('id')->toArray();

            if (count($pitches)) {
                $user->notify(new JournalistDailyEmail($pitches, $user));
                echo $user->id.PHP_EOL;
            }
            foreach ($pitchesId as $id) {
                $pitchLog = new PitchLog();
                $pitchLog->user_id = $user->id;
                $pitchLog->pitch_id = $id;
                $pitchLog->save();
            }
        }
    }
}
