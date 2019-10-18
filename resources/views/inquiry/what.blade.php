@extends('layouts.simple')

@section('title', 'What - Inquiry')

@section('content')
<style>
.pitch-tooltip.showonright .tooltiptext{    right: auto;
    margin-left: 0;}
    .pitch-tooltip.showonright .tooltiptext:after{       left: 12px;}
    </style>
    <div class="container">
        @include('inquiry.inquiry_steps', ['step' => 'what'])

        <div class="content">
            <h2 class="text-center">Tell us your inquiry!</h2>

            <hr class="small"/>

            <div class="btn-done-wrapper" style="left: 0; max-width: 250px;">
                <a onclick="inquiry.saveAsDraft({{ $inquiry->id }}, 1)" class="btn save-draft"><i
                            class="material-icons">save</i>Save As Draft</a>
            </div>

            <h3 class="section-head left">
            <!-- First, what's the summary? -->
            </h3>

            <form id="signup-form" action="{{ route('inquiry_what') }}" method="post" data-parsley-focus="none"
                  enctype="multipart/form-data">
                <input type="hidden" name="step" value="1">
                <div class="row">
                    <div class="form-group col-sm-12" id="subjectPickerContainer">
                        <div class="emoji-picker-wrapper">
                            <input type="text" class="form-control" name="subject" id="subject"
                                   placeholder="Add your subject line here - 40 characters max."
                                   value="{{ $inquiry ? $inquiry->subject : '' }}" onkeyup="common.charsCount(this);"
                                   required maxlength="40" data-parsley-errors-container="#subjectErrors"
                                   style="width: 95%;display:inline">
                            <i class="far fa-smile fa-lg launcher" id="subjectPickerLauncher" aria-hidden="true"></i>
                            <div id="subjectErrors"></div>
                        </div>
                        <label for="subject">Add your subject line here - 40 characters max.</label>
                        <div class="counter"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-6">
                        <input type="text" class="form-control" name="company" id="company"
                               placeholder="What Publication/Outlet are you inquiring for?"
                               value="{{ $inquiry ? $inquiry->company : '' }}" required>
                        <label for="company">What Publication/Outlet are you inquiring for?</label>
                    </div>

                    <div class="form-group col-sm-12">
                        <input type="url" class="form-control" name="website" id="website" placeholder="Add a link here."
                               value="{{ $inquiry ? $inquiry->website : '' }}">
                        <label class="website">Add a link here.</label>
                    </div>
                </div>

                <div class="single-photo-upload files">
                    <div class="photo-rnd">
                        <div class="photo-preview-wrapper" onclick="common.openSinglePhotoUploader(this);">
                            <i class="material-icons">add</i>
                            <img class="photo-preview" id="user-photo"
                                 src="{{ getPreviewFileUrl($inquiry->files[0]->url) }}"/>
                        </div>
                    </div>
                    @if($inquiry->files[0])
                        <span class="close-button show"
                              onclick="common.removeSingleFile('file_input_file_1', 'file_input_text_1')">
                            <i class="material-icons close-icon">cancel</i>
                        </span>
                    @else
                        <span class="close-button"
                              onclick="common.removeSingleFile('file_input_file_1', 'file_input_text_1')">
                            <i class="material-icons close-icon">cancel</i>
                        </span>
                    @endif
                    {{--<input type="file" name="file_1" id="file_input_file" class="none" onchange="common.onSinglePhotoSelected(event);"/>--}}
                    <div class="file_input_div">
                        <div class="file_input">
                            <label class="file_input_label">
                                <i class="material-icons">file_upload</i>
                                <input type="file" name="file_1" id="file_input_file_1" class="none file_input_file"
                                       onchange="common.onFileSelected(event);"/>
                            </label>
                        </div>
                        <div class="file_input_text_div">
                            <input class="file_input_text mdl-textfield__input" type="text" disabled readonly
                                   id="file_input_text_1" placeholder="No file selected"
                                   value="{{ $inquiry->files[0]->name }}"/>
                            <label class="mdl-textfield__label" for="file_input_text_1"></label>
                        </div>
                    </div>
                </div>
                <div class="single-photo-upload files">
                    <div class="photo-rnd">
                        <div class="photo-preview-wrapper" onclick="common.openSinglePhotoUploader(this);">
                            <i class="material-icons">add</i>
                            <img class="photo-preview" id="user-photo"
                                 src="{{ getPreviewFileUrl($inquiry->files[1]->url) }}"/>
                        </div>
                    </div>
                    @if($inquiry->files[1])
                        <span class="close-button show"
                              onclick="common.removeSingleFile('file_input_file_2', 'file_input_text_2')">
                            <i class="material-icons close-icon">cancel</i>
                        </span>
                    @else
                        <span class="close-button"
                              onclick="common.removeSingleFile('file_input_file_2', 'file_input_text_2')">
                            <i class="material-icons close-icon">cancel</i>
                        </span>
                    @endif
                    {{--<input type="file" name="file_2" id="file_input_file" class="none" onchange="common.onSinglePhotoSelected(event);"/>--}}
                    <div class="file_input_div">
                        <div class="file_input">
                            <label class="file_input_label">
                                <i class="material-icons">file_upload</i>
                                <input type="file" name="file_2" id="file_input_file_2" class="none file_input_file"
                                       onchange="common.onFileSelected(event);"/>
                            </label>
                        </div>
                        <div class="file_input_text_div">
                            <input class="file_input_text mdl-textfield__input" type="text" disabled readonly
                                   id="file_input_text_2" placeholder="No file selected"
                                   value="{{ $inquiry->files[1]->name }}"/>
                            <label class="mdl-textfield__label" for="file_input_text_2"></label>
                        </div>
                    </div>
                </div>
                <div class="single-photo-upload files">
                    <div class="photo-rnd">
                        <div class="photo-preview-wrapper" onclick="common.openSinglePhotoUploader(this);">
                            <i class="material-icons">add</i>
                            <img class="photo-preview" id="user-photo"
                                 src="{{ getPreviewFileUrl($inquiry->files[2]->url) }}"/>
                        </div>
                    </div>
                    @if($inquiry->files[2])
                        <span class="close-button show"
                              onclick="common.removeSingleFile('file_input_file_3', 'file_input_text_3')">
                            <i class="material-icons close-icon">cancel</i>
                        </span>
                    @else
                        <span class="close-button"
                              onclick="common.removeSingleFile('file_input_file_3', 'file_input_text_3')">
                            <i class="material-icons close-icon">cancel</i>
                        </span>
                    @endif
                    {{--<input type="file" name="file_3" id="file_input_file" class="none" onchange="common.onSinglePhotoSelected(event);"/>--}}
                    <div class="file_input_div">
                        <div class="file_input">
                            <label class="file_input_label">
                                <i class="material-icons">file_upload</i>
                                <input type="file" name="file_3" id="file_input_file_3" class="none file_input_file"
                                       onchange="common.onFileSelected(event);"/>
                            </label>
                        </div>
                        <div class="file_input_text_div">
                            <input class="file_input_text mdl-textfield__input" type="text" disabled readonly
                                   id="file_input_text_3" placeholder="No file selected"
                                   value="{{ $inquiry->files[2]->name }}"/>
                            <label class="mdl-textfield__label" for="file_input_text_3"></label>
                        </div>
                    </div>
                </div>

                <input type="hidden" name="deleted_files" id="deleted-files">

                <h3 class="section-head left m-b-0">
                <!-- Now, what’s the inquiry? -->
                </h3>                
                <div class="sub-section-head">Tell us in no more than 280 characters.
                    <span class="hidden-xs pitch-tooltip showonright" style="position: absolute;margin-top: -1px;">
                        <span class="tooltiptext">
                        What are you inquiring about for the story you're working on? The clearer the ask, the more specific the response.
                        </span>
                        <i class="material-icons">info_outline</i>
                    </span>
                </div>

                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <textarea class="form-control" name="points[]"
                                      placeholder="Describe what in a bullet here. You have 280 characters."
                                      onkeypress="common.preventEnterKey(event);" onkeyup="common.charsCount(this);"
                                      required maxlength="280">{{ $inquiry ? $inquiry->what_point_1 : '' }}</textarea>
                            {{--<label>Tell us in no more than 280 characters.</label>--}}
                            <div class="counter for-textarea"></div>
                        </div>
                    </div>
                </div>

                <div class="text-center submit-wrapper">
                    <button type="submit" class="btn btn-white-ylw btn-submit submitter" disabled>Next</button>
                </div>
            </form>
        </div>
    </div>
