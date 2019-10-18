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
                How LUCI Cut Through The VR Clutter
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
                                    Mentions tech behind product.
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
                                    Mentions keywords such as the tech involved along with “new” and includes a secondary link for reference.
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
                                    Uses well known name of partner, and offers more info available upon request.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="disco_wrap">
                <div class="img_wrap">
                    {{HTML::image('/images/featured-pitch-november.png', '', ['class' => 'desktop'])}}
                    {{HTML::image('/images/featured-pitch-november.png', '', ['class' => 'mobile'])}}
                </div>
            </div>
            <div class="submit-wrapper final">
                <a target="_blank" href="{{$is_logged ? route('pitch_what', ['pitch_id' => 'create'])  : route('signup_select_role')}}" class="btn btn-white-ylw btn-submit submitter">Create a Pitch</a>
            </div>
        </div>
    </div>
@endsection