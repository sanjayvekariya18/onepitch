@extends('layouts.simple')

@section('title', 'Profile')

@section('content')
    <div class="content">
        <div class="buttons-group m-b-56">
            <a href="javascript:void(0);"
               onclick="common.copyToClipboard(this, 'Copied Referral Link')"
               data-link="{{ route('referral').'?code='.$user->referral_hash }}"
               class="btn btn-white-ylw referral">Copy Referral Link</a>

            <a href="{{ route('journalist_interests') }}"
               class="btn btn-white-ylw industry">Subscribe to Pitches</a>

            <a href="{{ route('publicist_brands') }}"
               class="btn btn-white-ylw brand">Brand Index</a>

            <a href="{{ route('inquiry_what', ['inquiry_id' => 'create']) }}"
               class="btn btn-white-ylw new-pitch">Create New Inquiry</a>

            @if ($has_rsvped)
                <div class="rsvped-link-container">
                    <a href="{{ route('rsvp') }}">RSVP to OnePitch Meetup (San Diego, California)</a>
                </div>
            @endif
        </div>

        <div id="profileContainer">
            <div id="savedPitchLog">
                <h2 class="text-center">
                    <div class="block-center">
                        <i class="material-icons move-arrow-up" onclick="moveUp('savedPitchLog')">
                            keyboard_arrow_up
                        </i>

                        <i class="material-icons move-arrow-down" onclick="moveDown('savedPitchLog')">
                            keyboard_arrow_down
                        </i>
                        Saved Pitch Log
                    </div>
                </h2>

                <hr class="small"/>

                <div id="saved-pitches-list-wrapper">
                    <input type="hidden" name="saved_offset"/>
                    <table class="table table-striped m-t-48">
                        <thead>
                        <tr>
                            <td>Title</td>
                            <td>Brand</td>
                            <td class="not-for-sm">Industries</td>
                            <td class="not-for-sm">Topics</td>
                            <td>Date Saved</td>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>

                <div class="showing-count-bottom pitches-counter">
                    <span class="count saved-pitches-showing"></span>/<span class="saved-pitches-total"></span> Pitches
                </div>
                <div class="text-center count_block">
                    <div>
                        <a href="javascript:;"
                           onclick="pitch.loadMoreSavedPitches($('#saved-pitches-list-wrapper'))"
                           class="btn btn-white-ylw btn-submit load-more-saved-pitches">Load More</a>
                    </div>
                    <div>
                        <a href="#inquiries-list-wrapper" class="submit-link submitter saved-pitches-back-top hidden">Back
                            to the Top</a>
                    </div>
                </div>
            </div>

            <div id="pitchHistoryLog">
                <h2 class="text-center">
                    <div class="block-center">
                        <i class="material-icons move-arrow-up" onclick="moveUp('pitchHistoryLog')">
                            keyboard_arrow_up
                        </i>

                        <i class="material-icons move-arrow-down" onclick="moveDown('pitchHistoryLog')">
                            keyboard_arrow_down
                        </i>
                        Pitch History Log
                    </div>
                </h2>

                <hr class="small"/>

                <div id="pitches-history-list-wrapper">
                    <input type="hidden" name="history_offset"/>
                    <table class="table table-striped m-t-48">
                        <thead>
                        <tr>
                            <td>Title</td>
                            <td>Brand</td>
                            <td class="not-for-sm">Industries</td>
                            <td class="not-for-sm">Topics</td>
                            <td>Date Sent</td>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>

                <div class="showing-count-bottom pitches-counter">
                    <span class="count history-pitches-showing"></span>/<span class="history-pitches-total"></span>
                    Pitches
                </div>
                <div class="text-center count_block">
                    <div>
                        <a href="javascript:;"
                           onclick="pitch.loadMoreHistoryPitches($('#pitches-history-list-wrapper'))"
                           class="btn btn-white-ylw btn-submit load-more-history-pitches">Load More</a>
                    </div>
                    <div>
                        <a href="#pitches-history-list-wrapper"
                           class="submit-link submitter history-pitches-back-top hidden">Back to the Top</a>
                    </div>
                </div>
            </div>

            <div id="inquiryLog">
                <h2 class="text-center">
                    <div class="block-center">
                        <i class="material-icons move-arrow-up" onclick="moveUp('inquiryLog')">
                            keyboard_arrow_up
                        </i>

                        <i class="material-icons move-arrow-down" onclick="moveDown('inquiryLog')">
                            keyboard_arrow_down
                        </i>
                        Inquiry Log
                    </div>
                </h2>

                <hr class="small"/>

                <div id="inquiries-list-wrapper">
                    <input type="hidden" name="offset"/>
                    <table class="table table-striped m-t-48">
                        <thead>
                        <tr>
                            <td>Title</td>
                            <td class="not-for-xs">Date Uploaded</td>
                            {{--<td class="not-for-sm">Time</td>--}}
                            <td class="not-for-xs">Date Sent</td>
                            <td>Status</td>
                            <td class="metrics-header not-for-xs">Sent</td>
                            <td class="metrics-header not-for-xs">Opens</td>
                            <td class="metrics-header not-for-xs">Clicks</td>
                            <td class="metrics-header not-for-xs">Saves</td>
                            <td class="metrics-header">Responses</td>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>

                <div class="showing-count-bottom inquiries-counter">
                    <span class="count inquiries-showing"></span>/<span class="inquiries-total"></span> Inquiries
                </div>
                <div class="text-center count_block">
                    <div>
                        <a href="javascript:;"
                           onclick="inquiry.loadMoreInquiries($('#inquiries-list-wrapper'))"
                           class="btn btn-white-ylw btn-submit load-more-inquiries">Load More</a>
                    </div>
                    <div>
                        <a href="#inquiries-list-wrapper" class="submit-link submitter back-top hidden">Back to the
                            Top</a>
                    </div>
                </div>
            </div>

            <div id="industryList">
                <h2 class="text-center">
                    <div class="block-center">
                        <i class="material-icons move-arrow-up" onclick="moveUp('industryList')">
                            keyboard_arrow_up
                        </i>

                        <i class="material-icons move-arrow-down" onclick="moveDown('industryList')">
                            keyboard_arrow_down
                        </i>

                        Subscribe to Pitches

                        <a href="{{ route('journalist_interests') }}" class="edit-icon-btn">&nbsp</a>
                    </div>
                </h2>

                <hr class="small"/>

                <table class="table table-striped m-t-48">
                    <thead>
                    <tr>
                        <td>Industry</td>
                        <td>Topics</td>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach ($industries as $industry)
                        <tr>
                            <td>{{ $industry['industry']->title }}</td>
                            <td>
                                <span class="lg-view view">{!! buildTopicsLine($industry['topics'], 3) !!}</span>
                                <span class="md-view view">{!! buildTopicsLine($industry['topics'], 2) !!}</span>
                                <span class="sm-view view">{!! buildTopicsLine($industry['topics'], 1) !!}</span>
                                <span class="xs-view view">{!! buildTopicsLine($industry['topics'], -1) !!}</span>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>

    </div>

    <div class="modal" tabindex="-1" role="dialog" id="inquiry-view-modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">&nbsp;</button>
                <div class="modal-body no-padding-xs">
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <div class="modal" tabindex="-1" role="dialog" id="pitch-view-modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">&nbsp;</button>
                <div class="modal-body no-padding-xs">
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <div class="modal yes-no-modal" tabindex="-1" role="dialog" id="inquiry-delete-modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body no-padding-xs">
                    <h1>Delete Inquiry</h1>
                    <p>Are you sure you want to permanently delete this inquiry?</p>
                    <div class="yes-no-submit">
                        <button type="button" class="btn btn-cancel" data-dismiss="modal" aria-label="Cancel">Cancel
                        </button>
                        <button type="button" onclick="inquiry.inquiryDelete();" class="btn btn-white-ylw btn-submit">
                            Yes, DELETE
                        </button>
                        <input type="hidden" id="inquiry-delete-id"/>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>

    @if ($saved_pitch)
        <div id="success-confirm-toast" class="toast-wrapper">
            <div class="toast-inner toast-success">
                <strong>“{{ $saved_pitch->subject }}”</strong> has been saved. This pitch has been added to your saved
                pitches.
            </div>
        </div>
    @endif

    @if ($confirmed_inquiry)
        <div id="success-confirm-toast" class="toast-wrapper">
            <div class="toast-inner toast-success">
                <strong>“{{ $confirmed_inquiry->subject }}”</strong> has been confirmed. You will be notified once the
                review of your inquiry is complete.
            </div>
        </div>
    @endif
    @if ($cancelled_inquiry)
        <div id="success-confirm-toast" class="toast-wrapper">
            <div class="toast-inner toast-success" style="background: #bf9a00">
                <strong>“{{ $cancelled_inquiry->subject }}”</strong> has been cancelled. This inquiry has been added
                back to your draft.
            </div>
        </div>
    @endif

    @if ($rsvp && \App\Models\MeetUp::STATUS_ACCEPTED)
        <div id="success-confirm-toast" class="toast-wrapper">
            <div class="toast-inner toast-success">
                Your reservation to the meetup has been made
            </div>
        </div>
    @endif

    @if ($flash = Session::get('flash'))
        <div id="success-flash" class="toast-wrapper">
            <div class="toast-inner toast-success">
                {{ $flash }}
            </div>
        </div>
    @endif

    @if ($has_rsvped)
        <div style="padding-top: 20px; font-size: 20px; text-decoration:underline;">
            <a href="{{ route('rsvp') }}">RSVP to OnePitch Meetup (San Diego, California)</a>
        </div>
    @endif
