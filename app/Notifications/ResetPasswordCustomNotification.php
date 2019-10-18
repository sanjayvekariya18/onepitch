<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordCustomNotification extends Notification implements ShouldQueue
{
	use Queueable;

    /**
     * @var string
     */
    protected $token;

    /**
     * ResetPasswordNotification constructor.
     * @param $token
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's channels.
     *
     * @param  mixed  $notifiable
     * @return array|string
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable) : MailMessage
    {
        return (new MailMessage)
			->subject('Reset Your OnePitch Account Password')
            ->view('emails.reset-password', [
                'token' => $this->token,
                'email' => urlencode($notifiable->email),
			]);
    }
}
