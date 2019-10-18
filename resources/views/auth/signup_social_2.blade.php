@extends('layouts.landing', [
    'with_header' => true,
    'header_classes' => ['yellow', 'fixed'],
])

@section('title', 'Sign Up - OnePitch')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
    <div class="faq_page referral_page">
        <div class="row register-2">
            <div class="col-md-offset-1 col-md-10">
                <div class="header-card">
                    <h2>
                        #QuitBitchingAboutPitching
                    </h2>

                    <div class="buttons-group m-b-56 hidden-lg hidden-md">
                        <a href="{{ route('auth_social_redirect', ['driver' => 'twitter']) }}?signup={{ \App\Models\User::ROLE_PUBLICIST }}&hear_about={{ $hear_about }}"
                           class="btn btn-white-ylw twitter">Sign up with twitter</a>
                        <a href="{{ route('auth_social_redirect', ['driver' => 'linkedin']) }}?signup={{ \App\Models\User::ROLE_PUBLICIST }}&hear_about={{ $hear_about }}" class="btn btn-white-ylw linkedin">Sign up with linkedin</a>
                    </div>
                </div>

                <div class="button-card">
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
                                                Our technology reviews each pitch and matches it with the most ideal journalist.
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
                                                Opted-in journalists receive your pitch and contact you as a source for their articles.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-image">
                        <img src="/img/social-auth/desktop-screens.png" alt="">
                    </div>
                    <div class="buttons-group m-b-56">
                        <a href="{{ route('auth_social_redirect', ['driver' => 'twitter']) }}?signup={{ \App\Models\User::ROLE_PUBLICIST }}&hear_about={{ $hear_about }}"
                           class="btn btn-white-ylw twitter">Sign up with twitter</a>
                        <a href="{{ route('auth_social_redirect', ['driver' => 'linkedin']) }}?signup={{ \App\Models\User::ROLE_PUBLICIST }}&hear_about={{ $hear_about }}" class="btn btn-white-ylw linkedin">Sign up with linkedin</a>
                    </div>
                </div>
            </div>
            <div class="col-md-1">
            </div>
        </div>
    </div>
@endsection