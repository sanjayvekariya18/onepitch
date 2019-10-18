@extends('layouts.simple')

@section('title', 'Mail Journalist')

@section('content')
    <div class="container">
        <div class="content text-center">
            <h2 class="text-center">Mail Journalist!</h2>

            <hr class="small"/>

            <h3 class="section-head">
                Ask inquiry publicist whatever you want.
            </h3>
        </div>
    </div>
@endsection

@push('js')
    <script>
        $(function () {
            window.location="mailto:{{ $inquiry->user->email }}?subject={{ "RE: OneInquiry ".str_replace('+', ' ', urlencode($inquiry->subject)) }}&body={{ 'Hi '.str_replace('+', ' ', urlencode($inquiry->user->full_name)).urlencode(',') }}%0D%0A%0D%0A{{ "I received your ".str_replace('+', ' ', urlencode($inquiry->subject))." inquiry in my OneInquiry daily email. Can you please provide the following information:" }}";
        });
    </script>
@endpush
