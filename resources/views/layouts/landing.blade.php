<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/vnd.microsoft.icon" href="/favicon.ico">
    <title>@yield('title')</title>
    <meta name="description" content="OnePitch was created by a handful of tech-savvy publicists and journalists who believe that the PR industry is long overdue for some innovation."/>
    <link rel="canonical" href="@yield('canonical')"/>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">
    @include('layouts.trackers.facebook-pixel')
</head>
<body class="landing">

<main class="container-custom">
    @if (!empty($with_header) && $with_header)
        @include('layouts.header')
    @endif
    @yield('content')
    @include('layouts.support_bot')
</main>

@push('footer.top')
    <div class="footer-top">
        <div class="row">
            <div class="col-lg-12">
                <span class="title">The end of bad pitches. <br>The start of great stories.</span>
            </div>
        </div>
    </div>
@endpush

@include('layouts.footer')

<script type="text/javascript" src="{{ mix('js/scripts.js') }}"></script>
<script type="text/javascript" src="/js/laroute.js?v=6.0"></script>
<script type="text/javascript" src="{{ mix('js/app.js') }}"></script>


@stack('js')
@include('layouts.trackers.all-trackers')
</body>
</html>
