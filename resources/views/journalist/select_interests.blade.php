@extends('layouts.simple')

@section('title', 'Interests')

@section('content')
    <div class="container">
        @if (!$edit)
            @include('journalist.profile_steps', ['step' => 'interests'])
        @endif

        <div class="content content-area">
            <h2 class="text-center" id="page-head">
                @if (!$edit)
                    First, what industries do you cover?
                @else
                    What industries do you cover?
                @endif
            </h2>

            <hr class="small"/>

            <form action="" method="POST" class="industries-form">
                <div class="btn-done-wrapper hidden">
                    <button type="submit" class="btn btn-ylw-done">Done with interests<i class="material-icons">arrow_forward</i></button>
                </div>

                <h3 class="section-head left m-b-0">Pick one industry at a time.</h3>
                <div class="sub-section-head">(You can edit this later)</div>

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
                            Showing <span class="count industries-showing"></span>/<span class="industries-total"></span> Industries
                        </div>
                    </div>
                </div>

                <div class="tags-wrapper">
                    <div class="tags" id="industry-tags"></div>
                    <div class="clear"></div>
                </div>

            </form>

            <div class="industries-wrapper">
                <div class="row industries pitch-industries"></div>

                <input type="hidden" name="offset" value="0" />

                <div class="showing-count-bottom m-b-64">
                    Showing <span class="count industries-showing"></span>/<span class="industries-total"></span> Industries
                </div>
                <div class="text-center">
                    <a href="javascript:;"
                       onclick="common.loadMoreIndustries($('#search-industry'), $('.industries-wrapper .industries'), {{ $user->id }});"
                       class="btn btn-white-ylw btn-submit load-more-industries m-b-64">Load More</a>
                </div>
            </div>
        </div>

        <div class="content industry-topics hidden"></div>
    </div>
@endsection

