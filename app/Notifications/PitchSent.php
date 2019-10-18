<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use App\Models\Pitch;

class PitchSent extends Notification implements ShouldQueue
{
    use Queueable;

	protected $pitch;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
	public function __construct(Pitch $pitch)
	{
		$this->pitch = $pitch;
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
		$indstrs_data = $this->pitch->listIndustriesAndTopics();
		$user = $this->pitch->user;

		return (new MailMessage)
			->subject('Your Pitch Has Been Sent!')
			->view('emails.pitch-sent', [
				'pitch' => $this->pitch,
				'indstrs_data' => $indstrs_data,
				'user' => $user,
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
