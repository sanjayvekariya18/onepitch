<?php

namespace App\Console\Commands;

use App\Models\Pitch;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SomeChangesCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mail:some_changes';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Some changes before senf';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        DB::table('pitches')
            ->where('status', Pitch::STATUS_PUBLISHED)
            ->where('sent_at', null)->update(['status' => Pitch::STATUS_UPCOMING]);

        return 1;
    }
}
