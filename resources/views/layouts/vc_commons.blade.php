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
</head>
<body>

<div class="container-fluid">

    @yield('content')

</div>


<script type="text/javascript" src="{{ mix('js/scripts.js') }}"></script>
<script type="text/javascript" src="/js/laroute.js?v=6.0"></script>
<script type="text/javascript" src="{{ mix('js/app.js') }}"></script>


@stack('js')

</body>
</html>
