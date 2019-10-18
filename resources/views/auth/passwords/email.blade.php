@extends('layouts.simple')

@section('title', 'Reset Password Request')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
    <div class="container">
        <div class="content">
            <h2 class="text-center signin-header">Reset Password</h2>

            <hr class="small"/>

            <h3 class="section-head text-center">Send reset link to the email below.</h3>

            <div class="text-center m-b-32">
                <a href="{{ route('signup_select_role') }}" class="signin-head-link">Don’t have an account?</a>
            </div>

            <form id="signup-form" action="{{ route('password.email') }}" method="post" data-parsley-focus="none">
                <div class="row">
                    <div class="form-group col-sm-6 col-sm-offset-3">
                        <input type="text" class="form-control" name="email" placeholder="Email Address"
                               value="{{ Request::input('email') }}" required
                               data-parsley-remote-message="No such email address">
                        <label>Email Address</label>
                    </div>
                </div>

                <div class="text-center submit-wrapper">
                    <button type="submit" class="btn btn-white-ylw btn-submit submitter" disabled>Send Reset Link</button>
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