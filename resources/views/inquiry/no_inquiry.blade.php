@extends('layouts.simple')

@section('title', 'Confirm Account - Journalist')

@section('content')
    <div class="container">
        <div class="content text-center m-b-64">
            <h2 class="text-center">Way to go, savvy journalist!</h2>

            <hr class="small"/>

            <h3 class="section-head">
                Check your email <span class="ylw-highlight">{{ $user->email }}</span> to confirm your account.
            </h3>

            <a href="javascript:;" onclick="auth.resendConfirmation({{ $user->id }})"
               class="underline-link email-resend">Didn’t get the email? Resend email.</a>

            <div class="email-sent hidden">{{ HTML::image('img/icon-validationcheck-dark.svg') }}Email sent.</div>
        </div>
    </div>
@endsection
