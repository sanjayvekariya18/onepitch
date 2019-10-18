@extends('layouts.simple')

@section('title', 'Why - Inquiry')

@section('content')
    <div class="container">
        @include('inquiry.inquiry_steps', ['step' => 'why'])

        <div class="content">
            <h2 class="text-center">So, what information do you want?</h2>

            <hr class="small"/>

            <div class="btn-done-wrapper" style="left: 0; max-width: 250px;">
                <a onclick="inquiry.saveAsDraft({{ $inquiry->id }}, 2)" class="btn save-draft"><i class="material-icons">save</i>Save As Draft</a>
            </div>

            <h3 class="section-head left sub-section-head">
                Tell us in no more than 280 characters.
                <span class="hidden-xs pitch-tooltip" style="position: absolute;margin-top: -1px;">
                        <span class="tooltiptext">
                            Think of this section as the 3 most important pieces of information you need to write your story. Do you need images, a source bio, pricing and specs, etc. Be specific to receive exactly what you need.
                        </span>
                        <i class="material-icons">info_outline</i>
                    </span>
            </h3>

            <form id="signup-form" action="{{ route('inquiry_why') }}" method="post" data-parsley-focus="none">
                <input type="hidden" name="step" value="2">
                <div class="row">
                    <div class="col-sm-12 textarea-bullet one-line">
                        <div class="bullet">
                            <img src="/img/icon-bulletnumber-1.svg">
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" name="points[]" placeholder="Explain what you want in a bullet here. You have 280 characters."
                                      onkeypress="common.preventEnterKey(event);" onkeyup="common.charsCount(this);" required maxlength="280">{{ $inquiry ? $inquiry->why_point_1 : '' }}</textarea>
                            <label>Explain what you want in a bullet here. You have 280 characters.</label>
                            <div class="counter for-textarea"></div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 textarea-bullet one-line">
                        <div class="bullet">
                            <img src="/img/icon-bulletnumber-2.svg">
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" name="points[]" placeholder="This bullet is optional. You still have 280 characters."
                                      onkeypress="common.preventEnterKey(event);" onkeyup="common.charsCount(this);" maxlength="280">{{ $inquiry ? $inquiry->why_point_2 : '' }}</textarea>
                            <label>This bullet is optional. You still have 280 characters.</label>
                            <div class="counter for-textarea"></div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 textarea-bullet one-line">
                        <div class="bullet">
                            <img src="/img/icon-bulletnumber-3.svg">
                        </div>
                        <div class="form-group">
                            <textarea class="form-control" name="points[]" placeholder="This bullet is optional. You still have 280 characters."
                                      onkeypress="common.preventEnterKey(event);" onkeyup="common.charsCount(this);" maxlength="280">{{ $inquiry ? $inquiry->why_point_3 : '' }}</textarea>
                            <label>This bullet is optional. You still have 280 characters.</label>
                            <div class="counter for-textarea"></div>
                        </div>
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
        });

        var tourCount = {!! json_encode((array)auth()->user()->tour->inquiry_want) !!};

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
                        title: "What Info Do You WANT?",
                        content: "Specify what specific information you WANT from the publicist (i.e. images, quotes, type of source, etc.) to write your story."
                    },
                    {
                        element: ".pitch-tooltip:first",
                        placement: "left",
                        title: "Need A Tip?",
                        content: "Hover over this icon to reference tips and recommendations for an idea of the information typically asked for. Refer to the past step for examples.",
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
                        content: "Click NEXT (ALMOST DONE) once you have completed this section. You must include at least one WANT bullet to proceed.<br><br>Click END TOUR to proceed to the next step.",
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
                    common.validateWalkthroughEnd('inquiry_want');
                }
            });

            // Initialize the tour
            tour.init();

            // Start the tour
            tour.start();
        }
    </script>
@endpush