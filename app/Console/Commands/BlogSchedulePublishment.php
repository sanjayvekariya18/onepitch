<?php

namespace App\Console\Commands;

use App\Models\BlogPost;
use Carbon\Carbon;
use Illuminate\Console\Command;

class BlogSchedulePublishment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'blog:publish_scheduled';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Publish all blogs with scheduled date';

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
        $blogs = BlogPost::where('status', BlogPost::STATUS_SCHEDULED)->limit(5)->get();
        $dateNow = Carbon::now();

        foreach ($blogs as $blog) {
            if (!empty($blog->published_at) && $blog->published_at->lessThanOrEqualTo($dateNow)) {
                $blog->status = BlogPost::STATUS_UPCOMING;
                $blog->save();
            }
        }

        return 1;
    }
}
