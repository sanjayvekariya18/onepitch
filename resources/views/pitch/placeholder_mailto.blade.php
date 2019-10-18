@extends('layouts.simple')

@section('title', 'Mail Publicist')

@section('content')
    <div class="container">
        <div class="content text-center">
            <h2 class="text-center">Mail Publicist!</h2>

            <hr class="small"/>

            <h3 class="section-head">
                Ask pitch publicist whatever you want.
            </h3>
        </div>
    </div>
@endsection

@push('js')
<script>
    $(function () {
		window.location="mailto:{{ $pitch->user->email }}?subject={{ "RE: OnePitch ".str_replace('+', ' ', urlencode($pitch->subject)) }}&body={{ 'Hi '.str_replace('+', ' ', urlencode($pitch->user->full_name)).urlencode(',') }}%0D%0A%0D%0A{{ "I received your ".str_replace('+', ' ', urlencode($pitch->subject))." inquiry in my OnePitch daily email. Can you please provide the following information:" }}";
	});
</script>
@endpush
