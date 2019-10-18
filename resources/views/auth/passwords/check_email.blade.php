@extends('layouts.simple')

@section('title', 'Reset Password Request Sent')

@section('content')
    <div class="container">
        <div class="content text-center">
            <h2>Reset Password</h2>

            <hr class="small"/>

            <h3 class="section-head text-center">Send reset link to the email below.</h3>

            <h3 class="section-head">
                Reset link has been sent. Please check your email <span class="ylw-highlight">{{ $email }}</span> to reset your password.
            </h3>
        </div>
    </div>
@endsection