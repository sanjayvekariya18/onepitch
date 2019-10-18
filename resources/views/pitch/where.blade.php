@extends('layouts.simple')

@section('title', 'Where - Pitch')

@section('content')
    <div class="container">
        @include('pitch.pitch_steps', ['step' => 'where'])

        <div class="content">
            <h2 class="text-center">Tell us where your pitch fits,
                <span class="switch-type">topic</span>
                wise.</h2>

            <hr class="small"/>
        </div>
        <input type="hidden" id="pitchId" value="{{ $pitch->id }}">
        <div class="btn-done-wrapper" style="left: 0; max-width: 250px;">
            <a onclick="pitch.saveAsDraft({{ $pitch->id }}, 3)" class="btn save-draft"><i class="material-icons">save</i>Save As Draft</a>
        </div>
 
        <div class="content industry-topics">
        </div>

        <div class="content content-area hidden">
            <form action="" method="POST" class="industries-form">
                <input type="hidden" name="step" value="3">
                <div class="btn-done-wrapper hidden">
                    <button type="submit" class="btn btn-ylw-done">Done, Confirm Pitch<i class="material-icons">arrow_forward</i></button>
                </div>
                <div class="btn-done-wrapper hidden" style="top: 360px;">
                    <button type="button" class="btn btn-ylw-done listOutlets">VIEW OUTLETS<i class="material-icons">place</i></button>
                </div>

                <h3 class="section-head left" style="text-align: center;margin-top: 15px;">
                    <!-- What are the most relevant industries related to your pitch & your brand? -->
                    <span class="hidden-xs pitch-tooltip">
                        <span class="tooltiptext">
                            We recommend selecting at least one industry and no more than five. The more specific industries you can select, the better your chances of reaching the most optimal media contact.
                        </span>
                        <i class="material-icons">info_outline</i>
                    </span>
                    @can('pitch-tool')
                        <span class="pitch-tooltip">
                            <span class="industryDot dot dotrel red"></span>
                            <span class="industryDot tooltiptext insidedot">0/3</span>
                        </span>
                    @endcan
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
                    <a href="javascript:void(0);"
                       onclick="pitch.loadMoreIndustries($('#search-industry'), $('.industries-wrapper .industries'), {{ $pitch->id }});"
                       class="btn btn-white-ylw btn-submit load-more-industries m-b-64">Load More</a>
                </div>
            </div>
        </div>
    </div>
    <style>.swal-button--cancelHideBtn{display:none;}
    .swal2-popup{    width: 75%;}
    .swal2-content{    overflow-y: scroll;
    height: 500px;overflow-x: hidden;
    padding: 0 10px 0 0px;}
    </style>
@endsection

@push('js')
<!-- <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script> -->
<script>
    var landedTopicId = {{!empty($landedTopicId) ? $landedTopicId : 0}};

    $(function(){
		pitch.loadPitchTopics({{ $pitch->id }}).done(function (response) {
		    if(landedTopicId){
                $('#topic-input'+landedTopicId).trigger('click');
            }
        });

		tags.bind('#industry-tags', 'industry', 'industryAddCallback');

		@foreach($selected_industry as $selected)
            tags.addTag('{{ $selected['industry']->title }}', '{{ $selected['json'] }}', '{{ $selected['industry']->id }}')
        @endforeach
    
    
        $('.listOutlets').on('click',function(){
            pitch.$topics = common.getFormData($('.topics-form'), 'topics');
            //console.log(pitch.$topics.topics);
            var data = new Array();
            data['topics'] = pitch.$topics.topics;
            data['industry'] = new Array();
            $('#industry-tags .tag').each(function () {
                var id = $(this).attr('id').replace('industry', '');
                data['industry'].push(id);
            });
            if(data['topics'].length===0 && data['industry'].length===0){
                return false;
            }
            var html2display = '';
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", "https://cdn.jsdelivr.net/npm/sweetalert2@8");
            document.body.appendChild(script);
            var topicsJ = JSON.stringify(data['topics']);
            var industryJ = JSON.stringify(data['industry']);
            var script = document.createElement("script");
            script.setAttribute("type", "text/javascript");
            script.setAttribute("src", "https://cdn.jsdelivr.net/npm/sweetalert2@8");
            document.body.appendChild(script);
            $.ajax({
                type: "POST",
                url: laroute.route('get_matching_outlets'),
                data: {topic: topicsJ, industry: industryJ},
                success: function(data){
                    html2display += '<div class="content industry-topics"><div class="row topics m-b-64">';
                    for (var i = 0; i < data.length; i++) { 
                        html2display += '<div class="col-sm-6 topic"><div class="topic-inner checkbox-wrapper list"><div class="topic-title"><span>'+data[i].company+'</span></div><div class="clear"></div></div></div>';
                    }
                    html2display += '</div></div>';
                    Swal.fire({
                        title: 'Based on your selected topic and industries, these are the recommended outlets:',
                        // type: 'info',
                        html: html2display,
                        showCloseButton: true,
                        showConfirmButton: false,
                        // showCancelButton: true,
                        // focusConfirm: false,
                        // confirmButtonText:
                        //     '<i class="fa fa-thumbs-up"></i> Great!',
                        // confirmButtonAriaLabel: 'Thumbs up, great!',
                        // cancelButtonText:
                        //     '<i class="fa fa-thumbs-down"></i>',
                        // cancelButtonAriaLabel: 'Thumbs down',
                    });
                }
            });            
            //console.log(html2display);
            

        });
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
    var tourCount = {!! json_encode((array)auth()->user()->tour->pitch_where) !!};

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
                    title: "Select Your Pitch Topics",
                    content: "Select at least one topic to categorize your pitch and move on to the next step.",
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
                    content: "Hover over this icon to reference best practices provided directly from journalists."
                },
                {
                    element: ".custom-topic:first",
                    placement: "top",
                    title: "Suggest A Topic",
                    content: "Check the box to add a custom topic. Note your topic will be displayed on the pitch but not cateogrized for the journalists receiving the pitch."
                },
                {
                    element: ".event-topic",
                    placement: "top",
                    title: "Time Sensitive Topic",
                    content: "Add an event, offer an exclusive or embargo by checking this box."
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
                    content: "Select at least one industry, related to the brand/source you're pitching to categorize your pitch.<br><br>You MUST select one industry to proceed to the next step.",
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
                        if ($('.pitch-industries').find('.checked').length > 0) {
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
                    content: "Hover over this icon to reference best practices provided directly from journalists."
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
                    title: "Submit Your Pitch",
                    content: "Click this button to submit your pitch for approval. Note you will receive a confirmation email to verify the information before it has been approved.",
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
                common.validateWalkthroughEnd('pitch_where');
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
            title: 'Based on your pitch, these are the recommended topics:',
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
                common.validateFieldCountAndShowColor(null,'topics');


              pitch.loadPitchIndustries({{ $pitch->id }});

            } else if (response == 'select') {
                Object.keys(topicRecommendations).forEach(
                    function (item) {
                        var inputTopicElm = $('input#topic-input' + item);
                        inputTopicElm.prop('checked', true);
                        common.selectIndustryTopic(inputTopicElm.parent());
                    }
                )
              common.validateFieldCountAndShowColor(null,'topics');
            }
        });
    }

</script>
@endpush