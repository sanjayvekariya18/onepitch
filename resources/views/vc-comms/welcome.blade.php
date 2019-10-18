@extends('layouts.vc_commons')

@section('title', 'Venture Capital - Welcome')

@section('canonical')
    {{ URL::current() }}
@stop

<style type="text/css">
    body {
        background-color: #ffd732 !important;
        font-family: AkkuratPro, Roboto, sans-serif !important;
    }

    p.welcome {
        font-size: 8.3em !important;
        font-weight: bolder;
        color: #ffffff !important;
        text-align: center;
    }

    section.welcome{
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
            Welcome to
        </p>

        <img src="/img/landing/logo-dark-whitedot@2x.png" alt="" class="center-block img-responsive">

        <div class="buttons">
            <a href="{{ route('signup_venture_capital') }}" class="btn btn-white-shadow">
                GET STARTED
            </a>
        </div>

    </section>

@endsection