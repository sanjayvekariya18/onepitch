@extends('layouts.landing', [
    'with_header' => true,
])

@section('title')
    {{ $blogPost->title }} - Blog - OnePitch
@stop

@section('canonical')
{{ URL::current() }}
@stop

@section('content')
<div class="blog-post faq_page terms_page">
    <div class="back not-for-sm">
        {{--<a href="{{route('blog.index')}}"><-- Back to Blogs</a>--}}
        <div class="btn-done-wrapper" style="left: 0; max-width: 200px; top: 150px;">
            <a href="{{route('blog.index')}}" class="btn save-draft"><i class="material-icons">arrow_back</i>Back to Blogs</a>
        </div>
    </div>
    <div class="page_header">
        <div class="page_title">
            {{ $blogPost->title }}
        </div>
        <div class="line_separator"></div>

    </div>
    <div class="row">
        <div class="col-md-2">
            <div class="post__social">
                <a class="share-icon twitter" target="_blank" href="https://twitter.com/intent/tweet?url={{ rawurlencode(Request::url()) }}&text={{ rawurlencode($blogPost->title) }}"><span class="fab fa-twitter"></span></a>
                <a class="share-icon linkedin" target="_blank" href="https://www.linkedin.com/shareArticle?mini=true&url={{ rawurlencode(Request::url()) }}&title={{ rawurlencode($blogPost->title) }}"><span class="fab fa-linkedin-in"></span></a>
                <a class="share-icon facebook" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u={{ rawurlencode(Request::url()) }}"><span class="fab fa-facebook-f"></span></a>
            </div>
        </div>
        <div class=" col-md-6">
            <img class="header-image" src="{{ $blogPost->featured_image }}" alt="">
            <div class="page_content">
                <div class="text_section no_border">
                    <div class="section_body">
                        @markdown($blogPost->content)
                        <div class="row content_author">
                            @if($blogPost->user_id == 35)
                                <div class="col-xs-2 image">
                                    <img src="/img/blog/cassie.jpg" alt="">
                                </div>
                                <div class="col-xs-8">
                                    <b>Cassie Gonzalez</b>
                                    <p>Cassie joined OnePitch as the first official employee. She is the Brand and Community Manager at OnePitch and handles everything from social media, to owned content, to events. She went to Colorado State University and studied Business Management with an emphasis in marketing. In her free time, she enjoys traveling, discovering new local food spots and spending time with her family.</p>
                                    <p>
                                        <span class="fa fa-envelope"></span> <a href="mailto:cassie@onepitch.co">cassie@onepitch.co</a>
                                        <br>
                                        <span class="fab fa-linkedin-in"></span> <a target="_blank" href="https://www.linkedin.com/in/cassie-gonzalez-54867949/"> Cassie Gonzalez</a>
                                        <br>
                                        <span class="fab fa-twitter"></span> <a target="_blank" href="https://twitter.com/cass_mcfrass">@cass_mcfrass</a>
                                    </p>
                                </div>
                            @elseif($blogPost->user_id == 22)
                                <div class="col-xs-2 image">
                                    <img src="/img/blog/jered.jpg" alt="">
                                </div>
                                <div class="col-xs-8">
                                    <b>Jered Martin</b>
                                    <p>Jered is the Founding Partner, COO and support manager at OnePitch. He handles operations for OnePitch; along with strategy, support, business development and hiring. He studied communications with an emphasis in marketing at Cal State University Long Beach. In his free time, he enjoys surfing, eating cheap street food, cooking and exploring the outdoors.</p>
                                    <p>
                                        <span class="fa fa-envelope"></span> <a href="mailto:jered@onepitch.co">jered@onepitch.co</a>
                                        <br>
                                        <span class="fab fa-linkedin-in"></span> <a target="_blank" href="https://www.linkedin.com/in/jered-martin-san-diego"> Jered Martin</a>
                                        <br>
                                        <span class="fab fa-twitter"></span> <a target="_blank" href="https://twitter.com/JmoMonk">@JmoMonk</a>
                                    </p>
                                </div>
                            @elseif($blogPost->user_id == 491)
                                <div class="col-xs-2 image">
                                    <img src="/img/blog/mike.jpg" alt="">
                                </div>
                                <div class="col-xs-8">
                                    <b>Mike Melvin</b>
                                    <p>Mike joined OnePitch in 2018 to lead the company's growth marketing, overseeing email, social media, SEO and web design initiatives.</p> <p>Prior to OnePitch, Mike was a director of sales and marketing at Techleus Web Design, where he oversaw business development and marketing. While at Techleus, he developed marketing campaigns for companies within various tech industries including cybersecurity, esports, information technology, and biotechnology.</p>
                                    <p>
                                        <span class="fa fa-envelope"></span> <a href="mailto:mike@onepitch.co">mike@onepitch.co</a>
                                        <br>
                                        <span class="fab fa-linkedin-in"></span> <a target="_blank" href="https://www.linkedin.com/in/michaelmelvinlinkedin/"> Mike Melvin</a>
                                        <br>
                                        <span class="fab fa-twitter"></span> <a target="_blank" href="https://twitter.com/mikeamelvin">@mikeamelvin</a>
                                    </p>
                                </div>
                            @elseif($blogPost->user_id == 1851)
                                <div class="col-xs-2 image">
                                    <img src="/img/blog/kendall.jpg" alt="Kendall Aldridge">
                                </div>
                                <div class="col-xs-8">
                                    <b>Kendall Aldridge</b>
                                    <p>Kendall joined OnePitch as an intern in January of 2019.  She is a digital marketing assistant and community manager for our different social media channels and blog.</p> <p>She is in her last semester at San Diego State University and will be graduating with a degree in Communication Studies in May 2019. In her spare time, she enjoys going to the beach, drawing, writing, and doing anything outdoors.</p>
                                    <p>
                                        <span class="fa fa-envelope"></span> <a href="mailto:kendall@onepitch.co">kendall@onepitch.co</a>
                                        <br>
                                        <span class="fab fa-linkedin-in"></span> <a target="_blank" href="https://www.linkedin.com/in/kendallaldridge"> Kendall Aldridge</a>
                                        <br>
                                        <span class="fab fa-twitter"></span> <a target="_blank" href="https://twitter.com/kenntaldridge">@kenntaldridge</a>
                                    </p>
                                </div>
                            @elseif($blogPost->user_id == 890)
                                <div class="col-xs-2 image">
                                    <img src="/img/blog/jesse.jpg" alt="">
                                </div>
                                <div class="col-xs-8">
                                    <b>Jesse Ghiorzi</b>
                                    <p>OnePitch TypeBar contributor, Jesse Ghiorzi, is the director of brand strategy at CHARGE, a marketing agency with a focus on sports and entertainment. Follow him at @jesseghiorzi to talk PR or sports.</p>
                                    <p>
                                        {{--<span class="fa fa-envelope"></span> <a href="mailto:jghiorzi@chargegf.com">jghiorzi@chargegf.com</a>--}}
                                        {{--<br>--}}
                                        <span class="fab fa-twitter"></span> <a target="_blank" href="https://twitter.com/jesseghiorzi">@jesseghiorzi</a>
                                    </p>
                                </div>
                            @elseif($blogPost->user_id == 1)
                                <div class="col-xs-2 image">
                                    <img src="/img/blog/typewriter.png" alt="OnePitch logo typewritter">
                                </div>
                                <div class="col-xs-8">
                                    <b>OnePitch Team</b>
                                    <p>
                                        <span class="fa fa-envelope"></span> <a href="{{ config('mail.from.address') }}">{{ config('mail.from.address') }}</a>
                                        <br>
                                        <span class="fab fa-linkedin-in"></span> <a target="_blank" href="{{config('socials.linkedin')}}"> OnePitch</a>
                                        <br>
                                        <span class="fab fa-twitter"></span> <a target="_blank" href="{{config('socials.twitter')}}">@onepitchsaas</a>
                                    </p>
                                </div>
                            @elseif($blogPost->user_id == 1892)
                                <div class="col-xs-2 image">
                                    <img src="/img/blog/stephen-karaolis.jpg" alt="Stephen Karaolis">
                                </div>
                                <div class="col-xs-8">
                                    <b>Stephen Karaolis</b>
                                    <p>OnePitch TypeBar contributor, Stephen Karaolis, is the Founder of pear the agency, a PR agency who specializes in all things media. Follow him at @StephenKaraolis to talk PR speaking opps.</p>
                                    <p>
                                        <span class="fa fa-envelope"></span> <a href="mailto:stephen@peartheagency.com">stephen@peartheagency.com</a>
                                        <br>
                                        <span class="fab fa-linkedin-in"></span> <a target="_blank" href="https://www.linkedin.com/in/stephen-karaolis-6b683940">Stephen Karaolis</a>
                                        <br>
                                        <span class="fab fa-twitter"></span> <a target="_blank" href="https://twitter.com/StephenKaraolis">@stephenkaraolis</a>
                                    </p>
                                </div>
                            @elseif($blogPost->user_id == 2056)
                                <div class="col-xs-2 image">
                                    <img src="/img/blog/darcy-cudmore.jpg" alt="Darcy Cudmore">
                                </div>
                                <div class="col-xs-8">
                                    <b>Darcy Cudmore</b>
                                    <p>Darcy is the PR Coordinator for GenM, a Canadian Startup focused on creating a free education system accessible to anyone. He is a Journalism graduate with a love for hockey (Go Sens Go) and Stephen King.</p>
                                    <p>
                                        <span class="fa fa-envelope"></span> <a href="mailto:darcy@genm.co">darcy@genm.co</a>
                                        <br>
                                        <span class="fab fa-linkedin-in"></span> <a target="_blank" href="https://www.linkedin.com/in/darcy-cudmore/">Darcy Cudmore</a>
                                        <br>
                                        <span class="fab fa-twitter"></span> <a target="_blank" href="http://www.twitter.com/darcycudmore">@DarcyCudmore</a>
                                    </p>
                                </div>
                            @elseif($blogPost->user_id == 2147)
                                <div class="col-xs-2 image">
                                    <img src="/img/blog/big-kayla-perkins.jpg" alt="Kayla Perkins">
                                </div>
                                <div class="col-xs-8">
                                    <b>Kayla Perkins</b>
                                    <p>Kayla is a Senior Account Executive at BAM Communications where she works primarily with B2B tech startups. She graduated from Bentley University with a degree in corporate communications and loves tequila and the New England Patriots, much to the dismay of her NYC-based colleagues.</p>
                                    <p>
                                        <span class="fa fa-envelope"></span> <a href="mailto:kayla@bamcommunications.biz">kayla@bamcommunications.biz</a>
                                        <br>
                                        <span class="fab fa-linkedin-in"></span> <a target="_blank" href="https://www.linkedin.com/in/kaylarperkins/">Kayla Perkins</a>
                                        <br>
                                        <span class="fab fa-twitter"></span> <a target="_blank" href="https://twitter.com/KaylaPerkins_">@KaylaPerkins_</a>
                                    </p>
                                </div>
                            @endif
                        </div>
                    </div>
                    <div class="arrow_to_top" onClick="common.scrollTo()">
                        <div class="arrow_wrap">
                            <div class="arrow_up"></div>
                            <div class="arrow_stick"></div>
                        </div>
                        TOP
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2">
            <div class="wrapper subscribe">
                <div class="card radius">
                    <div class="mailing-subscribe">
                        <div class="mailing-content">
                            <p>Subscribe to receive monthly updates, access to new blogs, Taylor's top Tips and more.</p>
                            @include('blog.parts.subscribe-form')
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('js')
    <script>
        $(window).scroll(function () {
            var scrStop = $(document).height() - $(window).height() - 300;
            var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

            if (width > 765) {
                if ($(window).scrollTop() >= $(document).height() - $(window).height() - 300) {
                    $('.blog-post .wrapper.subscribe').css('position', 'inherit');
                    $('.post__social').css('position', 'inherit');
                    $('.blog-post .btn-done-wrapper').css('position', 'inherit');
                    $('.blog-post .wrapper.subscribe').css('margin-top', scrStop);
                    $('.post__social').css('margin-top', scrStop);
                    $('.blog-post .btn-done-wrapper').css('margin-top', scrStop);
                } else {
                    $('.blog-post .wrapper.subscribe').css('position', 'fixed');
                    $('.blog-post .wrapper.subscribe').css('margin-top', '20px');
                    $('.post__social').css('position', 'fixed');
                    $('.post__social').css('margin-top', '50px');
                    $('.blog-post .btn-done-wrapper').css('margin-top', '0');
                }
            }

        });
    </script>
@endpush