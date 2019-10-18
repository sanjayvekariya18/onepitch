@extends('layouts.simple')

@section('title', 'Confirm Inquiry Upload')

@section('content')
    <div class="container">
        <div class="content text-center m-b-64">
            <h2 class="text-center">Way to go, savvy journalist!</h2>

            <hr class="small"/>

            @if ($inquiry->status == \App\Models\Inquiry::STATUS_DRAFT)
                <h3 class="section-head">
                    Check your email <span class="ylw-highlight">{{ $user->email }}</span> to confirm inquiry upload and preview your inquiry.
                </h3>

                <a href="javascript:;" onclick="inquiry.resendConfirmation({{ $inquiry->id }})"
                   class="underline-link email-resend">Didn’t get the email? Resend email.</a>

                <div class="email-sent hidden">{{ HTML::image('img/icon-validationcheck-dark.svg') }}Email sent.</div>
            @else
                <h3 class="section-head">
                    Check your Check your email to confirm your inquiry.
                </h3>
            @endif
        </div>
    </div>
@endsection
