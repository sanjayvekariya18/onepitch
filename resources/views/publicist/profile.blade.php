@extends('layouts.simple')

@section('title', 'Profile')

@section('content')
<style>
@media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait) {
  /* For portrait layouts only */
    .btn.btn-white-ylw.brand{
        margin-top: 20px;
    margin-left: -50px;
    }
    .buttons-group.m-b-56.fixIpadView{
        margin-left: 55px;
    }
}

</style>
    <div class="content">

        <div class="buttons-group m-b-56 fixIpadView">
            <a href="javascript:void(0);"
               onclick="common.copyToClipboard(this, 'Copied Referral Link')"
               data-link="{{ route('referral').'?code='.$user->referral_hash }}"
               class="btn btn-white-ylw referral m-r-16">Copy Referral Link</a>

            <a href="{{ route('pitch_what', ['pitch_id' => 'create']) }}"
               class="btn btn-white-ylw new-pitch">Create New Pitch</a>

            <a href="{{ route('publicist_interests') }}"
               class="btn btn-white-ylw industry">Subscribe to Inquiry</a>

            <a onclick="common.openBrandModal()"
               class="btn btn-white-ylw brand">Add New Brand</a>

            @if ($has_rsvped)
                <div class="rsvped-link-container">
                    <a href="{{ route('rsvp') }}">RSVP to OnePitch Meetup (San Diego, California)</a>
                </div>
            @endif
        </div>

        <div id="profileContainer">
            <div id="pitchLog">
                <h2 class="text-center">
                    <div class="block-center">
                        <i class="material-icons move-arrow-up" onclick="moveUp('pitchLog')">
                            keyboard_arrow_up
                        </i>

                        <i class="material-icons move-arrow-down" onclick="moveDown('pitchLog')">
                            keyboard_arrow_down
                        </i>
                        Pitch Log
                    </div>
                </h2>

                <hr class="small"/>

                <div id="pitches-list-wrapper">
                    <input type="hidden" name="offset"/>
                    <table class="table table-striped m-t-48">
                        <thead>
                        <tr>
                            <td>Title</td>
                            <td class="not-for-xs">Date Uploaded</td>
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

                <div class="showing-count-bottom pitches-counter">
                    <span class="count pitches-showing"></span>/<span class="pitches-total"></span> Pitches
                </div>
                <div class="text-center count_block">
                    <div>
                        <a href="javascript:;"
                           onclick="pitch.loadMorePitches($('#pitches-list-wrapper'))"
                           class="btn btn-white-ylw btn-submit load-more-pitches">Load More</a>
                    </div>
                    <div>
                        <a href="#pitches-list-wrapper" class="submit-link submitter back-top hidden">Back to the
                            Top</a>
                    </div>
                </div>
            </div>

            <div id="savedInquiryLog">
                <h2 class="text-center">
                    <i class="material-icons move-arrow-up" onclick="moveUp('savedInquiryLog')">
                        keyboard_arrow_up
                    </i>

                    <i class="material-icons move-arrow-down" onclick="moveDown('savedInquiryLog')">
                        keyboard_arrow_down
                    </i>

                    <div class="block-center">
                        Saved Inquiry Log
                    </div>
                </h2>

                <hr class="small"/>

                <div id="saved-inquiries-list-wrapper">
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

                <div class="showing-count-bottom inquiries-counter">
                    <span class="count saved-inquiries-showing"></span>/<span class="saved-inquiries-total"></span>
                    Inquiries
                </div>
                <div class="text-center count_block">
                    <div>
                        <a href="javascript:;"
                           onclick="inquiry.loadMoreSavedInquiries($('#saved-inquiries-list-wrapper'))"
                           class="btn btn-white-ylw btn-submit load-more-saved-inquiries">Load More</a>
                    </div>
                    <div>
                        <a href="#saved-inquiries-list-wrapper"
                           class="submit-link submitter saved-inquiries-back-top hidden">Back to the Top</a>
                    </div>
                </div>
            </div>

            <div id="inquiryHistoryLog">
                <h2 class="text-center">
                    <i class="material-icons move-arrow-up" onclick="moveUp('inquiryHistoryLog')">
                        keyboard_arrow_up
                    </i>

                    <i class="material-icons move-arrow-down" onclick="moveDown('inquiryHistoryLog')">
                        keyboard_arrow_down
                    </i>

                    <div class="block-center">
                        Inquiry History Log
                    </div>
                </h2>

                <hr class="small"/>

                <div id="inquiries-history-list-wrapper">
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

                <div class="showing-count-bottom inquiries-counter">
                    <span class="count history-inquiries-showing"></span>/<span class="history-inquiries-total"></span>
                    Inquiries
                </div>
                <div class="text-center count_block">
                    <div>
                        <a href="javascript:;"
                           onclick="inquiry.loadMoreHistoryInquiries($('#inquiries-history-list-wrapper'))"
                           class="btn btn-white-ylw btn-submit load-more-history-inquiries">Load More</a>
                    </div>
                    <div>
                        <a href="#inquiries-history-list-wrapper"
                           class="submit-link submitter history-inquiries-back-top hidden">Back to the Top</a>
                    </div>
                </div>
            </div>

            <div id="brandLog">
                <h2 class="text-center">
                    <i class="material-icons move-arrow-up" onclick="moveUp('brandLog')">
                        keyboard_arrow_up
                    </i>

                    <i class="material-icons move-arrow-down" onclick="moveDown('brandLog')">
                        keyboard_arrow_down
                    </i>

                    <div class="block-center">
                        Brand Index
                    </div>
                </h2>
                <hr class="small"/>

                @if ($userCompanies->count())
                    <table class="table table-striped m-t-48">
                        <thead>
                        <tr>
                            <td>Brand Name</td>
                            <td class="not-for-xs">Brand Website</td>
                            <td class="not-for-xs">Brand Location</td>
                            <td class="not-for-sm">Industries</td>
                            <td class="not-for-xs">Topics</td>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($userCompanies as $company)
                            <tr onclick="common.openBrandModal({{ $company->id }})">
                                <td>{{ str_limit($company->company, 50) }}</td>
                                <td class="not-for-sm">{{ $company->website }}</td>
                                <td class="not-for-sm">{{ $company->location }}</td>
                                <td class="not-for-xs">{{ str_limit(stringifyRelationshipModels($company->industries, 'industry', 'title', ', '), 50) }}</td>
                                <td class="not-for-xs">{{ str_limit(stringifyRelationshipModels($company->industries[0]->topics, 'topic', 'title', ', '), 50) }}</td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                @else
                    <h3 class="section-head text-center m-b-64 no-industries">
                        You do not have any Brands yet.
                        <br/>
                        <img src="/img/pensive-face-1-f-614@3x.png"/>
                    </h3>
                @endif
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
                        Subscribe to Inquiry

                        <a href="{{ route('publicist_interests') }}" class="edit-icon-btn">&nbsp</a>
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

    <div class="modal" tabindex="-1" role="dialog" id="pitch-view-modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">&nbsp;</button>
                <div class="modal-body no-padding-xs">
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <div class="modal" tabindex="-1" role="dialog" id="inquiry-view-modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">&nbsp;</button>
                <div class="modal-body no-padding-xs">
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <div class="modal yes-no-modal" tabindex="-1" role="dialog" id="pitch-delete-modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body no-padding-xs">
                    <h1>Delete Pitch</h1>
                    <p>Have you updated your brand profile yet?</p>
                    <div class="yes-no-submit">
                        <button type="button" class="btn btn-cancel" data-dismiss="modal" aria-label="Cancel">Cancel
                        </button>
                        <button type="button" onclick="pitch.pitchDelete();" class="btn btn-white-ylw btn-submit">Yes,
                            DELETE
                        </button>
                        <input type="hidden" id="pitch-delete-id"/>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="social-url-reminder-modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">&nbsp;</button>

                <div class="modal-body">
                    <h2 class="text-center">Have you updated your brands yet?</h2>
                    <div class="row">
                        <div class="col-sm-12">
                            <p style="text-align:center">Our newest update to the Brand Index now includes a list of social media profiles for your brand. Simply paste the links into the field to include! Make sure all your other info is updated and accurate too.</p>
                            <div class="yes-no-submit" style="text-align: right;margin-top: 25px;">
                                <!-- <button type="button" class="btn btn-cancel" data-dismiss="modal" aria-label="Cancel">Cancel
                                </button> -->
                                <button type="button" onclick="{!! !empty($userCompanies[0]->id) ? 'common.openBrandModal('.$userCompanies[0]->id.')' : 'javascript:;' !!}" class="btn btn-white-ylw btn-submit openBrandEdit">Update Brand
                                </button>
                                <input type="hidden" id="brand-edit-id"/>
                            </div>
                        </div>

                    </div>

                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <div class="modal" tabindex="-1" role="dialog" id="add-brand-modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">&nbsp;</button>

                <div class="modal-body">
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <div class="modal yes-no-modal" tabindex="-1" role="dialog" id="brand-delete-modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body no-padding-xs">
                    <h1>Delete Brand</h1>
                    <p>Are you sure you want to permanently delete this brand?</p>
                    <div class="yes-no-submit">
                        <button type="button" class="btn btn-cancel" data-dismiss="modal" aria-label="Cancel">Cancel
                        </button>
                        <a type="button" onclick="common.brandDelete();" class="btn btn-white-ylw btn-submit">Yes,
                            DELETE</a>
                        <input type="hidden" id="brand-delete-id"/>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>

    @if ($saved_inquiry)
        <div id="success-confirm-toast" class="toast-wrapper">
            <div class="toast-inner toast-success">
                <strong>“{{ $saved_inquiry->subject }}”</strong> has been saved. This inquiry has been added to your
                saved inquiries.
            </div>
        </div>
    @endif

    @if ($confirmed_pitch)
        <div id="success-confirm-toast" class="toast-wrapper">
            <div class="toast-inner toast-success">
                <strong>“{{ $confirmed_pitch->subject }}”</strong> has been confirmed. You will be notified once the
                review of your pitch is complete.
            </div>
        </div>
    @endif

    @if ($cancelled_pitch)
        <div id="success-confirm-toast" class="toast-wrapper">
            <div class="toast-inner toast-success" style="background: #bf9a00">
                <strong>“{{ $cancelled_pitch->subject }}”</strong> has been cancelled. This pitch has been added back to
                your draft.
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
@endsection

