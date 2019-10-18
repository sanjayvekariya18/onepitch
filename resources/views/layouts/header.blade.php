@if (!isset($without_logo) || !$without_logo)
    <div class="head-logo {{isset($header_classes) ? implode(' ', $header_classes) : ''}}">
        @if(!isset($without_side_menu) || !$without_side_menu)
            <span class="side_icon" onclick="common.openNav()">&#9776;</span>
        @endif
        <a class="site-logo" href="/">
            {{ isset($header_classes) ?  HTML::image('img/onepitch-dark-whitedot@2x.png') : HTML::image('img/one-pitch-logo.svg') }}
        </a>
        @if(Auth::check() && (!isset($without_menu) || !$without_menu))
            @include('common.sign_in_menu')
        @endif

        @if(!Auth::check() && (!isset($without_signup) || !$without_signup))
            <div class="sign_out not-for-sm">
                    <div class="buttons" style="margin-top: -8px;">
                        <a href="{{ route('login') }}" class="btn btn-black-transparent btn-sm">SIGN IN</a>
                        <a href="{{ route('signup_select_role') }}" class="btn btn-white-shadow btn-sm" style="margin-left: 32px;">JOIN THE FREE BETA!</a>
                    </div>
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
                    @include('layouts.profile_side_menu_items')
                </div>
                <div class="footer_wrap">
                    <a href="{{route('blog.index')}}">Blog</a>
                    <a href="{{route('service_all_topics')}}">Topics</a>
                    <a href="{{route('service_all_industries')}}">Industries</a>
                    <a href="{{route('journalist_outlets')}}">Media Outlets</a>
                    <a href="{{route('referral')}}">Refer</a>
                    @if(Auth::check() && Auth::user()->role == App\Models\User::ROLE_PUBLICIST)
                        <a href="{{ route('publicist_support_center') }}">Support Center</a>
                    @endif
                    @if(Auth::check() && Auth::user()->role == App\Models\User::ROLE_JOURNALIST)
                        <a href="{{ route('journalist_support_center') }}">Support Center</a>
                    @endif
                    <a href="{{ route('faq') }}">FAQ</a>
                    <a href="{{route('contact')}}">Contact</a>
                </div>
            </div>
        </div>
    </div>
@endif