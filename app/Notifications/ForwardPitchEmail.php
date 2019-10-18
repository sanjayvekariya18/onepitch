<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ForwardPitchEmail extends Notification implements ShouldQueue
{
    use Queueable;

    protected $from;
	protected $mail;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($from, $mail)
    {
        $this->from = $from;
        $this->mail = $mail;
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
    	$from = $this->from;
    	$mail = $this->mail;

    	$email = (new MailMessage)
			->subject(isset($mail['subject']) ? $mail['subject'] : 'Your OnePitch Daily Email')
			->replyTo($from)
			->view('emails.custom', [
				'body' => $mail['body_html']
			]);

    	if (isset($mail['attachment'])) {
			foreach ($mail['attachment'] as $attachment) {
				$email->attachData(base64_decode($attachment['body']), $attachment['name'], ['content-type' => $attachment['content-type']]);
			}
		}

		return $email;
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
