@extends('layouts.simple')

@section('title', 'Confirmation Email Sent')

@section('content')
    <div class="container">
        @include('journalist.profile_steps', ['step' => 'what_next'])

        <div class="content text-center m-b-64">
            <h2 class="text-center">Great! Check your email.</h2>

            <hr class="small"/>

            <h3 class="section-head">
                Please check your email <span class="ylw-highlight">{{ $user->email }}</span> to confirm your journalist account request.
            </h3>

            <a href="javascript:;" onclick="auth.resendConfirmation({{ $user->id }})"
               class="underline-link email-resend">Didn’t get the email? Resend email.</a>

            <div class="email-sent hidden">{{ HTML::image('img/icon-validationcheck-dark.svg') }}Email sent.</div>
        </div>
    </div>
@endsection
