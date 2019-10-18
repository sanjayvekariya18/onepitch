@extends('layouts.landing', [
'with_header' => true,
])

@section('title', 'Sign Up - OnePitch')

@section('canonical')
{{ URL::current() }}
@stop

@section('content')
<div class="faq_page referral_page">
    <div class=" row register-3">
        <div class="col-md-offset-3 col-md-4">
            <div class="intro-text">
                <h2>
                    START PITCHING SMARTER
                </h2>
                <p class="first">
                    It's time to quit bitching about pitching. <br/>
                </p>

                <p class="second hidden-sm hidden-xs">
                    OnePitch uses industry-specific pitch templates to help PR professionals and marketers clearly articulate why their pitch is important to a journalist's audience and distributes the message to tech journalists based on the pitch topic.
                </p>
            </div>

        </div>
        <div class="col-md-offset-1 col-md-3 action-card-space">
            <div class="action-card">
                <h3 class="text-center">Hey there, savvy publicist!</h3>
                <hr class="small" />
                <h4 class="section-head text-center m-b-32">Let’s set up your free account.</h4>

                <a href="{{ route('auth_social_redirect', ['driver' => 'twitter']) }}?signup={{ \App\Models\User::ROLE_PUBLICIST }}&hear_about=Twitter"
                   class="btn btn-white-ylw twitter m-b-32">Sign up with twitter</a>
                <a href="{{ route('auth_social_redirect', ['driver' => 'linkedin']) }}?signup={{ \App\Models\User::ROLE_PUBLICIST }}&hear_about=Twitter" class="btn btn-white-ylw linkedin">Sign up with linkedin</a>
            </div>
        </div>
        <div class="col-md-1">

        </div>
    </div>

    <div class="page_content">
        <div class="steps">
            <div class="steps_wrap">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="step_block">
                            <div class="number_block small">
                                1
                                <div class="dot"></div>
                            </div>
                            <div class="top_text">
                                UPLOAD
                            </div>
                            <div class="bottom_text">
                                Upload a pitch using our journalist-approved template.
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="step_block">
                            <div class="number_block">
                                2
                                <div class="dot"></div>
                            </div>
                            <div class="top_text">
                                TARGET
                            </div>
                            <div class="bottom_text">
                                Our technology reviews each pitch and match it with the most ideal journalist.
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="step_block">
                            <div class="number_block">
                                3
                                <div class="dot"></div>
                            </div>
                            <div class="top_text">
                                SIT BACK
                            </div>
                            <div class="bottom_text">
                                Opted-in journalists get your pitch and contact you to be a source for their articles.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection