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
                        <div class="col-xs-12 text-center" style="font-size: 18px;padding-top:5px;font-weight: bold">
                            {{ str_limit($company->user->full_name, 32) }}
                        </div>

                        <div class="col-xs-12 text-center" style="line-height:16px;padding-bottom:8px;">
                            {{ str_limit($company->company, 38) }}
                        </div>

                        @if ($company->user->mailnuggets_id)
                            <div class="col-xs-12">
                                <a onclick="common.brandTrackClicks({{ $company->user->id }}, 'email')"
                                   target="_blank"
                                   href="mailto:{{$company->user->mailnuggets_id}}">{{ HTML::image('images/icon-email-dark.svg') }} Email</a>
                            </div>

                        @endif
                        @if ($company->user->phone_number)
                            <div class="col-xs-12">
                                <a onclick="common.showPhoneNumber({{ $company->user->id }})"> {{ HTML::image('images/icon-phone-dark.svg') }} Phone Number </a>
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

<script>
    var count = $('.user').length;
    var total = {{ $totalCompanies }};


    $('.users-showing').text(count);
    $('.users-total').text(total);
    $('input[name="offset"]').val('{{ $offset }}');

    if (count < total) {
        $('.load-more-industries').removeClass('hidden');
    } else {
        $('.load-more-industries').addClass('hidden');
    }
</script>