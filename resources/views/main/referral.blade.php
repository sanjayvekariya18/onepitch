@extends('layouts.landing', [
    'with_header' => true,
])

@section('title', 'Refer - OnePitch')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
<div class="faq_page referral_page">
    <div class="page_header">
        <div class="page_title">
            More pitches=your riches
        </div>
        <div class="bottom_text">
            Win cash for helping spread the word about OnePitch
        </div>
        <div class="submit-wrapper">
            <a href="{{$is_logged ? route('profile') : route('signup_select_role')}}" class="btn btn-white-ylw btn-submit submitter">join the free beta!</a>
        </div>
        <div class="arrow_wrap">
            {{HTML::image('/images/page-1.png')}}
        </div>
    </div>
    <div class="page_content">
        <div class="disco_wrap">
            <div class="img_wrap">
                {{HTML::image('/images/discohand.png', '', ['class' => 'desktop'])}}
                {{HTML::image('/images/discohand_small.png', '', ['class' => 'mobile'])}}
            </div>
            <div class="desc">
                <div>
                    <div class="dot"></div>
                    Get the chance to win $100 every month for referring your PR and journalists friends to OnePitch.
                </div>
                <div>
                    <div class="dot"></div>
                    We'll randomly select one winner monthly and announce the lucky duck winner on our social channels. One referral=One entry to win.
                </div>
                <div class="big">
                    <div class="dot"></div>
                   Questions? See our <a href="{{route('faq')}}">FAQ page</a>
                </div>
                <div>
                    <div class="dot"></div>
                    Hey, even if you don't win, you're helping people #quitbitchingaboutpitching
                </div>
            </div>
        </div>
        <div class="steps">
            <div class="block_header">
                <div class="top_title">
                    It’s as easy as 1, 2, 3!
                </div>
                <div class="bottom_title">
                    (No, seriously.)
                </div>
            </div>
            <div class="steps_wrap">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="step_block">
                            <div class="number_block small">
                                1
                                <div class="dot"></div>
                            </div>
                            <div class="top_text">
                                sign up
                            </div>
                            <div class="bottom_text">
                                Read the rules and agree to the terms. (The lawyers made us say that.)
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
                                Get
                            </div>
                            <div class="bottom_text">
                                Receive your unique referral link to share with PR and journalist friends.
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
                                refer
                            </div>
                            <div class="bottom_text">
                                Refer your PR and journalist friends! Each new user for us gets you one more entry for the monthly sweet sweepstakes.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="submit-wrapper">
                <a href="{{$is_logged ? route('profile') : route('signup_select_role')}}" class="btn btn-white-ylw btn-submit submitter">join the free beta!</a>
            </div>
        </div>
    </div>
</div>
@endsection