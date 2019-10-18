<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TestMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $template;
    protected $params;

    /**
     * TestMail constructor.
     * @param $template
     * @param array $params
     */
    public function __construct($template, array $params = [])
    {
        $this->template = $template;
        $this->params = $params;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view($this->template, $this->params);
    }
}
