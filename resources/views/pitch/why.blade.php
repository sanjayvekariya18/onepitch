@extends('layouts.simple')

@section('title', 'What & Why - Pitch')

@section('content')
    <div class="container">
        @include('pitch.pitch_steps', ['step' => 'why'])

        <div class="content">
            {{--<h3 class="section-head left m-b-0"></h3>--}}
            <h2 class="text-center">Now, what’s the pitch?</h2>

            <hr class="small"/>

            <div class="btn-done-wrapper" style="left: 0; max-width: 250px;">
                <a onclick="pitch.saveAsDraft({{ $pitch->id }}, 1)" class="btn save-draft"><i class="material-icons">save</i>Save As Draft</a>
            </div>
            <div class="sub-section-head">Tell us in no more than 280 characters.</div>
            <form id="signup-form" action="{{ route('pitch_why') }}" method="post" data-parsley-focus="none">
                <input type="hidden" name="step" value="2">
                <div class="row">
                    <div class="col-sm-11">
                        {{--<div class="bullet">--}}
                        {{--<img src="/img/icon-bulletnumber-1.svg">--}}
                        {{--</div>--}}
                        <div class="form-group">
                                <textarea id="what1" class="form-control" name="what_points[]" placeholder="Describe what in a bullet here. You have 280 characters."
                                          onkeypress="common.preventEnterKey(event);" onkeyup="common.charsCount(this);common.validateFieldCountAndShowColor(this,'what');"   onload="common.validateFieldCountAndShowColor(this,'what');" required maxlength="280">{{ $pitch ? $pitch->what_point_1 : '' }}</textarea>
                            {{--<label>Tell us in no more than 280 characters.</label>--}}
                            <div class="counter for-textarea"></div>
                        </div>
                    </div>

                    <div class="col-sm-1 hidden-xs">
                        <span class="pitch-tooltip">
                        <i class="material-icons">info_outline</i>
                        <span class="tooltiptext">What newsworthy action is the brand taking? <br/> Specify the angle of your pitch here and make sure to keep it short & specific.
                            </span>
                        </span>
                        @can('pitch-tool')
                            <span class="pitch-tooltip">
                                <span class="dot green"></span>
                                <span class="tooltiptext insidedot">0/40</span>
                            </span>
                        @endcan
                    </div>
                </div>

                <h2 class="text-center">Why is your pitch important?</h2>

                <hr class="small"/>

                <h3 class="section-head left" style="    margin-top: 0px;">
                     <!-- Why would your ideal media contact care about this pitch? -->
                    @can('pitch-tool')
                        <span class="pitch-tooltip" id="why_general">
                            <span class="whyDot dot dotrel red"></span>
                            <span class="whyDot tooltiptext insidedot">0/3</span>
                        </span>
                    @endcan
                </h3>

                <div class="sub-section-head">Tell us in no more than 3 bullet points.</div>

                <div class="row">
                    <div class="col-sm-11 textarea-bullet one-line">
                        <div class="bullet">
                            <img src="/img/icon-bulletnumber-1.svg">
                        </div>
                        <div class="form-group">
                            <textarea id="why1" class="form-control" name="points[]" placeholder="Describe why in a bullet here. You have 280 characters."
                                      onkeypress="common.preventEnterKey(event);" onkeyup="common.charsCount(this);common.validateFieldCountAndShowColor(this,'why');" onload="common.validateFieldCountAndShowColor(this,'why');" required maxlength="280">{{ $pitch ? $pitch->why_point_1 : '' }}</textarea>
                            <label>Describe why in a bullet here. You have 280 characters.</label>
                            <div class="counter for-textarea"></div>
                        </div>
                    </div>
                    <div class="col-sm-1 hidden-xs">
                        <span class="pitch-tooltip">
                            <span class="tooltiptext">Why would the ideal AUDIENCE be interested in this? <br/> What is/are the benefits to the audience?</span>
                            <i class="material-icons">info_outline</i>
                        </span>
                        @can('pitch-tool')
                            <span class="pitch-tooltip">
                                <span class="dot green"></span>
                                <span class="tooltiptext insidedot">0/80</span>
                            </span>
                        @endcan
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-11 textarea-bullet one-line">
                        <div class="bullet">
                            <img src="/img/icon-bulletnumber-2.svg">
                        </div>
                        <div class="form-group">
                            <textarea id="why2" class="form-control" name="points[]" placeholder="This bullet is optional. You still have 280 characters."
                                      onkeypress="common.preventEnterKey(event);" onkeyup="common.charsCount(this);common.validateFieldCountAndShowColor(this,'why');" onload="common.validateFieldCountAndShowColor(this,'why');" maxlength="280">{{ $pitch ? $pitch->why_point_2 : '' }}</textarea>
                            <label>This bullet is optional. You still have 280 characters.</label>
                            <div class="counter for-textarea"></div>
                        </div>
                    </div>

                    <div class="col-sm-1 hidden-xs">
                        <span class="pitch-tooltip">
                            <span class="tooltiptext">What is the potential impact? Will there be major news stories following along? Is it going to “disrupt” an industry?
                                <span style="font-style: italic">
                                    <br/>
                                    (Kidding, please don't use the word “disrupt,” journalists hate that sh*t)
                                </span>.</span>
                            <i class="material-icons">info_outline</i>
                        </span>
                        @can('pitch-tool')
                            <span class="pitch-tooltip">
                                <span class="dot green"></span>
                                <span class="tooltiptext insidedot">0/80</span>
                            </span>
                        @endcan
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-11 textarea-bullet one-line">
                        <div class="bullet">
                            <img src="/img/icon-bulletnumber-3.svg">
                        </div>
                        <div class="form-group">
                            <textarea id="why3" class="form-control" name="points[]" placeholder="This bullet is optional. You still have 280 characters."
                                      onkeypress="common.preventEnterKey(event);" onkeyup="common.charsCount(this);common.validateFieldCountAndShowColor(this,'why');"  onload="common.validateFieldCountAndShowColor(this,'why');" maxlength="280">{{ $pitch ? $pitch->why_point_3 : '' }}</textarea>
                            <label>This bullet is optional. You still have 280 characters.</label>
                            <div class="counter for-textarea"></div>
                        </div>
                    </div>

                    <div class="col-sm-1 hidden-xs">
                        <span class="pitch-tooltip">
                            <span class="tooltiptext">What stats, metrics, numbers can be used to back up WHY the most ideal media contact would want to pursue this story?</span>
                            <i class="material-icons">info_outline</i>
                        </span>
                        @can('pitch-tool')
                            <span class="pitch-tooltip">
                                <span class="dot green"></span>
                                <span class="tooltiptext insidedot">0/80</span>
                            </span>
                        @endcan
                    </div>
                </div>

                <div class="text-center submit-wrapper">
                    <button type="submit" class="btn btn-white-ylw btn-submit submitter" disabled>Next (almost done)</button>
                </div>
            </form>
        </div>
    </div>
@endsection

@push('js')
<script>
	$(function(){
		common.bindFormValidation();
        $('#why1').keyup();
        $('#why2').keyup();
        $('#why3').keyup();
        $('#what1').keyup();
    });

    var tourCount = {!! json_encode((array)auth()->user()->tour->pitch_why) !!};

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
                    element: ".content",
                    placement: "top",
                    title: "WHAT is your pitch & WHY is it newsworthy?",
                    content: "Explain what you're pitching and why it's relevant to the journalist and their audience."
                },
                {
                    element: ".pitch-tooltip:first",
                    placement: "left",
                    title: "Need A Tip?",
                    content: "Hover over this icon to learn the specific information journalists want to determine WHY your pitch is relevant to them, and their audience.",
                    backdropPadding: {
                        top: 12,
                        left: 0,
                        bottom: 0,
                        right: -25
                    }
                },
                {
                    element: ".btn-submit",
                    placement: "top",
                    title: "Complete This Section",
                    content: "Click NEXT (ALMOST DONE) once you have filled out the required fiels above. Any fields that need text entered will be highlighted in red.",
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
                common.validateWalkthroughEnd('pitch_why');
            }
        });

        // Initialize the tour
        tour.init();

        // Start the tour
        tour.start();
    }
</script>
@endpush