@extends('layouts.simple')

@section('title', 'Where - Inquiry')

@section('content')
    <div class="container">
        @include('inquiry.inquiry_steps', ['step' => 'where'])

        <div class="content">
            <h2 class="text-center">Tell us where your inquiry fits,
                <span class="switch-type">topic</span>
                wise.</h2>

            <hr class="small"/>
        </div>

        <div class="btn-done-wrapper" style="left: 0; max-width: 250px;">
            <a onclick="inquiry.saveAsDraft({{ $inquiry->id }}, 3)" class="btn save-draft"><i class="material-icons">save</i>Save As Draft</a>
        </div>

        <div class="content industry-topics">
        </div>

        <div class="content content-area hidden">
            <form action="" method="POST" class="industries-form">
                <input type="hidden" name="step" value="3">
                <div class="btn-done-wrapper hidden">
                    <button type="submit" class="btn btn-ylw-done">Done, Confirm Inquiry<i class="material-icons">arrow_forward</i></button>
                </div>

                <h3 class="section-head left" style="    text-align: center;
    margin-left: 3px;
    margin-top: 20px;">
                    <!-- What are the most relevant industries related to your inquiry? -->
                    <span class="hidden-xs pitch-tooltip">
                        <span class="tooltiptext">
                            We recommend selecting all relevant industries related to this inquiry. Keep in mind: the more specific industries you can select, the better your chances of reaching the most optimal sources.
                        </span>
                        <i class="material-icons">info_outline</i>
                    </span>
                </h3>

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
                        <div class="select-all-wrap showing-count" style="    margin-top: 20px;">
                            <div class="check-box">
                                <input type="checkbox" onchange="inquiry.selectAllIndustries(this)"/>
                                <span class="check-mark">
                                    <i class="material-icons">done</i>
                                </span>
                            </div>

                            Select All
                        </div>
                    </div>
                </div>

                <div class="tags-wrapper">
                    <div class="tags" id="industry-tags"></div>
                    <div class="clear"></div>
                </div>

            </form>

            <div class="industries-wrapper">
                <div class="row industries inquiry-industries"></div>

                <input type="hidden" name="offset" value="0" />

                <div class="showing-count-bottom m-b-64">
                    Showing <span class="count industries-showing"></span>/<span class="industries-total"></span> Industries
                </div>
                <div class="text-center">
                    <a href="javascript:;"
                       onclick="inquiry.loadMoreIndustries($('#search-industry'), $('.industries-wrapper .industries'), {{ $inquiry->id }});"
                       class="btn btn-white-ylw btn-submit load-more-industries m-b-64">Load More</a>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script>
        var landedTopicId = {{!empty($landedTopicId) ? $landedTopicId : 0}};

        $(function(){
            inquiry.loadInquiryTopics({{ $inquiry->id }}).done(function (response) {
                if(landedTopicId){
                    $('#topic-input'+landedTopicId).trigger('click');
                }
            });

            tags.bind('#industry-tags', 'industry', 'industryAddCallback');

            @foreach($selected_industry as $selected)
            tags.addTag('{{ $selected['industry']->title }}', '{{ $selected['json'] }}', '{{ $selected['industry']->id }}')
            @endforeach
        });

        function industryAddCallback(tags) {
            if ($(tags+' .tag').length) {
                $('.industries-form .btn-done-wrapper').removeClass('hidden');
            } else {
                $('.industries-form .btn-done-wrapper').addClass('hidden');
            }

            common.unselectIndustryBlocks();
            $(tags+' .tag').each(function(){
                var id = $(this).attr('id').replace('industry', '');
                common.selectIndustryBlock(id);
            });
        }

        var role = {!! json_encode((array)auth()->user()->role) !!};
        var tourCount = {!! json_encode((array)auth()->user()->tour->inquiry_where) !!};

        if (tourCount.toString() < 2) {
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
                        element: ".industry-topics",
                        placement: "top",
                        title: "Select Your Topics",
                        content: "Select at least one topic to categorize your inquiry.<br><br>You MUST select a topic to proceed to the next step.",
                        template: `<div class='popover tour'>
                            <div class='arrow'></div>
                            <h3 class='popover-title'></h3>
                            <div class='popover-content'></div>
                            <div class='popover-navigation'>
                                <div class='btn-group'>
                                    <button class='btn btn-default' data-role='prev'>« Prev</button>
                                    <button class='btn btn-default allow-continue' disabled data-role='next'>Next »</button>
                                </div>
                                <button class='btn btn-default' data-role='end'>End tour</button>
                            </div>
                           </div>`,
                        onShown: function () {
                            console.log($('.topics-form').find('.checked').length);
                            if ($('.topics-form').find('.checked').length > 0) {
                                $('.allow-continue').prop('disabled', false);
                            } else {

                                $('.allow-continue').prop('disabled', true);
                            }
                        }
                    },
                    {
                        element: ".pitch-tooltip:first",
                        placement: "left",
                        title: "Need A Tip?",
                        content: "Hover over this icon to reference tips and recommendations for categorizing your inquiry."
                    },
                    {
                        element: ".custom-topic:first",
                        placement: "top",
                        title: "Suggest A Topic",
                        content: "Check the box to add a custom topic. Note your topic will be displayed on the inquiry but not cateogrized for the publicists receiving the inquiry."
                    },
                    {
                        element: ".event-topic",
                        placement: "top",
                        title: "Time Sensitive Topic",
                        content: "Add a date or timestamp related to your inquiry. You can also specify here WHEN you need responses by."
                    },
                    {
                        element: "#add-topics",
                        placement: "top",
                        title: "Complete This Section",
                        content: "Click NEXT once you have selected at least one topic. If you're missing information above, the NEXT button will remain gray and unclickable.<br><br>DO NOT click END TOUR if you want to proceed to the last step of the inquiry upload workflow.",
                        template: `<div class='popover tour'>
                            <div class='arrow'></div>
                            <h3 class='popover-title'></h3>
                            <div class='popover-content'></div>
                            <div class='popover-navigation'>
                                <div class='btn-group'>
                                    <button class='btn btn-default' data-role='prev'>« Prev</button>
                                    <!--<button class='btn btn-default topic-select' disabled data-role='next'>Next »</button>-->
                                </div>
                                <button class='btn btn-default' data-role='end'>End tour</button>
                            </div>
                           </div>`
                    },
                    {
                        element: ".content-area",
                        placement: "top",
                        title: "Select Your Industries",
                        content: "Select at least one industry, related to the source(s) you're looking for, to categorize your inquiry.<br><br>You MUST select a topic to proceed to the next step.",
                        template: `<div class='popover tour'>
                            <div class='arrow'></div>
                            <h3 class='popover-title'></h3>
                            <div class='popover-content'></div>
                            <div class='popover-navigation'>
                                <div class='btn-group'>
                                    <!--<button class='btn btn-default' data-role='prev'>« Prev</button>-->
                                    <button class='btn btn-default select-industry-continue' disabled data-role='next'>Next »</button>
                                </div>
                                <button class='btn btn-default' data-role='end'>End tour</button>
                            </div>
                           </div>`,
                        onShown: function () {
                            if ($('.inquiry-industries').find('.checked').length > 0) {
                                $('.select-industry-continue').prop('disabled', false);
                            } else {

                                $('.select-industry-continue').prop('disabled', true);
                            }
                        }
                    },
                    {
                        element: ".pitch-tooltip",
                        placement: "left",
                        title: "Need A Tip?",
                        content: "Hover over this icon to reference tips and recommendations for categorizing your inquiry."
                    },
                    {
                        element: ".white-input",
                        placement: "bottom",
                        title: "Search Industries",
                        content: "Type in the keywords related to an industry to filter the list of industry options."
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
                        title: "Submit Your Inquiry",
                        content: "Click this button to submit your inquiry for approval. Note you will receive a confirmation email to verify the information before it has been approved.",
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
                    common.validateWalkthroughEnd('inquiry_where');
                }
            });

            // Initialize the tour
            tour.init();

            // Start the tour
            tour.start();
        }

        var topicRecommendations = {!! json_encode($topicRecommendations) !!};
        var industryRecommendations = {!! json_encode($industryRecommendations) !!};

        if (topicRecommendations.toString()) {
            swal({
                title: 'Based on your inquiry, these are the recommended topics:',
                text: common.listIndustryTopicsName(Object.values(topicRecommendations)),
                buttons: {
                    cancelIndustry: {
                        text: "Cancel",
                        value: "cancel",
                    },
                    confirmSelection: {
                        text: "Confirm",
                        value: "confirm",
                    },
                    select: {
                        text: "Select More",
                        value: "select",
                    },
                },
            }).then(function(response) {
                if(response == 'confirm') {
                    // console.log($('input#topic-input' + Object.keys(topicRecommendations)[0]).parent())
                    var selected = $('.topic-inner.checked');
                    selected.map(function () {
                        $(this).find('.check-circle > input')[0].click();
                    })
                    Object.keys(topicRecommendations).forEach(
                        function (item) {
                            $('input#topic-input' + item).prop('checked', true);
                            common.selectIndustryTopic($('input#topic-input' + item).parent());
                        }
                    )
                    inquiry.loadInquiryIndustries({{ $inquiry->id }});
                } else if (response == 'select') {
                    Object.keys(topicRecommendations).forEach(
                        function (item) {
                            $('input#topic-input' + item).prop('checked', true);
                            common.selectIndustryTopic($('input#topic-input' + item).parent());
                        }
                    )
                }
            });
        }
    </script>
@endpush