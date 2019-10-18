@extends('layouts.simple', [
    'body_classes' => ['login_admin_page_wrap'],
    'without_logo' => true,
    'no_footer' => true,
])

@section('title', 'Admin')

@section('content')
    <div class="container login_admin_page">
        <div class="content">
            <div class="img_wrap">
                {{HTML::image('/images/one-pitch-logo-medium.png')}}
            </div>
            <form id="signup-form" action="{{ route('admin.login') }}" method="post" data-parsley-focus="none">
                @foreach ($errors as $error)
                    <div class="error">{{ $error }}</div>
                @endforeach

                <div class="row">
                    <div class="field col-sm-12">
                        <input type="text" name="email" value="{{ Request::input('email') }}" required  placeholder=" "  />
                        <div class="floating-label">Username</div>
                    </div>
                    <div class="field col-sm-12 password-input">
                        <input type="password" name="password"
                               value="{{ Request::input('password') }}"
                               required placeholder=" " >
                        <i class="material-icons show-pass" onclick="common.togglePasswordField(this);">visibility_off</i>
                        <div class="floating-label">Password</div>
                    </div>
                </div>

                <div class="text-center submit-wrapper">
                    <button type="submit" class="btn btn-white-ylw btn-submit submitter" disabled>LOGIN</button>
                </div>
            </form>
        </div>
    </div>
@endsection

@push('js')
    <script type="text/javascript">
        function checkForm(){
            if(form.checkFields('admin')){
                InputEffects.init();
                $('[type="submit"]').removeAttr('disabled');
            } else {
                $('[type="submit"]').attr('disabled', 'disabled');
            }
        }
        $(function(){
            InputEffects.init();
            $('input').keyup(function(){
                checkForm();
            });
            setTimeout(function(){
                checkForm();
            }, 1000);
        });
    </script>
@endpush