@extends('layouts.landing')

@section('title', 'OnePitch - For Media, PR & Communications Professionals')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
    <style type="text/css">
        .trans-fade {
            display: none;
        }

        .fade-current {
            display: block;
        }
        @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) {
        /* For portrait layouts only */          
            .landing .section.header-section .buttons {
                display: block;
            }
            .col-lg-6.right-section.fixIpadView{
                display: block !important;
    float: left;
            }
            .col-lg-6.col-md-12.col-sm-12.left-section.fixIpadView{
                margin-top: 60px;
            } 
            .landing .right-section.fixIpadView {
                display: block !important;
    position: absolute;    text-align: right;
            }  
            .landing .left-section.fixIpadView .buttons-section {
                display: block !important;
            }  
            .landing .section.section-2 .right-section img {
                margin-top: 175px;
    width: 60%;
            }         
        }        
    </style>

    <div class="col-lg-12">
        @if(!Auth::check())
            <aside class="right-menu">
                <div class="menu">
                    <div class="menu-header">
                        <div class="header-logo"></div>
                        <div class="header-button">
                            <button class="close"></button>
                        </div>
                    </div>
                    <div class="menu-content">
                        <ul>
                            <li><a href="{{ route('login') }}"><span>Sign In</span></a></li>
                            <li><a href="{{ route('signup_select_role') }}"><span>Join the free beta!</span></a></li>
                            <li><a href="{{route('service_all_topics')}}">Topics</a></li>
                            <li><a href="{{route('service_all_industries')}}">Industries</a></li>
                            <li><a href="{{route('journalist_outlets')}}">Media Outlets</a></li>
                            <li><a href="{{ route('contact') }}">Contact</a></li>
                            <li><a href="{{ route('referral') }}">Refer</a></li>
                            <li><a href="{{ route('faq') }}">FAQ</a></li>
                        </ul>
                    </div>
                    <div class="menu-footer">
                        <div class="footer-socials">
                            <ul>
                                <li><a class="linkedin" href="{{ config('socials.linkedin') }}" title="LinkedIn"></a>
                                </li>
                                <li><a class="facebook" href="{{ config('socials.facebook') }}" title="Facebook"></a>
                                </li>
                                <li><a class="instagram" href="{{ config('socials.instagram') }}" title="Instagram"></a>
                                </li>
                                <li><a class="twitter" href="{{ config('socials.twitter') }}" title="Twitter"></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </aside>
        @endif
        <div class="row section header-section">
            <span class="side_icon" onclick="common.openNav()">&#9776;</span>
            <div class="logo"></div>
            @include('common.sign_in_menu')
            @if(!Auth::check())
                <div class="buttons">
                    <a href="{{ route('login') }}" class="btn btn-black-transparent btn-sm">SIGN IN</a>
                    <a href="{{ route('signup_select_role') }}" class="btn btn-white-shadow btn-sm">JOIN THE FREE
                        BETA!</a>
                </div>
            @endif
            <div id="sideNav" class="sidenav side_bar_menu">
                <div class="menu_body">
                    <div class="menu_header">
                        <a href="javascript:void(0)" class="closebtn" onclick="common.closeNav()">&times;</a>
                        <div class="header_img">
                            {{ HTML::image('images/one-pitch-logo-medium.png') }}
                        </div>
                    </div>
                    <div class="items_wrap">
                        @include('layouts.profile_menu_items')
                    </div>
                    <div class="footer_wrap">
                        <a href="{{route('blog.index')}}">Blog</a>
                        <a href="{{route('service_all_topics')}}">Topics</a>
                        <a href="{{route('service_all_industries')}}">Industries</a>
                        <a href="{{route('journalist_outlets')}}">Media Outlets</a>
                        <a href="{{route('referral')}}">Refer</a>
                        <a href="{{ route('faq') }}">FAQ</a>
                        <a href="{{route('contact')}}">Contact</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="row section section-2">
            <div id="div1" class="col-md-12 container-slide trans-fade fade-current">
                <div class="container-slide-inner center-block">
                    <p class="main-text font-lg">
                        You guys are doing God’s work over there!
                    </p>
                    <p class="author-text">
                        Emerging Tech Editor, Digital Trends
                    </p>
                </div>
            </div>

            <div id="div2" class="col-md-12 container-slide trans-fade">
                <div class="container-slide-inner center-block" style="margin-top:13%">
                    <p class="main-text font-md">
                        The one email I read everyday.
                    </p>
                    <p class="author-text">
                        Contributing Writer, Inc., Entrepreneur
                    </p>
                </div>
            </div>

            <div id="div3" class="col-md-12 container-slide trans-fade">
                <div class="container-slide-inner center-block">
                    <p class="main-text font-md">
                        Both sides should appreciate the work OnePitch is doing!
                    </p>
                    <p class="author-text">
                        Director of Client Success, PowerfulOutreach
                    </p>
                </div>
            </div>

            <div id="div4" class="trans-fade">
                <div class="col-lg-6 col-md-12 col-sm-12 left-section fixIpadView">
                    <h2 class="typing"><span></span></h2>
                    <div class="intro-about">
                        <span>
                            Join the free beta!
                        </span>
                    </div>
                    @if(!\Illuminate\Support\Facades\Auth::check())
                        <div class="button hidden-md hidden-lg">
                            <a href="{{ route('signup_select_role') }}" class="btn btn-white-shadow sign-in">JOIN
                                THE FREE
                                BETA!</a>
                        </div>
                    @endif
                    <div class="buttons-section hidden-xs hidden-sm">
                        <a href="#for-professionals" class="btn btn-white-transparent">For Tech Media
                            Professionals</a><br>
                        <a href="#for-professionals" class="btn btn-white-transparent">For Tech PR and Communications
                            Professionals</a>
                    </div>
                </div>

                <div class="col-lg-6 right-section hidden-xs hidden-sm hidden-md fixIpadView">
                    <img src="/images/onepitch-on-desktop.png" alt="OnePitch on Desktop">
                </div>

            </div>
        </div>

        <div id="for-professionals" class="partner-divider">
            <h2><span>THE END OF BAD PITCHES</span></h2>
        </div>

        <div class="row section section-4">
            <div id="for-journalist" class="col-lg-5 col-md-6 col-sm-12 pr-professional">
                <div class="col-lg-6 col-md-6 col-sm-6 img">
                    <img src="/images/pr-professional-onepitch-sliced.png" alt="">
                    <img class="using-onepitch" src="/images/you-using-onepitch-top.png" alt="">
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <h3>For Tech Media Professionals</h3>
                    <p>One simple email per day. No follow ups. No BS.</p>
                    <p>Handpicked, verified sources specific to writing interests.</p>
                    <p>Private & secure. Never worry about your contact info being available to the public.</p>
                </div>
            </div>
            @if(!Auth::check())
                <div class="buttons hidden-md hidden-lg">
                    <a href="{{ route('signup_select_role') }}" class="btn btn-white-shadow btn-sm">JOIN THE FREE
                        BETA!</a>
                </div>
            @endif
            <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs hidden-sm hidden-md divider">
                <div class="col-lg-12 col-md-12 col-sm-12" style="margin-bottom: 20px;">
                    <img src="/images/divider-dotted-short.png" alt="">
                </div>
                <div class="col-lg-12 col-md-12 col-sm-12">
                    <img src="/images/divider-solid.png" alt="">
                </div>
            </div>
            <div id="for-publicist" class="col-lg-5 col-md-6 col-sm-12 media-professional">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <h3>For Tech PR & Comms Professionals</h3> 
                    <p>Easy-to-use pitch template.</p>
                    <p>100s of verified media contacts from top tier outlets, trade & niche publications.</p>
                    <p>Save time sending One-pitch to contacts who opt in based on their writing interests.</p>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 img">
                    <img src="/images/media_professional1-onepitch-sliced2.png" alt="">
                </div>
            </div>
            @if(!Auth::check())
                <div class="buttons">
                    <a href="{{ route('signup_select_role') }}" class="btn btn-white-shadow btn-sm">JOIN THE FREE
                        BETA!</a>
                </div>
            @endif
        </div>

        <div id="howitworks" class="row section section-5">
            <h2><span class="underline">THE START OF GREAT STORIES</span></h2>
            <h2>HOW IT WORKS</h2>

            <div class="row steps">
                <div class="col-lg-4 col-md-4 col-sm-12 pull-right steps-section">
                    <div class="step-numbers">
                        <span onclick="selectSlide(1)" class="step-number">
                            <svg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'
                                 version='1.1' fill="#fff">
                                <circle cx="25" cy="25" r="20"/>
                                <text text-anchor="middle" x="50%" y="50%" dy=".35em">1</text>
                            </svg>
                        </span>
                        <span onclick="selectSlide(2)" class="step-number">
                            <svg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'
                                 version='1.1'>
                                <circle cx="25" cy="25" r="20"/>
                                <text text-anchor="middle" x="50%" y="50%" dy=".35em">2</text>
                            </svg>
                        </span>
                        <span onclick="selectSlide(3)" class="step-number">
                            <svg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'
                                 version='1.1'>
                                <circle cx="25" cy="25" r="20"/>
                                <text text-anchor="middle" x="50%" y="50%" dy=".35em">3</text>
                            </svg>
                        </span>
                    </div>
                    <div class="step-description">
                        <p>
                        <b>Pitch</b> - Publicists pitch journalists based on similar writing interests.
                        </p>
                    </div>
                    <div class="step-description">
                        <p>
                        <b>Inquiry</b> - Journalists pitch Publicists based on stories they’re writing.
                        </p>
                    </div>
                    <div class="step-description">
                        <p>
                        <b>Brand Index</b> - Publicists upload brands, or clients, they represent and Journalists can reach out to cover or feature them.
                        </p>
                    </div>
                    @if(!Auth::check())
                        <div class="buttons">
                            <a href="{{ route('signup_select_role') }}" class="btn btn-white-shadow btn-sm">JOIN THE
                                FREE BETA!</a>
                        </div>
                    @endif
                </div>
                <div class="col-lg-7 col-md-7 col-sm-12">
                    <img class="step-images" src="/images/onepitch-flow-step-one.png" alt="">
                    <img class="step-images" src="/images/onepitch-flow-step-two-updated.png" alt="">
                    <img class="step-images" src="/images/onepitch-flow-step-three-updated.png" alt="">
                </div>
            </div>
        </div>

        <div class="row section section-video-header">
            <div class="col-lg-12 col-md-12 col-sm-12 testimonials">
                <div class="col-lg-1 col-md-1 col-sm-1">
                    <i class="material-icons opening-quote">format_quote</i>
                </div>
                <div class="col-lg-10 col-md-10 col-sm-10 testimonial">
                    <div class="testimonialSlides">
                        <p>
                            “I’ve definitely been enjoying the pitches — they’re formatted well, with a good amount of
                            information, and I like that they’re all in one email :)”
                        </p>
                        <p class="author">
                            Journalist, Make Use Of
                        </p>
                    </div>
                    <div class="testimonialSlides">
                        <p>
                            “I absolutely look for my OnePitch email each day. It's worth opening because I know
                            relevant information is being displayed.”
                        </p>
                        <p class="author">
                            Editor, Digital Trends
                        </p>
                    </div>
                    <div class="testimonialSlides">
                        <p>
                            “I (actually) really love the concept. I'm a little skeptical because I think a platform
                            like this is only as good as its user-base. But having worked with many journalists and
                            producers I know that they'd appreciate something like this.
                            <br>
                            The experience was great, it was straight forward, easy to go through and forces you to be
                            succinct.”
                        </p>
                        <p class="author">
                            PR consultant
                        </p>
                    </div>
                    <div class="testimonialSlides">
                        <p>
                            “Using (OnePitch) service I did get a response from an industry analyst, who also
                            contributes to publications like Forbes. My client is scheduled to have a briefing with him
                            next month.”
                        </p>
                        <p class="author">
                            PR Executive
                        </p>
                    </div>
                </div>
                <div class="col-lg-1 col-md-1 col-sm-1">
                    <i class="material-icons closing-quote">format_quote</i>
                </div>

            </div>
        </div>

        <div class="video-divider">
            <h2><span>TAKE A LOOK</span></h2>
        </div>

        <div class="row section video-section">
            <div class="embed-responsive embed-responsive-16by9">
                {!! $oEmbed->html !!}
            </div>
            <div class="play-button"></div>
        </div>

        <div class="row section section-video-footer section-6">
            <h2 style="margin-bottom: 20px">LEARN MORE</h2>
            <div class="buttons col-md-12">
                <a href="http://go.pardot.com/l/506841/2018-04-01/254ylp" class="btn btn-white-shadow btn-sm"
                   style="margin: 0 25px;background: #ffdd3e;">PUBLICIST</a>
                <a href="http://go.pardot.com/l/506841/2018-04-01/254vpf" class="btn btn-white-shadow btn-sm"
                   style="margin: 0 25px;background: #ffdd3e;">JOURNALIST</a>
            </div>
            <div class="col-lg-12 col-md-12 col-sm-12" style="margin-top: 50px;">
                <img src="/images/divider-dotted-short.png" alt="">
            </div>
        </div>

        <div class="row section section-6">
            <h2>WHY ONEPITCH</h2>
            <div class="col-lg-6 col-lg-offset-3 col-md-10 col-md-offset-1">
                <p>OnePitch was created by a handful of tech-savvy publicists and journalists who believe that the PR
                    industry is long overdue for some innovation. </p>
                <p>The way publicists interact with journalists now seems as inefficient as using a typewriter
                    today.</p>
                <p> We're changing this with OnePitch.</p>
            </div>
            @if(!Auth::check())
                <div class="col-lg-12 col-md-12 col-sm-12 buttons">
                    <a href="{{ route('signup_select_role') }}" class="btn btn-white-shadow btn-sm">GET STARTED</a>
                </div>
            @endif
            <div class="col-lg-12 text-center">
                <h2 class="lined">#QuitBitchingAboutPitching</h2>
            </div>

        </div>
    </div>
