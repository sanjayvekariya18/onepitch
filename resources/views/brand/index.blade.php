@extends('layouts.simple')

@section('title', 'Brand Index')

@section('content')

    <div class="container list brands">
        <div class="content title">
            <h2 class="text-center">Brand Index</h2>

            <hr class="small"/>
        </div>

        <div class="content content-area">
            <div class="row search-industries-wrap">
                <form id="brands-search" action="{{ route('publicist_brands_search') }}" method="post">
                    <div class="col-sm-8">
                        <div class="form-group">
                            <div class="input-group white-input">
                                <input type="text" id="search-industry" name="q" class="form-control"
                                       placeholder="Search..." value="{{ $term }}">
                                <div class="input-group-addon">
                                    <img src="/img/icon-search.svg" alt="icon search svg">
                                </div>
                            </div>
                        </div>
                        @if (!isset($industryTerm) && !isset($topicTerm) && isset($term) && strlen($term) < 4)
                            <div style="color: #ff465d;">For better results, search with a minimum of 4 characters.
                            </div>
                        @endif
                    </div>
                    <div class="form-group col-sm-2">
                        <select name="industry" id="industry" class="form-control">
                            <option value="">Industry</option>
                            @foreach ($industries as $industry)
                                <option {{ $industryTerm == $industry->id ? 'selected' : '' }} value="{{ $industry->id }}">{{ $industry->title }}</option>
                            @endforeach
                        </select>
                    </div>
                    <div class="form-group col-sm-2">
                        <select name="topic" id="topic" class="form-control">
                            <option value="">Topic</option>
                            @foreach ($topics as $topic)
                                <option {{ $topicTerm == $topic->id ? 'selected' : '' }} value="{{ $topic->id }}">{{ $topic->title }}</option>
                            @endforeach
                        </select>
                    </div>

                </form>
            </div>

            <div class="tags-wrapper">
                <div class="tags" id="industry-tags"></div>
                <div class="clear"></div>
            </div>

            <div class="users-wrapper">
                <div class="row users">
                    @if (count($companies))
                        @foreach ($companies as $company)
                            <div id="user-block{{ $company->id }}" class="col-sm-6 col-md-3 user">
                                <div class="user-container">
                                    <div class="inner list">
                                        <div class="full-name">{{ str_limit($company->company, 30) }}</div>
                                        <div class="company">{{ str_limit($company->location, 60) }}</div>
                                        <div class="social-links" style="min-height: 35px">
                                            @if ($company->website)
                                                <a target="_blank" href="{{ adjustUrl($company->website) }}">
                                                    <i class="fas fa-globe-americas fa-lg"></i>
                                                </a>
                                            @endif
                                            @if ($company->linkedin_url)
                                                <a target="_blank" href="{{ adjustUrl($company->linkedin_url) }}">
                                                    <i class="fab fa-linkedin-in fa-lg"></i>
                                                </a>
                                            @endif
                                            @if ($company->twitter_url)
                                                <a target="_blank" href="{{ adjustUrl($company->twitter_url) }}">
                                                    <i class="fab fa-twitter fa-lg"></i>
                                                </a>
                                            @endif
                                            @if ($company->facebook_url)
                                                <a target="_blank" href="{{ adjustUrl($company->facebook_url) }}">
                                                    <i class="fab fa-facebook-f fa-lg"></i>
                                                </a>
                                            @endif
                                            @if ($company->instagram_url)
                                                <a target="_blank" href="{{ adjustUrl($company->instagram_url) }}">
                                                    <i class="fab fa-instagram fa-lg"></i>
                                                </a>
                                            @endif
                                            @if ($company->youtube_url)
                                                <a target="_blank" href="{{ adjustUrl($company->youtube_url) }}">
                                                    <i class="fab fa-youtube fa-lg"></i>
                                                </a>
                                            @endif
                                            @if($company->vimeo_url)
                                                <a target="_blank" href="{{ adjustUrl($company->vimeo_url) }}">
                                                    <i class="fab fa-vimeo fa-lg"></i>
                                                </a>
                                            @endif
                                        </div>
                                        <div onclick="common.openBrandList(this)" class="inner-footer">
                                            SEE CONTACT
                                        </div>
                                    </div>

                                    <div class="inner-hover">
                                        <div onclick="common.closeBrandList(this)" class="inner-header">
                                            CLOSE CONTACT
                                        </div>
                                        <div class="list">
                                            <div class="col-xs-12 text-center"
                                                 style="font-size: 18px;padding-top:5px;font-weight: bold">
                                                {{ str_limit($company->user->full_name, 32) }}
                                            </div>

                                            <div class="col-xs-12 text-center"
                                                 style="line-height:16px;padding-bottom:8px;">
                                                {{ str_limit($company->company, 38) }}
                                            </div>

                                            @if ($company->user->mailnuggets_id)
                                                <div class="col-xs-12">
                                                    <a onclick="common.brandTrackClicks({{ $company->user->id }}, 'email')"
                                                       target="_blank"
                                                       href="mailto:{{$company->user->mailnuggets_id}}">{{ HTML::image('images/icon-email-dark.svg') }}
                                                        Email</a>
                                                </div>

                                            @endif
                                            @if ($company->user->phone_number)
                                                <div class="col-xs-12">
                                                    <a onclick="common.showPhoneNumber({{ $company->user->id }})"> {{ HTML::image('images/icon-phone-dark.svg') }}
                                                        Phone Number </a>
                                                </div>
                                            @endif
                                        </div>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    @elseif (isset($term))
                        <h3 class="section-head text-center m-b-64 no-brands">
                            Your search for “{{ $term }}” shows no results.
                            <br/>
                            <img src="/img/pensive-face-1-f-614@3x.png" alt="pensive-face-not-found"/>
                        </h3>
                    @else
                        <h3 class="section-head text-center m-b-64 no-brands">
                            There are no sources available
                            <br/>
                            <img src="/img/pensive-face-1-f-614@3x.png" alt="pensive-face-not-found"/>
                        </h3>
                    @endif
                </div>

                <input type="hidden" name="offset" value="0"/>

                <div class="showing-count-bottom m-b-64">
                    Showing <span class="count users-showing">{{ count($companies) }}</span>/<span
                            class="users-total">{{ $totalCompanies }}</span> Sources
                </div>
                @if (count($companies) > 11)
                    <div class="text-center">
                        <a href="javascript:void(0);"
                           onclick="common.loadMoreBrands($('#search-industry'), $('.users-wrapper .users'), $('#industry'), $('#topic'));"
                           class="btn btn-white-ylw btn-submit load-more-industries m-b-64">Load More</a>
                    </div>
                @endif
            </div>
        </div>
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="view-phone-number">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">&nbsp;</button>
                <div class="modal-body no-padding-xs">
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
@endsection

@push('js')
    <script>
      $(function () {
        var $slct = $('select#industry').select2({
          maximumSelectionLength: 5,
        })
        var $slct1 = $('select#topic').select2({
          maximumSelectionLength: 5,
        })
      })

      $('.input-group-addon').click(function () {
        $('#brands-search').submit()
      })

      $('#industry, #topic').change(function () {
        $('#brands-search').submit()
      })
    </script>
@endpush