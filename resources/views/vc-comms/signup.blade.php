@extends('layouts.simple')

@section('title', 'Venture Capital - Sign Up')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
    <div class="container">
        @include('journalist.profile_steps', ['step' => 'profile'])

        <div class="content">
            <form id="signup-form" action="{{ route('signup_venture_capital') }}" method="post" enctype="multipart/form-data" data-parsley-focus="none">

                <div class="row">
                    <div class="form-group col-sm-12">
                        <input type="text" class="form-control" name="full_name" id="full_name" placeholder="Full Name"
                               value="{{ $user ? $user->full_name : '' }}" onkeyup="common.charsCount(this);" required maxlength="100">
                        <label for="full_name" class="active">Full Name</label>
                        <div class="counter"></div>
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
	$(function(){
		common.bindFormValidation();
	});
</script>
@endpush