@endsection

@push('js')
    <script>
        var iframe = document.querySelector('iframe');
        var player = new Player(iframe);

        player.on('play', function () {
            $('.play-button').hide();
        });
        player.on('pause', function () {
            $('.play-button').show();
        });

        $('.play-button').on('click', function () {
            player.play();
        });

        let options = {
            strings: ['The end of bad pitches.<br>The start of great stories.'],
            typeSpeed: 70,
            fadeOut: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true,
            loop: false,
            startDelay: 5000
        };

        if ($('.typing span').length) {
            const typed = new Typed('.typing span', options);
        }

        let whiteElements = $('.section-3, .video-section, .section-6, .section-5');
        let yellowElements = $('.section-2');
        let points = [{class: 'white', removeClass: 'yellow', offset: 0}];

        whiteElements.each((index, element) => {
            points.push({class: 'white', removeClass: 'yellow', offset: element.getBoundingClientRect().top});
        });

        yellowElements.each((index, element) => {
            points.push({class: 'yellow', removeClass: 'white', offset: element.getBoundingClientRect().top});
        });

        points.sort((a, b) => {
            if (a.offset > b.offset) {
                return 1;
            }
            if (a.offset < b.offset) {
                return -1;
            }
            return 0;
        });

        $(document).on('scroll', () => {
            points.forEach((element) => {
                if ($('body').scrollTop() >= element.offset - 104) {
                    $('.header-section').addClass(element.class).removeClass(element.removeClass);
                }
            });

        });


        var showSlideIndex = 1
        showStepSlides(showSlideIndex)
        showSlideIndex++

        window.setInterval(function () {
            /// call your function here
            showStepSlides(showSlideIndex)
            if (showSlideIndex < 3) {
                showSlideIndex++
            } else {
                showSlideIndex = 1
            }

        }, 7000)

        function showStepSlides(n) {
            var i
            var slides = document.getElementsByClassName('step-description')
            var imageSlides = document.getElementsByClassName('step-images')
            var stepNumbers = document.getElementsByClassName('step-number')
            if (n > slides.length) {
                showSlideIndex = 1
            }
            if (n < 1) {
                showSlideIndex = slides.length
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none'
                imageSlides[i].style.display = 'none'
                stepNumbers[i].className = stepNumbers[i].className.replace(' active', '')
            }
            slides[n - 1].style.display = 'block'
            imageSlides[n - 1].style.display = 'block'
            stepNumbers[n - 1].className += ' active'
        }

        function selectSlide(slideIndex) {
            showSlideIndex = slideIndex
            showStepSlides(slideIndex)
        }

        var slideIndex = 1;
        showTestimonialSlides(slideIndex);
        slideIndex++;

        window.setInterval(function () {
            /// call your function here
            showTestimonialSlides(slideIndex);
            if (slideIndex < 4) {
                slideIndex++;
            } else {
                slideIndex = 1;
            }
        }, 4000);

        function showTestimonialSlides(n) {
            var i;
            var slides = document.getElementsByClassName('testimonialSlides');
            if (!slides.length) {
                return false;
            }
            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
            slides[slideIndex - 1].style.display = 'block';
        }

        var secondsToFade = 2000;

        $('#div1').fadeIn(100).delay(secondsToFade).fadeOut(100, function () {
            $('#div2').fadeIn(100).delay(secondsToFade).fadeOut(100, function () {
                $('#div3').fadeIn(100).delay(secondsToFade).fadeOut(100, function () {
                    $('#div4').fadeIn(100).delay(secondsToFade);
                });
            });
        });


        $('aside.right-menu').find('.menu-header button.close').on('click', function() {
            $(this).closest('aside.right-menu').removeClass('active');
        });
    </script>
@endpush