@extends('layouts.simple')

@section('title', 'Media Outlets')

@section('content')

    <div class="container list">
        <div class="content title">
            <h2 class="text-center">Media Outlets</h2> 
            <hr class="small"/>
        </div>

        <div class="content content-area">
            <div class="row search-industries-wrap">
                <div class="col-sm-8">
                    <div class="form-group">
                        <div class="input-group white-input">
                            <input type="text" id="search-industry" class="form-control"
                                   placeholder="Search Outlets">
                            <div class="input-group-addon"><img src="/img/icon-search.svg" alt="icon-search"></div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4 industries-count-wrap">
                    <div class="showing-count">
                        Showing <span class="count industries-showing">{{ $total }}</span>/<span
                                class="industries-total">{{ $total }}</span> Outlets
                    </div>
                </div>
            </div>

            <div class="tags-wrapper">
                <div class="tags" id="industry-tags"></div>
                <div class="clear"></div>
            </div>

            <div class="content industry-topics">
                <div class="row topics m-b-64">
                    @if ($total)
                        @foreach ($journalists as $journalist)
                            <div class="col-sm-6 topic">
                                <div class="topic-inner checkbox-wrapper list">
                                    <div class="topic-title">
                                        <span>{{ $journalist->company }}</span>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                            </div>
                        @endforeach
                    @else
                        <h3 class="section-head text-center m-b-64 no-industries">
                            Your search for “{{ $term }}” Outlets shows no results.
                            <br/>
                            <img src="/img/pensive-face-1-f-614@3x.png" alt="pensive-face"/>
                        </h3>
                    @endif
                </div>
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script>
        function delay(callback, ms) {
            var timer = 0;
            return function () {
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    callback.apply(context, args);
                }, ms || 0);
            };
        }

        var outletsDiv = $('.topics');
        var htmlStr = '';

        $('#search-industry').keyup(
            delay(function (e) {
                var qSearch = common.loadSearchedOutlets(this.value);
                qSearch.done(function (response) {
                    outletsDiv.html('');
                    htmlStr = '';

                    var journalists = response.journalists;

                    if (!journalists.length) {
                        htmlStr += '<h3 class="section-head text-center m-b-64 no-industries">' +
                            'Your search for “' + response.term + '” Outlets shows no results.<br/>' +
                            '<img src="/img/pensive-face-1-f-614@3x.png" alt="pensive-face"/></h3>';
                        outletsDiv.html(htmlStr);

                        return false;
                    }

                    $('.industries-showing').html(response.total);

                    for (var i = 0; i < journalists.length; i++) {
                        htmlStr +=
                            '<div class="col-sm-6 topic">' +
                            '<div class="topic-inner checkbox-wrapper list">' +
                            '<div class="topic-title">' +
                            '<span>' + journalists[i].company + '</span>' +
                            '</div>' +
                            '<div class="clear"></div>' +
                            '</div>' +
                            '</div>';
                    }

                    outletsDiv.html(htmlStr);

                });
            }, 300)
        );
    </script>
@endpush