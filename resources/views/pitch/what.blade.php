@extends('layouts.simple')

@section('title', 'Who - Pitch')

@section('content')
    <div class="container">
        @include('pitch.pitch_steps', ['step' => 'what'])

        <div class="content">
            <h2 class="text-center">Tell us your pitch!</h2>

            <hr class="small"/>

            <div class="btn-done-wrapper" style="left: 0; max-width: 250px;">
                <a onclick="pitch.saveAsDraft({{  $pitch ? $pitch->id : 0 }}, 1)" class="btn save-draft"><i
                            class="material-icons">save</i>Save As Draft</a>
            </div>

            <h3 class="section-head left">
                <!-- First, what's the summary? -->
            </h3>

            <form id="signup-form" action="{{ route('pitch_what') }}" method="post" data-parsley-focus="none"
                  enctype="multipart/form-data">
                <input type="hidden" name="step" value="1">

                <div class="row">
                    <div class="form-group col-sm-11" id="subjectPickerContainer">
                        <div class="emoji-picker-wrapper">
                            <input type="text" class="form-control" name="subject" id="subject"
                                   placeholder="Think of this as your subject line. You only have 40 characters - grab attention and make it compelling!"
                                   value="{{ $pitch ? $pitch->subject : '' }}" onkeyup="common.charsCount(this);common.validateFieldCountAndShowColor(this,'subject');"
                                   required 
                                   data-parsley-errors-container="#subjectErrors"
                                   maxlength="40" style="display: inline; width: 95%">
                            <i class="far fa-smile fa-lg launcher" id="subjectPickerLauncher" aria-hidden="true"></i>
                            <div id="subjectErrors"></div>
                        </div>
                        <label for="subject">Think of this as your subject line. You only have 40 characters - grab attention and make
                            it compelling!</label>

                        <div class="counter"></div>
                    </div>

                    <div class="col-sm-1">
                        <div class="hidden-xs">
                            <span class="pitch-tooltip">
                                <span class="tooltiptext">
                                    Cut the BS and keep this part concise, simple, engaging & honest. <br/> A subject line will also help further categorize your pitch.
                                </span>
                                <i class="material-icons">info_outline</i>
                            </span>

                            @can('pitch-tool')
                                <span class="pitch-tooltip">
                                    <span class="dot red"></span>
                                    <span class="tooltiptext insidedot">0/33</span>
                                </span>
                            @endcan
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-sm-6">
                        <input type="text" class="form-control" name="company" id="company"
                               placeholder="What brand are you pitching for?"
                               value="{{ $pitch ? $pitch->company : '' }}" required>
                        <label for="company">What brand are you pitching for?</label>
                    </div>
                    <div class="col-sm-1 hidden-xs pitch-tooltip">
                        <i class="material-icons">info_outline</i>
                        <span class="tooltiptext">Here’s where you can mention the company (or source) of the pitch.</span>
                    </div>

                    <div class="form-group col-sm-11">
                        <input type="url" id="url" class="form-control" name="website" placeholder="Add a link here."
                               value="{{ $pitch ? $pitch->website : '' }}">
                        <label for="url">Add a link here.</label>
                    </div>
                    <div class="col-sm-1 hidden-xs pitch-tooltip">
                        <i class="material-icons">info_outline</i>
                        <span class="tooltiptext">Here’s where you can link to the website, press page/release, <br/> or online document.</span>
                    </div>
                </div>

                <div id="fileUpload">
                    <h3>Press Release: </h3>
                    <div class="single-photo-upload files">
                        <div class="photo-rnd">
                            <div class="photo-preview-wrapper" onclick="common.openSinglePhotoUploader(this);">
                                <i class="material-icons">add</i>
                                <img class="photo-preview" id="user-photo"
                                     src="{{ getPreviewFileUrl($pitch->press_release->url) }}"/>
                            </div>
                        </div>
                        @if($pitch->press_release)
                            <span class="close-button show"
                                  onclick="common.removePressRelease('file_input_file_1', 'file_input_text_1')">
                            <i class="material-icons close-icon">cancel</i>
                        </span>
                        @else
                            <span class="close-button"
                                  onclick="common.removePressRelease('file_input_file_1', 'file_input_text_1')">
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
                                       value="{{ $pitch->press_release->name }}"/>
                                <label class="mdl-textfield__label" for="file_input_text_1"></label>
                            </div>
                        </div>
                    </div>
                    <br>
                    <h3>Other Media Attachments: </h3>
                    <div class="single-photo-upload files">
                        <div class="photo-rnd">
                            <div class="photo-preview-wrapper" onclick="common.openSinglePhotoUploader(this);">
                                <i class="material-icons">add</i>
                                <img class="photo-preview" id="user-photo"
                                     src="{{ getPreviewFileUrl($pitch->files[0]->url) }}"/>
                            </div>
                        </div>
                        @if($pitch->files[0])
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
                                       value="{{ $pitch->files[0]->name }}"/>
                                <label class="mdl-textfield__label" for="file_input_text_2"></label>
                            </div>
                        </div>
                    </div>
                    <div class="single-photo-upload files">
                        <div class="photo-rnd">
                            <div class="photo-preview-wrapper" onclick="common.openSinglePhotoUploader(this);">
                                <i class="material-icons">add</i>
                                <img class="photo-preview" id="user-photo"
                                     src="{{ getPreviewFileUrl($pitch->files[1]->url) }}"/>
                            </div>
                        </div>
                        @if($pitch->files[1])
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
                                       value="{{ $pitch->files[1]->name }}"/>
                                <label class="mdl-textfield__label" for="file_input_text_3"></label>
                            </div>
                        </div>
                    </div>
                </div>

                <input type="hidden" name="deleted_press_release" id="deleted-press-release">

                <input type="hidden" name="deleted_files" id="deleted-files">



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
            $('#subject').keyup();
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


        var vcUser = {!! $user ?? $user->vc ?? 0 !!};
        var tourCount = {!! json_encode((array)auth()->user()->tour->pitch_what) !!};

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
                        element: ".wizard-progress-wrap",
                        placement: "bottom",
                        title: "Your Pitch Timeline",
                        content: "Click an icon to reference the step in the inquiry workflow.",
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
                        title: "Who Are You Pitching?",
                        content: "Specify the subject line, brand/source name, add a hyperlink (optional), and attach a press release or related media files (optional)."
                    },
                    {
                        element: "#fileUpload",
                        placement: "top",
                        title: "Upload Your Files",
                        content: "Click the + to upload a press release, image, video, or document. Click the X to remove your file upload."
                    },
                    {
                        element: ".pitch-tooltip:first",
                        placement: "left",
                        title: "Need A Tip?",
                        content: "Hover over this icon for recommendations and best practices provided directly from journalists.",
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
                        content: "Click NEXT once you have filled out the required fields above. Any fields that need text entered will be highlighted in red.",
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
                    common.validateWalkthroughEnd('pitch_what');
                }
            });

            // Initialize the tour
            tour.init();

            // Start the tour
            tour.start();
        }
    </script>
@endpush