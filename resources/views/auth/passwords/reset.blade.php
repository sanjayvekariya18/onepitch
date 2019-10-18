@extends('layouts.simple', ['without_menu' => isset($edit_profile)])

@section('title', 'Reset Password')

@if (isset($edit_profile))
    <a href="{{ route('profile_edit') }}" class="close-big">&nbsp;</a>
@endif

@section('content')
    <div class="container">
        <div class="content">

            <h2 class="text-center signin-header">Create New Password</h2>

            <hr class="small m-b-40"/>

            <form id="signup-form" action="{{ isset($edit_profile) ? route('profile_reset_password') : route('password.reset_submit') }}" method="post" data-parsley-focus="none">
                <div class="row">
                    <div class="form-group col-sm-6 col-sm-offset-3 password-input">
                        <input type="password" class="form-control" id="password" name="password" placeholder="New Password"
                               required minlength="6">
                        <label>New Password</label>
                        <i class="material-icons show-pass" onclick="common.togglePasswordField(this);">visibility_off</i>
                    </div>
                    <div class="form-group col-sm-6 col-sm-offset-3 password-input">
                        <input type="password" class="form-control" name="password_confirmation"
                               placeholder="Confirm New Password" required data-parsley-equalto="#password"
                               data-parsley-equalto-message="Password Don't Match">
                        <label>Confirm New Password</label>
                        <i class="material-icons show-pass" onclick="common.togglePasswordField(this);">visibility_off</i>
                    </div>
                </div>

                <input type="hidden" name="email" value="{{ $email }}"/>
                <input type="hidden" name="token" value="{{ $token }}"/>

                <div class="text-center submit-wrapper">
                    <button type="submit" class="btn btn-white-ylw btn-submit submitter" disabled>Save Password</button>
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
</script>
@endpush