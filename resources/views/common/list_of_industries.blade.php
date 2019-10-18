@extends('layouts.simple')

@section('title', 'Tech Industries')

@section('content')

    <div class="container list">
        <div class="buttons-group m-b-56">
            <a href="{{ route('service_all_topics') }}"
               class="btn btn-white-ylw m-r-16 topic">All Topics</a>

            <a href="{{ route('service_all_industries') }}"
               class="btn btn-white-ylw industry" disabled="disabled">All Industries</a>
        </div>

        <div class="content title">
            <h2 class="text-center">Tech Industries</h2>

            <hr class="small"/>
        </div>

        <div class="content content-area">
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


            <div class="row search-industries-wrap">
                <div class="col-sm-8">
                    <div class="form-group">
                        <div class="input-group white-input">
                            <input type="text" id="search-industry" class="form-control" placeholder="Search Industries">
                            <div class="input-group-addon"><img src="/img/icon-search.svg"></div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4 industries-count-wrap">
                    <div class="showing-count">
                        Showing <span class="count industries-showing">12</span>/<span class="industries-total">{{ $industries['total'] }}</span> Industries
                    </div>
                </div>
            </div>

            <div class="tags-wrapper">
                <div class="tags" id="industry-tags"></div>
                <div class="clear"></div>
            </div>

            <div class="industries-wrapper">
                <div class="row industries">
                    @if (count($industries['items']))
                        @foreach ($industries['items'] as $industry)
                            <div id="industry-block{{ $industry->id }}" class="col-sm-6 col-md-4 industry" data-id="{{ $industry->id }}">
                                <div class="industry-container">
                                    <div class="industry-container-inner list">
                                        <div>
                                            <div class="industry-title">{{ $industry->title }}</div>
                                            @if ($industry->full_title)
                                                <div class="industry-full-title">({{ $industry->full_title }})</div>
                                            @endif
                                        </div>

                                    </div>

                                    <div class="industry-container-inner hover">
                                        <div class="industry-title">{{ $industry->title }}</div>
                                        <div class="industry-description">{{ $industry->description }}</div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    @else
                        <h3 class="section-head text-center m-b-64 no-industries">
                            You’re search for “{{ $term }}” Industry shows no results.
                            <br/>
                            <img src="/img/pensive-face-1-f-614@3x.png" />
                        </h3>
                    @endif
                </div>

                <input type="hidden" name="offset" value="0" />

                <div class="showing-count-bottom m-b-64">
                    Showing <span class="count industries-showing">12</span>/<span class="industries-total">{{ $industries['total'] }}</span> Industries
                </div>
                <div class="text-center">
                    <a href="javascript:;"
                       onclick="pitch.loadMoreIndustries($('#search-industry'), $('.industries-wrapper .industries'));"
                       class="btn btn-white-ylw btn-submit load-more-industries m-b-64">Load More</a>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script>
        $('#search-industry').keyup(function () {
            pitch.loadSearchedIndustryBlocks($('.industries-wrapper .industries'), this.value);
        })

        $('div.industries').on('click', '.industry', function (e) {
            window.location = '/auth/industry/landing/'+$(this).data('id');
        })
    </script>
@endpush