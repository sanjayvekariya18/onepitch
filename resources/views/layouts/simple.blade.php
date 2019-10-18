<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>@yield('title') - OnePitch</title>
        <meta name="description" content="OnePitch was created by a handful of tech-savvy publicists and journalists who believe that the PR industry is long overdue for some innovation."/>
        <link rel="canonical" href="@yield('canonical')"/>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" /> {{-- TODO ? --}}
        <link rel="stylesheet" type="text/css" href="{{ mix('css/app.css') }}" />

        @include('layouts.trackers.facebook-pixel')
    </head>
    <body class="full-width {{isset($body_classes) ? implode(' ', $body_classes) : ''}}">
        @include('layouts.header')
        <main>
            @yield('content')
            @include('layouts.support_bot')
        </main>

        @if(isset($top_footer))
            @push('footer.top')
                <div class="footer-top">
                    <div class="row">
                        <div class="col-lg-12">
                            <span class="title">The end of bad pitches. <br>The start of great stories.</span>
                        </div>
                    </div>
                </div>
            @endpush
        @endif
        @if(!isset($no_footer))
            @include('layouts.footer')
        @endif
        <script type="text/javascript" src="{{ mix('js/scripts.js') }}"></script>
        {{ HTML::script('plugins/moment/moment.min.js') }}
        <script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script> {{-- TODO ? --}}
        {{ HTML::script('js/jquery.maskedinput.min.js') }}
        {{ HTML::script('js/select2.min.js') }}
        <script type="text/javascript" src="/js/laroute.js?v=6.0"></script>
        <script type="text/javascript" src="{{ mix('js/app.js') }}"></script>
        {{ HTML::script('plugins/sweetalert/sweetalert.js') }}

        @stack('js')

        @include('layouts.trackers.all-trackers')
    </body>
</html>
