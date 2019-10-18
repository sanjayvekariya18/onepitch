<?php

namespace App\Console\Commands;

use App\Models\Inquiry;
use App\Models\InquiryLog;
use App\Notifications\PublicistDailyEmail;
use App\Notifications\NoInquiryMatches;
use App\Notifications\InquirySent;
use App\Repositories\InquiryRepository;
use App\Repositories\User\UserRepository;
use Illuminate\Console\Command;

class PublicistDailyEmailCron extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mail:publicist_daily {number?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publicist daily emails sender';

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
                $users = UserRepository::getPublicists();
                $to_publish = [];
                $to_send = [];
                foreach ($users as $user) {
                    $inquiries = InquiryRepository::getForPublicistDaily($user);
                    foreach ($inquiries as $inquiry) {
                        if (!$inquiry->mailnuggets_id) {
                            $mailnuggets = new \mailNuggets();
                            $resp = $mailnuggets->addThrowaway();
                            $xml = simplexml_load_string($resp);

                            if (isset($xml->throwaway->name)) {
                                $inquiry->mailnuggets_id = getMailnuggetsEmail($xml->throwaway->name);
                                $inquiry->save();
                            }
                        }

                        if (!in_array($inquiry->id, $to_publish)) {
                            $to_publish[] = $inquiry->id;
                            $to_send[$inquiry->id] = $inquiry;
                        }
                    }
                }

                $nonTimedUsers = UserRepository::getNoneTimedPublicists();
                $timedUsers = UserRepository::getTimedPublicists($number);
                $allFirstUsers = $nonTimedUsers->merge($timedUsers);
                $this->sendDailyMail($allFirstUsers);

                foreach ($to_send as $inquiry) {
                    $inquiry->user->notify(new InquirySent($inquiry));
                }

                $date = date('Y-m-d 05:00:00');
                $no_matches = InquiryRepository::getNotMatched($date, $to_publish);

                foreach ($no_matches as $inquiry) {
                    $inquiry->user->notify(new NoInquiryMatches());

                    $to_publish[] = $inquiry->id;
                }

                break;
            case '08:00:00':
                $timedUsers = UserRepository::getTimedPublicists($number);
                $this->sendDailyMail($timedUsers);

                break;
            case '11:00:00':
                $timedUsers = UserRepository::getTimedPublicists($number);
                $this->sendDailyMail($timedUsers);

                break;
            case '14:00:00':
                $users = UserRepository::getPublicists();
                $to_publish = [];
                $to_send = [];
                foreach ($users as $user) {
                    $inquiries = InquiryRepository::getForPublicistDaily($user);
                    foreach ($inquiries as $inquiry) {
                        if (!in_array($inquiry->id, $to_publish)) {
                            $to_publish[] = $inquiry->id;
                            $to_send[$inquiry->id] = $inquiry;
                        }
                    }
                }

                $timedUsers = UserRepository::getTimedPublicists($number);
                $this->sendDailyMail($timedUsers);

                $date = date('Y-m-d 05:00:00');
                $no_matches = InquiryRepository::getNotMatched($date, $to_publish);

                foreach ($no_matches as $inquiry) {
                    $to_publish[] = $inquiry->id;
                }

                InquiryRepository::publish($to_publish);

                break;
        }
    }

    protected function sendDailyMail($users) {
        foreach ($users as $user) {
            $inquiries = InquiryRepository::getForPublicistDaily($user);
            $inquiriesId = $inquiries->pluck('id')->toArray();

            if (count($inquiries)) {
                $user->notify(new PublicistDailyEmail($inquiries, $user));
                echo $user->id.PHP_EOL;
            }
            foreach ($inquiriesId as $id) {
                $inquiryLog = new InquiryLog();
                $inquiryLog->user_id = $user->id;
                $inquiryLog->inquiry_id = $id;
                $inquiryLog->save();
            }
        }
    }
}
