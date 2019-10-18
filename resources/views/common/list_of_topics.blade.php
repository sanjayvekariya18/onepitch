@extends('layouts.simple')

@section('title', 'Topics')

@section('content')

    <div class="container list">
        <div class="buttons-group m-b-56">
            <a href="{{ route('service_all_topics') }}"
               class="btn btn-white-ylw m-r-16 topic" disabled="disabled">All Topics</a>

            <a href="{{ route('service_all_industries') }}"
               class="btn btn-white-ylw industry">All Industries</a>
        </div>

        <div class="content">
            <h2 class="text-center">Topics</h2>

            <hr class="small"/>
        </div>

        <div class="content industry-topics">
            <div  class="btn-done-wrapper">
                @if(Auth::check() && Auth::user()->role == App\Models\User::ROLE_PUBLICIST)
                    <a href="{{route('pitch_what', ['pitch_id' => 'create'])}}" class="btn btn-ylw-done">
                        Create Pitch
                        <i class="material-icons">arrow_forward</i>
                    </a>
                @elseif(Auth::check() && Auth::user()->role == App\Models\User::ROLE_JOURNALIST)
                    <a href="{{route('inquiry_what', ['inquiry_id' => 'create'])}}" class="btn btn-ylw-done">
                        Create Inquiry
                        <i class="material-icons">arrow_forward</i>
                    </a>
                @endif
            </div>

            <div class="row topics m-b-64">
                @foreach ($all_topics as $topic)
                    <div class="col-sm-6 topic" data-id="{{ $topic->id }}">
                        <div class="topic-inner checkbox-wrapper list">

                            <div class="topic-title">
                                <span>{{ $topic->title }}</span>
                            </div>

                            <div class="topic-description">
                                @if(!(Auth::check() && Auth::user()->role == App\Models\User::ROLE_JOURNALIST && $topic->title == 'Events/Embargoes'))
                                    {{ $topic->description }}
                                @endif
                            </div>

                            <div class="clear"></div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script>
        $('div.topics').on('click', '.topic', function (e) {
            window.location = '/auth/topic/landing/'+$(this).data('id');
        })
    </script>

@endpush

