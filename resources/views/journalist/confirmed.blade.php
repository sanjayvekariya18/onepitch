@extends('layouts.simple')

@section('title', 'Email Confirmation Success')

@section('content')
    <div class="container">
        @include('journalist.profile_steps', ['step' => 'what_next'])

        <div class="content text-center m-b-64">
            <h2 class="text-center">Thanks for confirming your email!</h2>

            <hr class="small"/>

            <h3 class="section-head">
                We'll be in touch with your account status. Once approved you can login and change your industries, topics, and profile settings.
            </h3>
        </div>
    </div>
@endsection
