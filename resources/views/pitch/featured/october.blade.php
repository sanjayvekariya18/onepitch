@extends('layouts.landing', [
    'with_header' => true,
])

@section('title', 'Featured Pitch - OnePitch')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
    <div class="faq_page referral_page featured-post">
        <div class="page_header">
            <div class="page_title">
                Pitch Like This
            </div>
            <div class="bottom_text">
                How Aventus Cut Through The Blockchain Clutter
            </div>
            <div class="submit-wrapper">
                <a target="_blank" href="{{$is_logged ? route('pitch_what', ['pitch_id' => 'create'])  : route('signup_select_role')}}" class="btn btn-white-ylw btn-submit submitter">Create a Pitch</a>
            </div>
            <div class="arrow_wrap">
                {{HTML::image('/images/page-1.png')}}
            </div>
        </div>
        <div class="page_content">
            <div class="steps">
                <div class="block_header">
                    <div class="top_title">
                        Why This Pitch Worked
                    </div>
                    <div class="bottom_title">
                        (Key Takeaways)
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
                                    Subject line
                                </div>
                                <div class="bottom_text">
                                    Clearly identifies what the pitch is about.
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
                                    WHAT
                                </div>
                                <div class="bottom_text">
                                    Highlights technology (keyword) used and purpose of service.
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
                                    WHY
                                </div>
                                <div class="bottom_text">
                                    Identifies problem and solution the service helps solve.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="disco_wrap">
                <div class="img_wrap">
                    {{HTML::image('/images/featured-pitch-october.png', '', ['class' => 'desktop'])}}
                    {{HTML::image('/images/featured-pitch-october.png', '', ['class' => 'mobile'])}}
                </div>
            </div>
            <div class="submit-wrapper final">
                <a target="_blank" href="{{$is_logged ? route('pitch_what', ['pitch_id' => 'create'])  : route('signup_select_role')}}" class="btn btn-white-ylw btn-submit submitter">Create a Pitch</a>
            </div>
        </div>
    </div>
@endsection