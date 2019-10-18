@extends('layouts.landing', [
    'with_header' => true,
])

@section('title', 'FAQ - OnePitch')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
<div class="faq_page" id="faq_page">
    <div class="page_header">
        <div class="page_title">
            Frequently Asked Questions
        </div>
        <div class="line_separator"></div>
        <div class="bottom_text">
            Need something answered that you can’t find here, <a href="{{config('mail.site')}}contact">contact us!</a>
        </div>
    </div>
    <div class="page_content">
        <div class="content_header">
            <div class="nav_blocks">
                <div class="nav_block empty">
                    JUMP TO
                </div>
                @foreach($faqCategories as $faqCategory)
                    <div class="nav_block @if($loop->first) active @endif" onClick="common.scrollTo('{{$faqCategory->slug}}')">
                        {{$faqCategory->name}}
                    </div>
                @endforeach
            </div>
        </div>
        @foreach($faqCategories as $faqCategory)
            <div class="text_section @if($loop->last) no_border @endif" id="{{$faqCategory->slug}}">
                <div class="section_header">
                    {{ucfirst($faqCategory->slug)}}

                    @if($faqCategory->slug == 'publicist')
                        @if(Auth::check() && Auth::user()->role == App\Models\User::ROLE_PUBLICIST)
                            <a href="{{ route('publicist_support_center') }}"
                               class="btn btn-white-ylw" style="height: 50px;line-height: 50px;float: right">Support Center</a>
                        @endif
                    @endif

                    @if($faqCategory->slug == 'journalist')
                        @if(Auth::check() && Auth::user()->role == App\Models\User::ROLE_JOURNALIST)
                            <a href="{{ route('journalist_support_center') }}"
                               class="btn btn-white-ylw" style="height: 50px;line-height: 50px;float: right">Support Center</a>
                        @endif
                    @endif

                </div>
                <div class="section_body">
                    @foreach($faqCategory->faqs as $faq)
                        <div class="section_body_title">
                            {{$faq->question}}
                        </div>
                        <div class="section_body_text">
                            {!! $faq->answer !!}
                        </div>
                    @endforeach
                </div>
            </div>
        @endforeach
    </div>
    <div class="arrow_to_top" onClick="common.scrollTo()">
        <div class="arrow_wrap">
            <div class="arrow_up"></div>
            <div class="arrow_stick"></div>
        </div>
        TOP
    </div>
</div>
@endsection