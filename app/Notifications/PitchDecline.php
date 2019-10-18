<?php

namespace App\Notifications;

use App\Models\Pitch;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class PitchDecline extends Notification implements ShouldQueue
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
		return (new MailMessage)
			->subject('Your Pitch Has Been Declined')
			->view('emails.declined-pitch', [
				'pitch' => $this->pitch,
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
