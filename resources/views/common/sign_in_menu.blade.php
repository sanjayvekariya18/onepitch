<div class="sign_out">
    @if(Auth::check())
        <div class="sign-out-wrapper clearfix">
            <div class="dropdown dropdown-alerts pull-left">
                <a class="dropdown-toggle" type="button" id="dropdownAlertsButton" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false" onclick="alerts.openHeaderNav(this)">
                    <i class="fas fa-bell fa-lg"></i> <span
                            class="badge">{{ Auth::user()->getAlertNotifiable() }}</span>
                </a>

                <div class="dropdown-menu dropdown-menu-right dropdown-menu-alerts"
                     aria-labelledby="dropdownAlertsButton">
                    <div class="notifications-title">
                        <span>
                            <span>Notifications</span>
                        </span>
                    </div>
                    <div class="notifications-body">
                        @if(!Auth::user()->listAlerts()->count())
                            <a href="#" class="notification-item">
                                <div class="notification-item-icon">
                                    <img src="/img/blog/typewriter.png" alt="OnePitch Team" class="img-rounded"
                                         style="width:40px">
                                </div>
                                <div class="notification-item-details">
                                    <div class="notification-item-message">
                                        No messages left...
                                    </div>
                                    <div class="notification-item-time">
                                    </div>
                                </div>
                            </a>
                        @else
                            @foreach(Auth::user()->listAlerts() as $alert)
                                <a href="{{ $alert->link ?? '#' }}" class="notification-item">
                                    <div class="notification-item-icon">
                                        <img src="/img/blog/typewriter.png" alt="OnePitch Team" class="img-rounded"
                                             style="width:40px">
                                    </div>
                                    <div class="notification-item-details">
                                        <div class="notification-item-message">
                                            {!! nl2br($alert->message) !!}
                                        </div>
                                        <div class="notification-item-time">
                                            {{$alert->created_at->diffForHumans()}}
                                        </div>
                                    </div>
                                </a>
                            @endforeach
                        @endif
                    </div>
                </div>
            </div>

            <div class="dropdown pull-left">
                <a class="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false">
                    <div class="img_wrap">
                        @if(Auth::user()->photo)
                            {{ HTML::image(getUserPhotoUrl(Auth::user())) }}
                        @else
                            <div class="letters">{{getInitials(Auth::user()->full_name)}}</div>
                        @endif
                    </div>
                    <div class="name">Hi, {{Auth::user()->full_name}}</div>
                    <div class="arrow">
                        {{ HTML::image('images/icon-downarrow-dark.png') }}
                    </div>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    @include('layouts.profile_menu_items')
                </div>
            </div>
        </div>
    @endif
    <div class="side_bar_menu closed">
        <div class="menu_icon" onClick="menu.toggle(this)">
            {{ HTML::image('img/icon-menu.png') }}
        </div>
        <div class="bg"></div>
        <div class="menu_body">
            <div class="menu_header">
                <div class="close_icon" onClick="menu.toggle(this)">
                    {{ HTML::image('img/icon-menu-close.png') }}
                </div>
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
                <a href="{{route('contact')}}">Contact</a>
                <a href="{{route('referral')}}">Refer</a>
                <a href="{{ route('faq') }}">FAQ</a>
            </div>
        </div>
    </div>
</div>