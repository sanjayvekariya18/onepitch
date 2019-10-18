@extends('layouts.landing', [
'with_header' => true,
])

@section('title', 'Support Center - OnePitch')

@section('canonical')
{{ URL::current() }}
@stop

@section('content')
<div class="faq_page" id="faq_page">
    <div class="page_header">
        <div class="page_title">
            Publicist Support Center
        </div>
        <div class="line_separator"></div>
        <div class="bottom_text">
            Need something answered that you can’t find here, <a href="{{config('mail.site')}}contact">contact us!</a>
        </div>
    </div>
    <div class="page_content">
        <div class="content_header">
        <div class="text_section no_border" id="publicist">
            <div class="section_body">
                <div class="section_body_title">
                    CREATE & EDIT PITCH
                </div>
                <div class="section_body_text">
                    <ol>
                        <li>
                            Start by clicking CREATE NEW PITCH.
                        </li>
                        <li>
                            Specify the subject of your pitch, WHO you are pitching (brand or source?), provide a link, and attach a press release or supporting doc.
                        </li>
                        <li>
                            Then tell them WHAT you are pitching in sentence or two.
                        </li>
                        <li>
                            Explain WHY your pitch is important and prove it with supporting facts and data.
                        </li>
                        <li>
                            Finally, categorize your pitch by topic and industry related to your ideal source.
                        </li>
                    </ol>
                </div>
                <div class="row section video-section">
                    <div class="embed-responsive embed-responsive-16by9">
                        {!! processVimeoUrl('https://vimeo.com/301701710/d36be298ee')->html !!}
                    </div>
                </div>

                <div class="section_body_title">
                    CREATE PITCH (SCREENSHOTS)
                </div>
                <div class="section_body_text">
                    On the WHO page of the pitch upload, you can now include a press release, and 2 file attachments along with your pitch.
                </div>
                <div class="text-center">
                    {{HTML::image('/img/support-center/faq-press-release.png', '', ['width' => '40%'])}}
                </div>
                <div class="section_body_text">
                    Tell them WHAT you're pitching. Media don’t want to read a novel, nor do they like your fUnky FORmatting. Give it your best shot.
                </div>
                <div class="text-center">
                    {{HTML::image('/img/support-center/faq-what.png', '', ['width' => '80%'])}}
                </div>
                <div class="section_body_text">
                    Explain WHY your pitch is worth caring about. Media are already professionals in their space. Make sure to tell them something they don’t know and provide data points to validate.
                </div>
                <div class="text-center">
                    {{HTML::image('/img/support-center/faq-why.png', '', ['width' => '60%'])}}
                </div>

                <div class="section_body_title">
                    AFTER YOU SUBMIT...
                </div>
                <div class="section_body_text">
                    Once a Journalist receives your pitch in their daily email, they’ll get in touch if they’re interested in pursuing. It’s that simple. All daily emails are sent out at 5am PST onward.
                </div>
                <div class="text-center">
                    {{HTML::image('/img/support-center/faq-pitch-approved.png', '', ['width' => '40%'])}}
                </div>

                <div class="section_body_title">
                    EDIT & DELETE PITCH
                </div>
                <div class="section_body_text">
                    If your pitch needs to be edited, either:
                    <ol>
                        <li>
                            Head to your Pitch Log and click the specific pitch you want to update, or delete.
                        </li>
                        <li>
                            If your pitch has been confirmed, find the confirmation email and click EDIT PITCH. You’ll be taken to the specific pitch within your Pitch Log.
                        </li>
                    </ol>
                </div>
                <div class="text-center">
                    {{HTML::image('/img/support-center/faq-pitch-confirm.png', '', ['width' => '40%'])}}
                </div>

                <div class="section_body_title">
                    PITCH METRICS
                </div>
                <div class="section_body_text">
                    After your pitch has been sent, locate the column in your pitch log to view the number of recipients, opens, views by outlet, clicks, and responses.
                </div>
                <div class="text-center">
                    {{HTML::image('/img/support-center/faq-pitch-responses.png', '', ['width' => '60%'])}}
                </div>

                <div class="section_body_title">
                    SUBSCRIBE TO INQUIRY
                </div>
                <div class="section_body_text">
                    If your pitch needs to be edited, either:
                    <ol>
                        <li>
                            Click the "Subscribe to Inquiry" button in your profile, or click the pencil icon next to "Industries and Topics." 
                        </li>
                        <li>
                            To update, or select, the specific topics related to an industry, click on the industry, and proceed to the topic selection page.
                        </li>
                        <li>
                            To update, or select, the specific topics related to an industry, click on the industry, and proceed to the topic selection page.
                            <br><br>
                            NOTE: If you’ve already made topic selections, the most recent topics will be displayed as a quick selection option.
                        </li>
                        <li>
                            Once your topic selections are complete, click ‘NEXT’ at the bottom of the page.
                        </li>
                    </ol>
                </div>
                <div class="row section video-section">
                    <div class="embed-responsive embed-responsive-16by9">
                        {!! processVimeoUrl('https://vimeo.com/301704597/c93dc74642')->html !!}
                    </div>
                </div>
                <div class="row section video-section" style="padding-top: 0">
                    <div class="embed-responsive embed-responsive-16by9">
                        {!! processVimeoUrl('https://vimeo.com/301705351/7e00d445ff')->html !!}
                    </div>
                </div>

                <div class="section_body_title">
                    RESPOND TO INQUIRIES
                </div>
                <div class="section_body_text">
                    Option 1 - OnePitch Daily Email:
                    <br>
                    At the end of each journalists’ inquiry within the daily email there is a link to the Email Journalist directly.
                </div>
                <div class="text-center">
                    {{HTML::image('/img/support-center/faq-save-inquiry.png', '', ['width' => '40%'])}}
                </div>
                <div class="section_body_text">
                    Option 2 - Saved Inquiry Log:
                    <br>
                    Beneath each inquiry in your daily email, click SAVE INQUIRY to save inquiries within your OnePitch profile dashboard which you can view and respond to directly from your profile.
                </div>
                <div class="row section video-section">
                    <div class="embed-responsive embed-responsive-16by9">
                        {!! processVimeoUrl('https://vimeo.com/301704377/c930cb410d')->html !!}
                    </div>
                </div>
                <div class="section_body_text">
                    Option 3 - Inquiry History Log: 
                    <br>
                    Head to your OnePitch profile dashboard and find your Inquiry History Log which lists each inquiry you’ve received in your daily email.
                </div>
                <div class="row section video-section">
                    <div class="embed-responsive embed-responsive-16by9">
                        {!! processVimeoUrl('https://vimeo.com/301703575/a587673efe')->html !!}
                    </div>
                </div>

                <div class="section_body_title">
                    CHOOSE WHEN TO RECEIVE INQUIRIES
                </div>
                <div class="section_body_text">
                    <ol>
                        <li>
                            Head to your profile navigation menu (upper right corner) and click Edit Profile.
                        </li>
                        <li>
                            Scroll to the bottom and find Daily Mail Time Settings. 
                        </li>
                        <li>
                            Select your preferred time zone and time, and click SAVE CHANGES.
                        </li>
                    </ol>
                </div>
                <div class="row section video-section">
                    <div class="embed-responsive embed-responsive-16by9">
                        {!! processVimeoUrl('https://vimeo.com/301703878/3c741ef202')->html !!}
                    </div>
                </div>

                <div class="section_body_title">
                    BRAND INDEX
                </div>
                <div class="section_body_text">
                    To Add New Brand: Click Add New Brand at the top of your OnePitch profile dashboard. From there fill out the required fields including name, website, location, industries and topics.
                </div>
                <div class="text-center">
                    {{HTML::image('/img/support-center/faq-upload-brand.png', '', ['width' => '40%'])}}
                </div>
                <div class="section_body_text">
                    To Edit: Locate the Brand Index on your OnePitch profile dashboard and click the name of the brand.
                </div>
                <div class="row section video-section">
                    <div class="embed-responsive embed-responsive-16by9">
                        {!! processVimeoUrl('https://vimeo.com/301703426/96bb50dd24')->html !!}
                    </div>
                </div>

                <div class="section_body_title">
                    EDIT PROFILE INFO
                </div>
                <div class="section_body_text">
                    Option 1 - Drop down menu - Click the drop down menu in the upper right corner next to your profile photo.
                </div>
                <div class="row section video-section">
                    <div class="embed-responsive embed-responsive-16by9">
                        {!! processVimeoUrl('https://vimeo.com/301703878/3c741ef202')->html !!}
                    </div>
                </div>
                <div class="row section video-section" style="padding-top: 0">
                    <div class="embed-responsive embed-responsive-16by9">
                        {!! processVimeoUrl('https://vimeo.com/301704143/b81358f626')->html !!}
                    </div>
                </div>
                <div class="section_body_text">
                    Option 2 - Navigation menu - Click the navigation menu in the upper left corner of the page.
                </div>
                <div class="row section video-section">
                    <div class="embed-responsive embed-responsive-16by9">
                        {!! processVimeoUrl('https://vimeo.com/301704143/b81358f626')->html !!}
                    </div>
                </div>

                <div class="section_body_title">
                    REFERRAL CODE
                </div>
                <div class="section_body_text">
                    Find your shareable referral link code on the left side of your OnePitch profile dashboard icons.
                </div>
                <div class="row section video-section">
                    <div class="embed-responsive embed-responsive-16by9">
                        {!! processVimeoUrl('https://vimeo.com/301704296/992662e148')->html !!}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="arrow_to_top" onClick="common.scrollTo()">
    <div class="arrow_wrap">
        <div class="arrow_up"></div>
        <div class="arrow_stick"></div>
    </div>
    TOP
</div>
@endsection