@push('js')
<script>
    $(function(){
    	common.bindSearchIndustries($('#search-industry'), $('.industries-wrapper .industries'), '{{ $user->id }}');

    	tags.bind('#industry-tags', 'industry', 'industryAddCallback');
    	@foreach($selected_industry as $selected)
            tags.addTag('{{ $selected['industry']->title }}', '{{ $selected['json'] }}', '{{ $selected['industry']->id }}')
        @endforeach
    });

    function industryAddCallback(tags) {
    	if ($(tags+' .tag').length) {
            $('.industries-form .btn-done-wrapper').removeClass('hidden');

			@if (!$edit)
            $('#page-head').text('What other industries do you cover?');
            @endif
        } else {
			$('.industries-form .btn-done-wrapper').addClass('hidden');

			@if (!$edit)
			$('#page-head').text('First, what industries do you cover?');
			@endif
        }

		common.unselectIndustryBlocks();
		$(tags+' .tag').each(function(){
			var id = $(this).attr('id').replace('industry', '');
			common.selectIndustryBlock(id);
        });
    }

    var tourCount = {!! json_encode((array)auth()->user()->tour->interests) !!};
    var vcUser = {!! $user->vc !!};


    if (tourCount.toString() < 2 && !vcUser) {
        var tour = new Tour({
            storage: false,
            backdrop: true,
            backdropPadding: {
                top: 8,
                left: 10,
                bottom: 13,
                right: 10
            },
            steps: [
                {
                    element: ".content-area",
                    placement: "top",
                    title: "List of All Industries",
                    content: "Your complete list of industries that you can subscribe to for your brand/client.",
                    backdropPadding: {
                        top: 8,
                        left: 10,
                        bottom: 0,
                        right: 10
                    }
                },
                {
                    element: ".white-input",
                    placement: "bottom",
                    title: "Search Industries",
                    content: "Type in the keywords related to an industry to filter the list of industry options.",
                    backdropPadding: {
                        top: 8,
                        left: 10,
                        bottom: 12,
                        right: 15
                    }
                },
                {
                    element: ".industries-wrapper",
                    placement: "top",
                    title: "Select Your Industries",
                    content: "Select at least one industry related to your writing interests which reflect pitches submitted by publicists.<br><br>You MUST select one industry to proceed to the next step.",
                    backdropPadding: {
                        top: 8,
                        left: 10,
                        bottom: 0,
                        right: 10
                    },
                    template: `<div class='popover tour'>
                            <div class='arrow'></div>
                            <h3 class='popover-title'></h3>
                            <div class='popover-content'></div>
                            <div class='popover-navigation'>
                                <div class='btn-group'>
                                    <button class='btn btn-default' data-role='prev'>« Prev</button>
                                    <button class='btn btn-default' disabled data-role='next'>Next »</button>
                                </div>
                                <button class='btn btn-default' data-role='end'>End tour</button>
                            </div>
                           </div>`
                },
                {
                    element: ".industry-topics",
                    placement: "left",
                    title: "Select Your Topics",
                    content: "Select at least one topic related to your writing interests which reflect pitches submitted by publicists.<br><br>You MUST select one topic to proceed to next step.",
                    template: `<div class='popover tour'>
                            <div class='arrow'></div>
                            <h3 class='popover-title'></h3>
                            <div class='popover-content'></div>
                            <div class='popover-navigation'>
                                <div class='btn-group'>
                                    <button class='btn btn-default' data-role='prev'>« Prev</button>
                                    <button class='btn btn-default topic-select' disabled data-role='next'>Next »</button>
                                </div>
                                <button class='btn btn-default' data-role='end'>End tour</button>
                            </div>
                           </div>`
                },
                {
                    element: ".select-all-wrap",
                    placement: "bottom",
                    title: "Select All Topics",
                    content: "Click this button to subscribe to ALL topics listed related to the industry selected on the previous page. "
                },
                {
                    element: "#add-topics",
                    placement: "top",
                    title: "Complete Your Subscriptions",
                    content: "Click this button to complete and confirm your writing interests (i.e. pitch subscriptions).<br><br>Note: you can add more subscriptions on the next page by clicking NEXT.",
                    template: `<div class='popover tour'>
                            <div class='arrow'></div>
                            <h3 class='popover-title'></h3>
                            <div class='popover-content'></div>
                            <div class='popover-navigation'>
                                <div class='btn-group'>
                                    <button class='btn btn-default' data-role='prev'>« Prev</button>
                                    <!--<button class='btn btn-default' disabled data-role='next'>Next »</button>-->
                                </div>
                                <button class='btn btn-default' data-role='end'>End tour</button>
                            </div>
                           </div>`
                },
                {
                    element: ".content-area",
                    placement: "left",
                    title: "Subscribe to More",
                    content: "Follow the same work flow as before to subscribe to another industry and set of topics."
                },
                {
                    element: ".load-more-industries",
                    placement: "top",
                    title: "Load More Industries",
                    content: "Click this button to view a full list of industry options."
                },
                {
                    element: ".btn-ylw-done",
                    placement: "left",
                    title: "Submit Pitch Subscription",
                    content: "Click this button to submit and confirm your subscription to writing interests (i.e. pitch subscriptions).",
                    template: `<div class='popover tour'>
                            <div class='arrow'></div>
                            <h3 class='popover-title'></h3>
                            <div class='popover-content'></div>
                            <div class='popover-navigation'>
                                <div class='btn-group'>
                                    <button class='btn btn-default' data-role='prev'>« Prev</button>
                                    <!--<button class='btn btn-default' data-role='next'>Next »</button>-->
                                </div>
                                <button class='btn btn-default' data-role='end'>End tour</button>
                            </div>
                            <p class='popover-navigation'>
                                <input id="no-more-tour" type="checkbox"><span>Don't show me this again</span>
                            </p>
                           </div>`
                }
            ],
            onEnd: function (tour) {
                common.validateWalkthroughEnd('interests');
            }
        });

        // Initialize the tour
        tour.init();

        // Start the tour
        tour.start();
    }
</script>
@endpush