@endsection

@push('js')
    <script>
      $(function () {
        $('[data-toggle="tooltip"]').tooltip({
          container: 'body'
        })

        $('#inquiries-list-wrapper').find('input[name="offset"]').val(0)
        inquiry.loadInquiries($('#inquiries-list-wrapper'))

        $('#saved-pitches-list-wrapper').find('input[name="saved_offset"]').val(0)
        pitch.loadSavedPitches($('#saved-pitches-list-wrapper'))

        $('#pitches-history-list-wrapper').find('input[name="history_offset"]').val(0)
        pitch.loadPitchesHistory($('#pitches-history-list-wrapper'))

          @if ($confirmed_inquiry)
          setTimeout(function () {
            $('#success-confirm-toast').fadeOut()
          }, 5000)
          @endif

          @if ($flash)
          setTimeout(function () {
            $('#success-flash').fadeOut()
          }, 5000)
          @endif

          adjustArrows()
        loadContainerOrder()
      })

      function loadContainerOrder () {
        if (localStorage.listContainerJournalist === undefined) {
          return false
        }

        var listContainer = JSON.parse(localStorage.listContainerJournalist)
        var i = 0

        $('#profileContainer').children('div').each(function (e) {
          $(this).insertBefore($('#' + listContainer[i]))
          i++
        })
        adjustArrows()
      }

      function saveContainerOrder () {
        var listContainer = []

        $('#profileContainer').children('div').each(function (e) {
          listContainer.push($(this).attr('id'))
        })

        localStorage.setItem('listContainerJournalist', JSON.stringify(listContainer))
      }

      function adjustArrows () {
        var profileContainer = $('#profileContainer')
        var firstContainer = profileContainer.children('div').first()
        var lastContainer = profileContainer.children('div').last()
        $('.move-arrow-up').show()
        $('.move-arrow-down').show()

        firstContainer.find('.move-arrow-up').hide()
        lastContainer.find('.move-arrow-down').hide()
      }

      function moveDown (containerId) {
        var current = $('#' + containerId)
        var next = current.next()

        if (next.attr('id') === undefined) {
          return false
        }

        current.insertAfter(next)
        adjustArrows()
        saveContainerOrder()
      }

      function moveUp (containerId) {
        var current = $('#' + containerId)
        var previous = current.prev()

        if (previous.attr('id') === undefined) {
          return false
        }
        current.insertBefore(previous)
        adjustArrows()
        saveContainerOrder()
      }

      var tourCount = {!! json_encode((array)auth()->user()->tour->profile) !!};

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
          autoscroll: true,
          steps: [
            {
              element: '.new-pitch',
              placement: 'bottom',
              title: 'Submit Your Inquiry',
              content: 'Click this button to upload and submit an inquiry to publicists.'
            },
            {
              element: '#industryList',
              placement: 'top',
              title: 'Your Writing Interests',
              content: 'Reference your list of writing interests (i.e. your pitch subscriptions).'
            },
            {
              element: 'a.edit-icon-btn',
              placement: 'top',
              title: 'Subscribe to Writing Interests',
              content: 'Click this button to subscribe to your specific writing interests (i.e. pitch subscriptions). You will need to pick at least one industry and a set of related topics to start receiving the [OnePitch] daily emails.',
              backdropPadding: {
                top: 8,
                left: 10,
                bottom: 10,
                right: 10
              }
            },
            {
              element: '#savedPitchLog',
              placement: 'top',
              title: 'Your Saved Pitch Log',
              content: 'Access every pitch you have saved from your daily email here. Click the pitch to view the information and contact the Publicist via email.'
            },
            {
              element: '#pitchHistoryLog',
              placement: 'top',
              title: 'Your Pitch History Log',
              content: 'Access every pitch that you have received through your daily email here. Click the pitch to view the information and contact the Publicist via email.'
            },
            {
              element: '#inquiryLog',
              placement: 'top',
              title: 'Your Inquiry Log',
              content: 'Reference your list of inquiries submitted here. Reference the number of publicists who received each inquiry after it has been sent, or click the inquiry to edit a draft.'
            },
            {
              element: '.referral',
              placement: 'bottom',
              title: 'Your Referral Link',
              content: 'Click this button to copy and share your unique referral link. Each sign up enters you into the monthly sweepstakes to win up to $100 cash.'
            },
            {
              element: '.sign_out',
              placement: 'bottom',
              title: 'Your Navigation Menu',
              content: 'Click the drop down to edit your profile, create an inquiry, and more.',
              backdropPadding: {
                top: 8,
                left: 10,
                bottom: 8,
                right: 0
              }
            },
            {
              element: '.side_icon',
              placement: 'bottom',
              title: 'Side Toggle Menu',
              content: 'Click to view your profile, edit your profile information, create an inquiry and access the footer menu pages.',
              backdropPadding: {
                top: 5,
                left: -10,
                bottom: 5,
                right: -5
              }
            },
            {
              element: '.footer-links',
              placement: 'top',
              title: 'Footer Menu',
              content: 'Access more information including the OnePitch TypeBar blog, FAQs, and reference the full list of industries and topics.',
              backdropPadding: {
                top: 8,
                left: -50,
                bottom: 13,
                right: -50
              }
            },
            {
              element: '.social-links',
              placement: 'left',
              title: 'Follow Us!',
              content: 'Follow OnePitch for the latest news, highlights, and stats.',
              template: `<div class='popover tour'>
                        <div class='arrow'></div>
                        <h3 class='popover-title'></h3>
                        <div class='popover-content'></div>
                        <div class='popover-navigation'>
                            <div class='btn-group'>
                                <button class='btn btn-default' data-role='prev'>« Prev</button>
                                <button class='btn btn-default' data-role='next'>Next »</button>
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
            common.validateWalkthroughEnd('profile')
          }
        })

        // Initialize the tour
        tour.init()

        // Start the tour
        tour.start()
      }


    </script>
@endpush