@endsection

@push('js')
    <script>
        $(function () {
            common.bindFormValidation();

            const icon = document.getElementById('subjectPickerLauncher');
            const container = document.getElementById('subjectPickerContainer');
            const input = document.getElementById('subject');

            const picker = new EmojiPicker({
                prevent_new_line: true,
                search_icon: '<i class="fas fa-search" aria-hidden="true"></i>',
                categories: [
                    {
                        title: 'People',
                        icon: '<i class="far fa-smile" aria-hidden="true"></i>'
                    },
                    {
                        title: 'Nature',
                        icon: '<i class="fas fa-leaf" aria-hidden="true"></i>'
                    },
                    {
                        title: 'Foods',
                        icon: '<i class="fas fa-utensils" aria-hidden="true"></i>'
                    },
                    {
                        title: 'Activity',
                        icon: '<i class="fas fa-futbol" aria-hidden="true"></i>'
                    },
                    {
                        title: 'Places',
                        icon: '<i class="fas fa-globe-americas" aria-hidden="true"></i>'
                    },
                    {
                        title: 'Symbols',
                        icon: '<i class="far fa-lightbulb" aria-hidden="true"></i>'
                    },
                    {
                        title: 'Flags',
                        icon: '<i class="fas fa-flag-checkered" aria-hidden="true"></i>'
                    }
                ],
                callback: (emoji, category, node) => {
                    input.value = picker.getText();
                }
            });

            picker.listenOn(icon, container, input);

        });

        var tourCount = {!! json_encode((array)auth()->user()->tour->inquiry_what) !!};

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
                        element: ".wizard-progress-wrap",
                        placement: "bottom",
                        title: "Your Inquiry Timeline",
                        content: "Here is your inquiry workflow timeline. Click an icon to reference the step in the inquiry workflow.",
                        backdropPadding: {
                            top: 10,
                            left: 0,
                            bottom: 0,
                            right: 0
                        }
                    },
                    {
                        element: ".content",
                        placement: "top",
                        title: "WHAT Is Your Inquiry?",
                        content: "Specify the subject line, outlet/publication name, add a hyperlink (optional), and tell the publicist WHAT you are inquiring about."
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
                        content: "Click NEXT once you have completed this section. If you're missing information above, the field will highlight in red and you will not be able to proceed. <br><br> Click END TOUR to proceed to next step.",
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
                    common.validateWalkthroughEnd('inquiry_what');
                }
            });

            // Initialize the tour
            tour.init();

            // Start the tour
            tour.start();
        }
    </script>
@endpush