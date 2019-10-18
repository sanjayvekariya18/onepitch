@extends('layouts.simple', ['without_logo' => true])

@section('title', 'Edit Profile')

@section('content')
<link id="bsdp-css" href="https://unpkg.com/bootstrap-datepicker@1.9.0/dist/css/bootstrap-datepicker3.min.css" rel="stylesheet">

    <style type="text/css">
        .fields-update {
            color: #a94442;
            font-weight: bold;
        }
    </style>

    <div class="container halfwidth-container">
        <div class="content">
            <a href="{{ route('profile') }}" class="close-big">&nbsp;</a>

            <h2 class="text-center on-top">Edit Profiles</h2>
            <hr class="small"/>
            <h3 class="section-head text-center m-b-24">
                Your profile is totally private.
                <br/>
                We won’t share or sell your contact information, ever.
            </h3>

            <form class="edit-profile-form" id="edit-form" action="{{ route('profile_edit') }}" method="post"
                  enctype="multipart/form-data" data-parsley-focus="none">
                <div class="text-center">
                    <div class="single-photo-upload">
                        <div class="photo-rnd">
                            <div class="photo-preview-wrapper" onclick="common.openSinglePhotoUploader(this)">
                                <i class="material-icons">add</i>
                                <img class="photo-preview" id="user-photo" src="{{ getUserPhotoUrl($user) }}"/>
                            </div>
                        </div>
                        <a href="javascript:void(0)" class="photo-selector"
                           onclick="common.openSinglePhotoUploader(this);">Change Photo</a>
                        <input type="file" name="photo" accept="image/*"
                               onchange="common.onSinglePhotoSelected(event);"/>
                    </div>
                </div>

                <div class="text-center reset-password">
                    <a href="{{ route('profile_reset_password') }}" class="underline-link">Reset Password</a>
                </div>

                <div class="row m-b-32">
                    <div class="form-group col-sm-12">
                        <input type="text" class="form-control" name="full_name" id="full_name" placeholder="Full Name"
                               value="{{ $user ? $user->full_name : '' }}" onkeyup="common.charsCount(this);" required
                               maxlength="100">
                        <label for="full_name">Full Name</label>
                        <div class="counter"></div>
                    </div>
                    <div class="form-group col-sm-12">
                        <input type="email" id="email" class="form-control" name="email" placeholder="Email Address"
                               value="{{ $user ? $user->email : '' }}" readonly required
                               data-parsley-remote="{{ route('service_check_unique_email') }}?value={value}{{ $user ? '&except_id='.$user->id : '' }}"
                               data-parsley-remote-message="The selected email is invalid">
                        <label for="email">Email Address</label>
                    </div>
                    <div class="form-group col-sm-12">
                        <input type="text" class="form-control" name="company" id="company"
                               value="{{ $user ? $user->company : '' }}" placeholder='{{ $company }}' required>
                        <label for="company">{{ $company }}</label>
                    </div>
                    @if(Auth::user() && Auth::user()->role === App\Models\User::ROLE_PUBLICIST)
                        <div class="form-group col-sm-12">
                            <input type="text" class="form-control" name="phone_number" id="phone_number" placeholder="Phone Number"
                                   value="{{ $user ? $user->phone_number : '' }}" onkeyup="common.charsCount(this);"
                                   required maxlength="100">
                            <label for="phone_number">Phone Number</label>
                            <div class="counter"></div>
                        </div>
                    @endif
                    <div class="form-group col-sm-12">
                        <input type="text" class="form-control" name="title" placeholder="Title"
                                value="{{ $user ? $user->title : '' }}" onkeyup="common.charsCount(this);" required maxlength="100">
                        <label>Title</label>
                        <div class="counter"></div>
                    </div>
                    <div class="form-group col-sm-12">
                        <input type="text" class="form-control datepicker" name="birthday" placeholder="Birthday"
                                value="{{ $user ? $user->birthday : '' }}" onkeyup="common.charsCount(this);" required maxlength="100">
                        <label>Birthday</label>
                        <div class="counter"></div>
                    </div>
                    @if(Auth::user() && Auth::user()->role == App\Models\User::ROLE_JOURNALIST)
                        @if(!empty($updateOutlet))
                            <div class="form-group col-sm-12">
                                <p class="bg-danger">
                                    Please update <span class="fields-update">“Publication URL”</span> and
                                    <span class="fields-update">“Author URL”</span> fields to continue!
                                </p>
                            </div>
                        @endif

                        <div class="form-group col-sm-12">
                            <input type="url" class="form-control" name="publication_url" id="publication_url"
                                   placeholder="Publication URL"
                                   value="{{ $user ? $user->publication_url : '' }}" required>
                            <label for="publication_url">Publication URL</label>
                        </div>
                        <div class="form-group col-sm-12">
                            <input type="url" class="form-control" name="author_url" id="author_url"
                                   placeholder="Author URL"
                                   value="{{ $user ? $user->author_url : '' }}" required>
                            <label for="author_url">Author URL</label>
                        </div>
                    @endif

                    <div class="form-group col-sm-12">
                        <input type="url" class="form-control" name="twitter_url" id="twitter_url" placeholder="Twitter"
                               value="{{ $user ? $user->twitter_url : '' }}">
                        <label for="twitter_url">Twitter</label>
                    </div>
                    <div class="form-group col-sm-12">
                        <input type="url" class="form-control" name="linkedin_url" id="linkedin_url" placeholder="LinkedIn"
                               value="{{ $user ? $user->linkedin_url : '' }}">
                        <label for="linkedin_url">LinkedIn</label>
                    </div>
                </div>

                <div id="newsletterSettings">
                    <h3 class="section-head same-size-head text-center">
                        Email Newsletter
                    </h3>

                    @if(!empty($senorityList))
                        <div class="timezone text-center text-left-xs">
                            <span class="check-box-label">
                               Senority
                            </span>

                            <div class="form-group">
                                <label class="control-label sr-only" for="senority">Senority</label>
                                <select name="senority" id="senority" class="senority">
                                    @foreach($senorityList as $senority)
                                        <option value="{{$senority}}" {{ $user->senority === $senority ? 'selected' : '' }}>{{$senority}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                    @endif

                    <div class="timezone text-center text-left-xs">
                        <span class="check-box-label">
                            I'm a
                        </span>

                        <div class="form-group">
                            <label class="control-label sr-only" for="working_as">I'm a</label>
                            <select name="working_as" id="working_as" class="working_as">
                                @foreach($workAsList as $work)
                                    <option value="{{$work}}" {{ $user->working_as === $work ? 'selected' : '' }}>{{$work}}</option>
                                @endforeach
                            </select>
                        </div>
                    </div>
                </div>

                <div id="dailyMailSettings">
                    <h3 class="section-head same-size-head text-center">
                        Daily Mail Time Settings
                    </h3>

                    <div class="timezone text-center text-left-xs">
                        <span class="check-box-label">
                            Select Your Preferred Time Zone
                        </span>
                        <div class="form-group">
                            <label class="control-label sr-only" for="daily_mail_timezone">Hidden label</label>
                            <select name="daily_mail_timezone" class="daily_mail_timezone" id="daily_mail_timezone">
                                <option value="EST" {{ $user->daily_mail_timezone === 'EST' ? 'selected' : '' }}>Eastern
                                    Standard Time (EST)
                                </option>
                                <option value="CST" {{ $user->daily_mail_timezone === 'CST' ? 'selected' : '' }}>Central
                                    Standard Time (CST)
                                </option>
                                <option value="MST" {{ $user->daily_mail_timezone === 'MST' ? 'selected' : '' }}>
                                    Mountain Standard Time (MST)
                                </option>
                                <option value="PST" {{ $user->daily_mail_timezone === 'PST' || !$user->daily_mail_timezone ? 'selected' : '' }}>
                                    Pacific Standard Time (PST)
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="time text-center text-left-xs">
                        <span class="check-box-label"> 
                            Select Your Preferred Time
                        </span>
                        <div class="form-group">
                            <label class="control-label sr-only" for="daily_mail_time">Hidden label</label>
                            <select name="daily_mail_time" class="daily_mail_time" id="daily_mail_time">
                                <option value="" {{ !$user->daily_mail_time ? 'selected' : '' }}>Select Time</option>
                                <option value="05:00:00" {{ $user->daily_mail_time === '05:00:00' ? 'selected' : '' }}>{{ getDailyMailTimeInPST($user->daily_mail_timezone, '1') }}</option>
                                <option value="08:00:00" {{ $user->daily_mail_time === '08:00:00' ? 'selected' : '' }}>{{ getDailyMailTimeInPST($user->daily_mail_timezone, '2') }}</option>
                                <option value="11:00:00" {{ $user->daily_mail_time === '11:00:00' ? 'selected' : '' }}>{{ getDailyMailTimeInPST($user->daily_mail_timezone, '3') }}</option>
                                <option value="14:00:00" {{ $user->daily_mail_time === '14:00:00' ? 'selected' : '' }}>{{ getDailyMailTimeInPST($user->daily_mail_timezone, '4') }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div id="communicationSettings">
                    <h3 class="section-head same-size-head text-center ">
                        Communication Settings
                    </h3>

                    <div class="text-center text-left-xs">
                        <div class="check-box">
                            <input type="checkbox" name="subscribe" value="1" @if($user->subscribe) checked @endif/>
                            <span class="check-mark"><i class="material-icons">done</i></span>
                        </div>

                        <span class="check-box-label">
                        @if ($user->role === \App\Models\User::ROLE_JOURNALIST)
                                Subscribe to the OnePitch Daily pitch email
                            @else
                                Subscribe to the OnePitch Onesie<br/>(monthly newsletter)
                            @endif
                        </span>
                    </div>
                </div>

                <div class="text-center submit-wrapper">
                    <button type="submit" class="btn btn-white-ylw btn-submit submitter" disabled>Save Changes</button>
                </div>
            </form>
        </div>
    </div>
@endsection

@push('js')
<script src="https://unpkg.com/bootstrap-datepicker@1.9.0/dist/js/bootstrap-datepicker.min.js"></script>
<script>
    var updateOutlet = {{!empty($updateOutlet) ? 1 : 0}};
    $('.datepicker').datepicker();
	$(function () {
        
        var $slct = $('.daily_mail_timezone').select2({
          minimumResultsForSearch: Infinity,
        })

        $('.daily_mail_time').select2({
          minimumResultsForSearch: Infinity,
        })

      $('.senority').select2({
        minimumResultsForSearch: Infinity,
      })

       $('.working_as').select2({
        minimumResultsForSearch: Infinity,
      })

        $slct.on('change', function (e) {
          common.changeTimeZoneTime(this)
        })

        if (updateOutlet) {
          var pubUrlElm = $('#publication_url')

          if (pubUrlElm.val() === '') {
            pubUrlElm.focus()
          } else {
            $('#author_url').focus()
          }
        }

        common.bindFormValidation();

       $('#full_name').blur();
      })

      var tourCount = {!! json_encode((array)auth()->user()->tour->edit_profile) !!};
      var userRole = {!! json_encode((array)auth()->user()->role) !!};

      if (tourCount.toString() < 2) {
        if (userRole.toString() == 1) {
          var tour = new Tour({
            storage: false,
            backdrop: true,
            backdropPadding: {
              top: 8,
              left: 10,
              bottom: 13,
              right: 10,
            },
            steps: [
              {
                element: '.content',
                placement: 'left',
                title: 'Edit Your Profile',
                content: 'Click here to edit your personal information including email, publication/outlet, social links, and email subscription settings.',
              },
              {
                element: '.single-photo-upload',
                placement: 'top',
                title: 'Update Your Profile Image',
                content: 'Click here to add or update your profile image.',
              },
              {
                element: '.close-big',
                placement: 'bottom',
                title: 'Exit Edit Profile Page',
                content: 'Click here to exit and discard any unsaved changes made to your profile.',
              },
              {
                element: '#dailyMailSettings',
                placement: 'top',
                title: 'Your Daily Mail Settings',
                content: 'Select your timezone and preferred time to receive your pitches daily.',
                backdropPadding: {
                  top: 10,
                  left: 15,
                  bottom: 18,
                  right: 15,
                },
              },
              {
                element: '#communicationSettings',
                placement: 'top',
                title: 'Email Subscription',
                content: 'Click here to unsubscribe to your [OnePitch] daily emails.',
                backdropPadding: {
                  top: 8,
                  left: -40,
                  bottom: 10,
                  right: -40,
                },
              },
              {
                element: '.btn-white-ylw',
                placement: 'top',
                title: 'Save Profile Changes',
                content: 'Click here to save any changes made to your profile.',
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
                           </div>`,
              },
            ],
            onEnd: function (tour) {
              common.validateWalkthroughEnd('edit_profile')
            },
          })
        } else if (userRole.toString() == 2) {
          var tour = new Tour({
            storage: false,
            backdrop: true,
            backdropPadding: {
              top: 8,
              left: 10,
              bottom: 13,
              right: 10,
            },

            steps: [
              {
                element: '.content',
                placement: 'left',
                title: 'Edit Your Profile',
                content: 'Click here to edit your personal information including email, agency/company name, phone number, social links, and email subscription settings.',
              },
              {
                element: '.single-photo-upload',
                placement: 'top',
                title: 'Update Your Profile Image',
                content: 'Click here to add or update your profile image.',
              },
              {
                element: '.close-big',
                placement: 'bottom',
                title: 'Exit Edit Profile Page',
                content: 'Click here to exit and discard any unsaved changes made to your profile.',
              },
              {
                element: '#dailyMailSettings',
                placement: 'top',
                title: 'Your Daily Mail Settings',
                content: 'Select your timezone and preferred time to receive your inquiries daily.',
                backdropPadding: {
                  top: 10,
                  left: 15,
                  bottom: 18,
                  right: 15,
                },
              },
              {
                element: '#communicationSettings',
                placement: 'top',
                title: 'Email Subscription',
                content: 'Click here to unsubscribe to the OnePitch OneSie.',
                backdropPadding: {
                  top: 8,
                  left: -40,
                  bottom: 10,
                  right: -40,
                },
              },
              {
                element: '.btn-white-ylw',
                placement: 'top',
                title: 'Save Profile Changes',
                content: 'Click here to save any changes made to your profile.',
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
                           </div>`,
              },
            ],
            onEnd: function (tour) {
              common.validateWalkthroughEnd('edit_profile')
            },
          })
        }

        // Initialize the tour
        tour.init()

        // Start the tour
        tour.start()
      }
    </script>
@endpush