<?php

namespace App\Notifications;

use App\Repositories\PitchRepository;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class JournalistDailyEmail extends Notification implements ShouldQueue
{
    use Queueable;

	protected $pitches;
	protected $user;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($pitches, $user)
    {
        $this->pitches = $pitches;
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
    	$pitches = [];
    	$pitch_ids = [];
    	foreach ($this->pitches as $pitch) {
    		$tmp = [];
			$tmp['indstrs_data'] = $pitch->listUserIndustriesAndTopics($this->user);
			$tmp['user'] = $pitch->user;
			$subjectsArr[] = $pitch->subject;
			$tmp['pitch'] = $pitch;
			$tmp['event'] = $pitch->event;
			$pitches[] = $tmp;
			$pitch_ids[] = $pitch->id;
		}

		if ($pitch_ids) {
			PitchRepository::markSent($pitch_ids);
		}

        $subjects = array_slice($subjectsArr, 0, 3);

		return (new MailMessage)
			->subject('[OnePitch] ' . implode(", ",$subjects))
			->view('emails.journalist-daily-email', [
				'pitches' => $pitches,
                'user' => $this->user,
			]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