@push('js')
    <script>
      $(function () {

        var showSocialUrlRemainder = {!! $showSocialUrlRemainder !!};

        if(showSocialUrlRemainder){
          $('#social-url-reminder-modal').modal();
        }

        $('.openBrandEdit').on('click',function(){
            $('#social-url-reminder-modal').modal('hide');
        });

        $('[data-toggle="tooltip"]').tooltip({
          container: 'body'
        })

        $('#pitches-list-wrapper').find('input[name="offset"]').val(0)
        pitch.loadPitches($('#pitches-list-wrapper'))

        $('#saved-inquiries-list-wrapper').find('input[name="saved_offset"]').val(0)
        inquiry.loadSavedInquiries($('#saved-inquiries-list-wrapper'))

        $('#inquiries-history-list-wrapper').find('input[name="history_offset"]').val(0)
        inquiry.loadInquiriesHistory($('#inquiries-history-list-wrapper'))

          @if ($confirmed_pitch)
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
        if (localStorage.listContainerPublicist === undefined) {
          return false
        }

        var listContainer = JSON.parse(localStorage.listContainerPublicist)
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

        localStorage.setItem('listContainerPublicist', JSON.stringify(listContainer))
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
          steps: [
            {
              element: '.new-pitch',
              placement: 'bottom',
              title: 'Submit Your Pitch',
              content: 'Click this button to upload and submit a pitch to journalists.'
            },
            {
              element: '.industry',
              placement: 'bottom',
              title: 'Subscribe To Journalist Inquiry',
              content: 'Click this button to subscribe to inquiries directly from a journalist. Pick one industry and a set of related topics to subscribe.'
            },
            {
              element: '.brand',
              placement: 'bottom',
              title: 'Add Your Brand',
              content: 'Upload each brand(s) you represent and make sure to fill out each field. Journalist can search for brands, or filter by industry and topic, and then contact you directly.'
            },
            {
              element: '#pitchLog',
              placement: 'top',
              title: 'Your Pitch Log',
              content: 'Reference your list of pitches submitted here. View the number the analytics for each pitch, or click the pitch to edit a draft.'
            },
            {
              element: '#savedInquiryLog',
              placement: 'top',
              title: 'Your Saved Inquiry Log',
              content: 'Access every inquiry you have saved from your daily email here. Click the inquiry to view the information and contact the Journalist via email.'
            },
            {
              element: '#inquiryHistoryLog',
              placement: 'top',
              title: 'Your Inquiry History Log',
              content: 'Access every inquiry that you have received through your daily email here. Click the pitch to view the information and contact the Journalist via email.'
            },
            {
              element: '#brandLog',
              placement: 'top',
              title: 'Your Brand Index',
              content: 'Reference your list of brand(s) you represent for Journalist to search through and contact you directly.'
            },
            {
              element: '#industryList',
              placement: 'top',
              title: 'Your Inquiry Subscriptions',
              content: 'Reference your list of subscriptions to journalist inquiries.'
            },
            {
              element: 'a.edit-icon-btn',
              placement: 'top',
              title: 'Subscribe To Inquiry',
              content: 'Click the pencil icon to add, edit, or remove a subscription to journalist inquiry. Pick one industry and a set of related topics to subscribe.',
              backdropPadding: {
                top: 8,
                left: 10,
                bottom: 10,
                right: 10
              }
            },
            {
              element: '.referral',
              placement: 'bottom',
              title: 'Your Referral Link',
              content: 'Click this button to copy and share your unique referral link. Each referral sign up enters you into the monthly sweepstakes to WIN $100 cash.'
            },
            {
              element: '.sign_out',
              placement: 'bottom',
              title: 'Your Navigation Menu',
              content: 'Click the drop down to edit your profile, create a pitch, subscribe to inquiries and more.',
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
              content: 'Click to view your profile, edit your profile information, create a pitch, subscribe to inquiry and access the footer menu pages.',
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
                left: -70,
                bottom: 13,
                right: -70
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
      } else {
        var brands = {{ count($user->companies) }};
        if (brands < 1) {
          swal({
            title: '',
            text: '',
            buttons: {
              hiddenButton: {
                text: 'Cancel',
                value: null,
              },
              select: {
                text: 'Add Br',
                value: 'confirm'
              }
            }
          })
          swal({
            title: 'Help Journalists Find You Easily:\n Add Your Brand(s)',
            text: 'Upload each brand(s) you represent and make sure to fill out each field. Journalist can search for brands, or filter by industry and topic, and then contact you directly.',
            buttons: {
              cancelIndustry: {
                text: 'Cancel',
                value: 'cancel',
              },
              select: {
                text: 'Add Brand',
                value: 'confirm',
              },
            },
          }).then((response) => {
            if (response == 'confirm') {
              common.openBrandModal()
            }
          })
        }
      }

    </script>
@endpush