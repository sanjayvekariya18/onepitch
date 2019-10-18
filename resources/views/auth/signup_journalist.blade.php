@extends('layouts.simple')

@section('title', 'Journalist - Sign Up')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
    <div class="container">
        @include('journalist.profile_steps', ['step' => 'profile'])

        <div class="content">
            <h2 class="text-center">Hey journalist! Let’s set up your profile.</h2>

            <hr class="small"/>

            <h3 class="section-head text-center m-b-32">Publicists don't know your contact information or preferences until you respond to a pitch.</h3>

            <div class="buttons-group">
                <a href="{{ route('auth_social_redirect', ['driver' => 'linkedin']) }}?signup={{ \App\Models\User::ROLE_JOURNALIST }}"
                   class="btn btn-white-ylw linkedin">Sign up with linkedin</a>
                <a href="{{ route('auth_social_redirect', ['driver' => 'twitter']) }}?signup={{ \App\Models\User::ROLE_JOURNALIST }}"
                   class="btn btn-white-ylw twitter">Sign up with twitter</a>
            </div>

            <h3 class="section-head text-center">(Or set it up manually)</h3>

            <form id="signup-form" action="{{ route('signup_journalist') }}" method="post" enctype="multipart/form-data" data-parsley-focus="none">
                <div class="text-center m-b-40">
                    <div class="single-photo-upload">
                        <div class="photo-rnd">
                            <div class="photo-preview-wrapper" onclick="common.openSinglePhotoUploader(this);">
                                <i class="material-icons">add</i>
                                <img class="photo-preview" id="user-photo" src="{{ getUserPhotoUrl($user) }}" alt="Photo Preview" />
                            </div>
                        </div>
                        <a href="javascript:void(0);" class="photo-selector"
                           onclick="common.openSinglePhotoUploader(this);">@if (!getUserPhotoUrl($user)) Add Photo @else
                                Change Photo @endif</a>
                        <input type="file" name="photo" accept="image/*" onchange="common.onSinglePhotoSelected(event);"/>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-sm-6">
                        <input type="text" class="form-control" name="full_name" id="full_name" placeholder="Full Name"
                               value="{{ $user ? $user->full_name : '' }}" onkeyup="common.charsCount(this);" required maxlength="100">
                        <label for="full_name" class="active">Full Name</label>
                        <div class="counter"></div>
                    </div>
                    <div class="form-group col-sm-6">
                        <input type="text" class="form-control" name="title" id="title"
                               value="{{ $user ? $user->title : '' }}" placeholder="Title" required>
                        <label for="title">Title</label>
                    </div>
                    <div class="form-group col-sm-6">
                        <input type="text" class="form-control" name="company" id="company"
                               value="{{ $user ? $user->company : '' }}" placeholder="Publication / Outlet" required>
                        <label for="company">Publication / Outlet</label>
                    </div>
                    <div class="form-group col-sm-6">
                        <input type="text" class="form-control" name="birthday" id="birthday"
                               value="{{ $user ? $user->birthday : '' }}" placeholder="Birthdate (MM/DD/YYYY)" required>
                        <label for="birthday">Birthday</label>
                    </div>
                    <div class="form-group col-sm-6">
                        <input type="email" class="form-control" id="email" name="email" placeholder="Email Address"
                               value="{{ $user ? $user->email : '' }}" required data-parsley-remote="{{ route('service_check_unique_email') }}?value={value}{{ $user ? '&except_id='.$user->id : '' }}"
                               data-parsley-remote-message="Email already used">
                        <label for="email">Your email is safe with us - we don't like to spam.</label>
                    </div>
                    <div class="form-group col-sm-6">
                        <input type="text" class="form-control" id="confirm_email" name="confirm_email" placeholder="Confirm Email Address"
                               value="{{ $user ? $user->email : '' }}" required data-parsley-matchto="#email" data-parsley-matchto-message="Email must match">
                        <label for="confirm_email">Confirm Email Address</label>
                    </div>

                    <div class="form-group col-sm-6">
                        <input type="url" class="form-control social-link-input" name="publication_url" id="publication_url"
                               placeholder="Publication URL" value="{{ $user ? $user->publication_url : '' }}" required>
                        <label>Publication URL</label>
                    </div>

                    <div class="form-group col-sm-6">
                        <input type="url" class="form-control social-link-input" name="author_url" id="author_url"
                               placeholder="Author URL" value="{{ $user ? $user->author_url : '' }}" required>
                        <label>Author URL</label>
                    </div>

                    @if (!$user)
                    <div class="form-group col-sm-6 password-input">
                        <input type="password" class="form-control" id="password" name="password" placeholder="Password"
                               required minlength="6" autocomplete="new-password">
                        <label for="password">Password</label>
                        <i class="material-icons show-pass" onclick="common.togglePasswordField(this);">visibility_off</i>
                    </div>
                    <div class="form-group col-sm-6 password-input">
                        <input type="password" class="form-control" name="confirm_password" id="confirm_password"
                               placeholder="Confirm Password" required data-parsley-equalto="#password"
                               data-parsley-equalto-message="Password must match">
                        <label for="confirm_password">Confirm Password</label>
                        <i class="material-icons show-pass" onclick="common.togglePasswordField(this);">visibility_off</i>
                    </div>
                    @endif

                    <div class="form-group col-sm-6">
                        <h3 class="section-head m-t-15">
                            I'm a
                        </h3>
                        <select name="working_as" id="working_as" class="form-control hear-about-select">
                            @foreach($workAsList as $work)
                                <option value="{{$work}}" {{ $user->work_as === $work ? 'selected' : '' }}>{{$work}}</option>
                            @endforeach
                        </select>
                    </div>

                    <h3 class="section-head col-sm-12 m-t-15">
                        Add one or both
                    </h3>
                    <div class="form-group col-sm-6">
                        <input type="url" class="form-control social-link-input" name="twitter_url" id="twitter_url"
                               onfocus="common.validateSocialLinksClear();" onblur="common.validateSocialLinks(this);"
                               placeholder="Twitter URL" value="{{ $user ? $user->twitter_url : '' }}">
                        <label for="twitter_url">Twitter URL</label>
                    </div>
                    <div class="form-group col-sm-6">
                        <input type="url" class="form-control social-link-input" name="linkedin_url" id="linkedin_url"
                               onfocus="common.validateSocialLinksClear();" onblur="common.validateSocialLinks(this);"
                               placeholder="LinkedIn URL" value="{{ $user ? $user->linkedin_url : '' }}">
                        <label for="linkedin_url">LinkedIn URL</label>
                    </div>
                    <div class="form-group col-sm-12">
                        <input type="text" id="social_links" class="form-control hidden"
                               value="{{ $user ? $user->twitter_url.$user->linkedin_url : '' }}" required
                               data-parsley-required-message="At least one is required"/>
                    </div>

                    <h3 class="section-head col-sm-12 m-t-15">How did you hear about us</h3>
                    <div class="form-group col-sm-6">
                        <label for="hear-about">Hear About</label>
                        <select onchange="common.showSpecifyAboutUsField(this)" name="hear_about" id="hear-about" class="form-control hear-about-select" required>
                            <option disabled {{ $user->hear_about === null ? 'selected' : '' }} value> -- Select an Option -- </option>
                            <option {{ $user->hear_about === 'LinkedIn Group' ? 'selected' : '' }} value="LinkedIn Group">LinkedIn - Group</option>
                            <option {{ $user->hear_about === 'LinkedIn Post' ? 'selected' : '' }} value="LinkedIn Post">LinkedIn - Post</option>
                            <option {{ $user->hear_about === 'LinkedIn Ad' ? 'selected' : '' }} value="LinkedIn Ad">LinkedIn - Ad</option>
                            <option {{ $user->hear_about === 'Instagram' ? 'selected' : '' }} value="Instagram">Instagram</option>
                            <option {{ $user->hear_about === 'Facebook' ? 'selected' : '' }} value="Facebook">Facebook</option>
                            <option {{ $user->hear_about === 'Twitter' ? 'selected' : '' }} value="Twitter">Twitter</option>
                            <option {{ $user->hear_about === 'Reddit' ? 'selected' : '' }} value="Reddit">Reddit</option>
                            <option {{ $user->hear_about === 'Slack' ? 'selected' : '' }} value="Slack">Slack</option>
                            <option {{ $user->hear_about === 'Ad' ? 'selected' : '' }} value="Ad">Ad</option>
                            <option {{ $user->hear_about === 'Search' ? 'selected' : '' }} value="Search">Search</option>
                            <option {{ $user->hear_about === 'Article' ? 'selected' : '' }} value="Article">Article: </option>
                            <option {{ $user->hear_about === 'Email' ? 'selected' : '' }} value="Email">Email: </option>
                            <option {{ $user->hear_about === 'Event' ? 'selected' : '' }} value="Event">Event: </option>
                            <option {{ $user->hear_about === 'Podcast' ? 'selected' : '' }} value="Podcast">Podcast: </option>
                            <option {{ $user->hear_about === 'Referral' ? 'selected' : '' }} value="Referral">Referral: </option>
                            <option {{ $user->hear_about === 'Other' ? 'selected' : '' }} value="Other">Other: </option>
                        </select>
                    </div>
                    <div class="form-group col-sm-6 hear-about-input">
                        <input class="form-control hear_about_other" name="hear_about_other" id="hear_about_other"
                               placeholder="Please specify..." value="{{ $user ? $user->hear_about_other : '' }}">
                        <label for="hear_about_other">Please specify</label>
                    </div>
                </div>

                <div class="text-center submit-wrapper">
                    <button type="button" onclick="submitWithoutPitch(this)" class="btn btn-white-ylw btn-submit submitter" >Next</button>
                </div>

                @include('auth/tos_modal')
            </form>
        </div>
    </div>
@endsection

@push('js')
<script>
	$(function(){
		common.bindFormValidation();
    });
    
    function submitWithoutPitch(el) {
        $('#signup-form').parsley().validate();
        var numErrors = $('.invalid-message.filled').length;
        if(numErrors==0){
			auth.openTos();
        }
		return false;
	}
</script>
@endpush