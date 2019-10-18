<?php

namespace App\Notifications;

use App\Models\Inquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class InquiryConfirmReminder extends Notification implements ShouldQueue
{
    use Queueable;

    protected $inquiry;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Inquiry $inquiry)
    {
        $this->inquiry = $inquiry;
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
        $indstrs_data = $this->inquiry->listIndustriesAndTopics();
        $user = $this->inquiry->user;

        return (new MailMessage)
            ->subject('Reminder: Please Confirm Your Inquiry')
            ->view('emails.confirm-inquiry-reminder', [
                'inquiry' => $this->inquiry,
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
