@extends('layouts.landing', [
    'with_header' => true,
])

@section('title', 'Journalist Support Center - OnePitch')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
    <div class="faq_page" id="faq_page">
        <div class="page_header">
            <div class="page_title">
                Journalist Support Center
            </div>
            <div class="line_separator"></div>
            <div class="bottom_text">
                Need something answered that you can’t find here, <a href="{{config('mail.site')}}contact">contact us!</a>
            </div>
        </div>
        <div class="page_content">
            <div class="text_section no_border" id="journalist">
                <div class="section_body">
                    <div class="section_body_title">
                        BRAND INDEX
                    </div>
                    <div class="section_body_text">
                        <ol>
                            <li>
                                Click Brand Index at the top of your OnePitch profile dashboard.
                            </li>
                            <li>
                                Use the search bar to find sources based on keywords, brand names, names of companies, or names of contacts.
                            </li>
                            <li>
                                Click the drop down menu for industry or topic to filter specific companie who can be a source in this space.
                            </li>
                            <li>
                                Once you’ve found an ideal source, click any of the icons beneath the contact name and company name including Twitter, LinkedIn, phone and email to contact.
                            </li>
                        </ol>
                    </div>
                    <div class="row section video-section">
                        <div class="embed-responsive embed-responsive-16by9">
                            {!! processVimeoUrl('https://vimeo.com/301694596/f7e6e5b2cc')->html !!}
                        </div>
                    </div>

                    <div class="section_body_title">
                        SUBSCRIBE TO PITCHES
                    </div>
                    <div class="section_body_text">
                        If your pitch needs to be edited, either:
                        <ol>
                            <li>
                                Head to your OnePitch profile dashboard and click SUBSCRIBE TO PITCHES at the top of your profile, or find the pencil icon to the right of Subscribe to Pitches at the bottom of your OnePitch profile dashboard.
                            </li>
                            <li>
                                To update, or select, the specific topics related to an industry, click on the industry, and proceed to the topic selection page.
                                <br><br>
                                NOTE: If you’ve already made topic selections, the most recent topics will be displayed as a quick selection option.
                            </li>
                            <li>
                                Once your topic selections are complete, click 'NEXT' at the bottom of the page.
                            </li>
                        </ol>
                    </div>
                    <div class="row section video-section">
                        <div class="embed-responsive embed-responsive-16by9">
                            {!! processVimeoUrl('https://vimeo.com/301696932/8aac610159')->html !!}
                        </div>
                    </div>
                    <div class="row section video-section" style="padding-top: 0">
                        <div class="embed-responsive embed-responsive-16by9">
                            {!! processVimeoUrl('https://vimeo.com/301696416/04446ff0e5')->html !!}
                        </div>
                    </div>

                    <div class="section_body_title">
                        RESPOND TO PITCHES
                    </div>
                    <div class="section_body_text">
                        Option 1 - OnePitch Daily Email:
                        <br>
                        At the end of each publicists' pitch within the daily email there is a link to “Email Publicist” to pursue the pitch opportunity. You can click the link and an email will auto-populate. No need to log back into OnePitch or anything annoying like that.
                    </div>
                    <div class="text-center">
                        {{HTML::image('/img/support-center/faq-save-pitch.png', '', ['width' => '40%'])}}
                    </div>
                    <div class="section_body_text">
                        Option 2 - Saved Pitch Log:
                        <br>
                        Beneath each pitch in your daily email, click SAVE PITCH to save pitches within your OnePitch profile dashboard. Once your pitch is saved you can view and respond to it directly from your profile.
                    </div>
                    <div class="row section video-section">
                        <div class="embed-responsive embed-responsive-16by9">
                            {!! processVimeoUrl('https://vimeo.com/301697818/daf283c42f')->html !!}
                        </div>
                    </div>
                    <div class="section_body_text">
                        Option 3 - Pitch History Log: 
                        <br>
                        From your OnePitch profile dashboard find your Pitch History Log which lists each pitch you’ve received in your daily email.
                    </div>
                    <div class="row section video-section">
                        <div class="embed-responsive embed-responsive-16by9">
                            {!! processVimeoUrl('https://vimeo.com/301695779/0b4f73374b')->html !!}
                        </div>
                    </div>

                    <div class="section_body_title">
                        CHOOSE WHEN TO RECEIVE PITCHES
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
                            {!! processVimeoUrl('https://vimeo.com/301695373/a0f0e35756')->html !!}
                        </div>
                    </div>

                    <div class="section_body_title">
                        CREATE & EDIT INQUIRY
                    </div>
                    <div class="section_body_text">
                        <ol>
                            <li>
                                Start by clicking "CREATE NEW INQUIRY" to specify your inquiry, your publication/outlet, and a link if you'd like.
                            </li>
                            <li>
                                Next explain what information you want, and need, in order to create your story. 
                            </li>
                            <li>
                                The last step is categorizing your inquiry by topic and industry related to your ideal source.
                            </li>
                        </ol>
                    </div>
                    <div class="row section video-section">
                        <div class="embed-responsive embed-responsive-16by9">
                            {!! processVimeoUrl('https://vimeo.com/301698052/751c8b0505')->html !!}
                        </div>
                    </div>

                    <div class="section_body_title">
                        AFTER YOU SUBMIT...
                    </div>
                    <div class="section_body_text">
                        Once a Publicist receives your inquiry in their daily email, they’ll get in touch if they’re interested in pursuing. It’s that simple. All daily emails are sent out at 5am PST onward.
                    </div>
                    <div class="text-center">
                        {{HTML::image('/img/support-center/faq-inquiry-approved.png', '', ['width' => '40%'])}}
                    </div>

                    <div class="section_body_title">
                        EDIT PROFILE INFO
                    </div>
                    <div class="section_body_text">
                        Option 1 - Drop down menu - Click the drop down menu in the upper right corner next to your profile photo
                    </div>
                    <div class="row section video-section">
                        <div class="embed-responsive embed-responsive-16by9">
                            {!! processVimeoUrl('https://vimeo.com/301695373/a0f0e35756')->html !!}
                        </div>
                    </div>
                    <div class="section_body_text">
                        Option 2 - Navigation menu - Click the navigation menu in the upper left corner of the page.
                    </div>
                    <div class="row section video-section">
                        <div class="embed-responsive embed-responsive-16by9">
                            {!! processVimeoUrl('https://vimeo.com/301695624/eb962b1abe')->html !!}
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