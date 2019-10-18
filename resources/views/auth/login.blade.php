@extends('layouts.simple', ['without_signup' => true])

@section('title', 'Login')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
    <div class="container">
        <div class="content">
            <h2 class="text-center signin-header">Sign In</h2>

            <div class="text-center">
                <a href="{{ route('signup_select_role') }}" class="signin-head-link">Don’t have an account?</a>
            </div>

            <hr class="small"/>

            <div class="buttons-group m-t-48">
                <a href="{{ route('auth_social_redirect', ['driver' => 'linkedin']) }}"
                   class="btn btn-white-ylw linkedin">Sign in with linkedin</a>
                <a href="{{ route('auth_social_redirect', ['driver' => 'twitter']) }}"
                   class="btn btn-white-ylw twitter">Sign in with twitter</a>
            </div>

            <form id="signup-form" action="{{ route('login') }}" method="post" data-parsley-focus="none">


                <div class="signin-variant-head">Or sign in with an email address</div>

                @foreach ($errors as $error)
                    <div class="error">{{ $error }}</div>
                @endforeach

                <div class="row">
                    <div class="form-group col-sm-6">
                        <label for="username" class="active">Username</label>
                        <input type="text" class="form-control email" name="email" id="username"
                               value="{{ Request::input('email') }}" required
                               data-parsley-remote="{{ route('service_check_email') }}?value={value}"
                               data-parsley-remote-message="Invalid email" placeholder="Email" />
                    </div>
                    <div class="form-group col-sm-6 password-input">
                        <label for="passwd" class="active">Password</label>
                        <input type="password" class="form-control password validate" name="password" id="passwd"
                               value="{{ Request::input('password') }}" required placeholder="Password" autocomplete="new-password" />
                        <i class="material-icons show-pass" onclick="common.togglePasswordField(this);">visibility_off</i>
                        <a href="{{ route('password.request') }}" class="forgot-password-link">Forgot Password?</a>
                    </div>
                </div>

                <div class="text-center submit-wrapper">
                    <button type="submit" class="btn btn-white-ylw btn-submit submitter">Sign In</button>
                </div>
            </form>
        </div>
    </div>
@endsection

@push('js')
<script>
	$(function(){
		common.bindLoginFormValidation();
    });
</script>
@endpush