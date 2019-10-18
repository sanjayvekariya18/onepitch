@extends('layouts.simple')

@section('title', 'Confirm Pitch Upload')

@section('content')
    <div class="container">
        <div class="content text-center m-b-64">
            <h2 class="text-center">Way to go, savvy publicist!</h2>

            <hr class="small"/>

            @if ($pitch->status == \App\Models\Pitch::STATUS_DRAFT)
            <h3 class="section-head">
                Check your email <span class="ylw-highlight">{{ $user->email }}</span> to confirm pitch upload and preview your pitch.
            </h3>

            <a href="javascript:;" onclick="pitch.resendConfirmation({{ $pitch->id }})"
               class="underline-link email-resend">Didn’t get the email? Resend email.</a>

            <div class="email-sent hidden">{{ HTML::image('img/icon-validationcheck-dark.svg') }}Email sent.</div>
            @else
            <h3 class="section-head">
                Check your profile to preview your pitch.
            </h3>
            @endif
        </div>
    </div>
@endsection
