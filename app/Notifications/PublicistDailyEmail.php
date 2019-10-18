<?php

namespace App\Notifications;

use App\Repositories\InquiryRepository;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class PublicistDailyEmail extends Notification implements ShouldQueue
{
    use Queueable;

    protected $inquiries;
    protected $user;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($inquiries, $user)
    {
        $this->inquiries = $inquiries;
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
        $inquiries = [];
        $inquiry_ids = [];
        foreach ($this->inquiries as $inquiry) {
            $tmp = [];
            $tmp['indstrs_data'] = $inquiry->listUserIndustriesAndTopics($this->user);
            $tmp['user'] = $inquiry->user;
            $subjectsArr[] = $inquiry->subject;
            $tmp['inquiry'] = $inquiry;
            $tmp['event'] = $inquiry->event;
            $inquiries[] = $tmp;
            $inquiry_ids[] = $inquiry->id;
        }

        if ($inquiry_ids) {
            InquiryRepository::markSent($inquiry_ids);
        }

        $subjects = array_slice($subjectsArr, 0, 3);

        return (new MailMessage)
            ->subject('[OnePitch] ' . implode(", ",$subjects))
            ->view('emails.publicist-daily-email', [
                'inquiries' => $inquiries,
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
