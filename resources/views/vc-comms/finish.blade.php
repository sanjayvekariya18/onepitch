@extends('layouts.vc_commons')

@section('title', 'Venture Capital - Registered')

@section('canonical')
    {{ URL::current() }}
@stop

<style type="text/css">
    body {
        background-color: #ffd732 !important;
        font-family: AkkuratPro, Roboto, sans-serif !important;
    }

    p.welcome {
        font-size: 9em !important;
        font-weight: bolder;
        color: #ffffff !important;
        text-align: center;
    }

    p.start-again{
        text-align: center;
    }

    p.start-again a{
        font-size: 2em !important;
        text-decoration: none;
    }

    p.start-again a:hover{
        font-size: 2em !important;
        color: #23527c !important;
        text-decoration: underline;

    }

    section.welcome {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    div.buttons {
        text-align: center;
        margin-top: 100px
    }

    div.container-fluid {
        position: relative;
        width: 100%;
        height: 100vh;

    }

    .btn-white-shadow {
        width: 50%;
        font-size: 2.6em
    }
</style>


@section('content')

    <section class="welcome">
        <p class="welcome">
            Thanks </p>

        <img src="/img/landing/logo-dark-whitedot@2x.png" alt="" class="center-block m-t-32">

        <p class="start-again m-t-20">
            <a href="{{ route('comm_vc_welcome') }}">Start Again?</a>
        </p>

    </section>

@endsection