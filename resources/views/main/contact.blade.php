@extends('layouts.simple', [
    'top_footer' => true,
    'body_classes' => ['contact_page_wrap'],
])

@section('title', 'Contact Us')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
    <div class="faq_page contact_page">
        <div class="page_header">
            <div class="page_title">
                {{$is_sent ? 'Message Sent' : 'Contact'}}
            </div>
            <div class="line_separator"></div>
            <div class="bottom_text">
                @php
                    $text = 'Have a question or just want to say hi? Send us a message below';
                @endphp
                {{$is_sent ? 'Thanks for contacting us, we will reply shortly!' : $text}}
            </div>
        </div>
        <div class="page_content">
            @if(!$is_sent)
                <div class="form_wrap">
                    <form id="signup-form" action="{{ route('contact') }}" method="post" data-parsley-focus="none">
                        @foreach ($errors as $error)
                        <div class="error">{{ $error }}</div>
                        @endforeach

                        <div class="row">
                            <div class="form-group col-sm-6">
                                <input type="text" class="form-control" name="name" placeholder="Name" value="{{ Request::input('name') }}" required>
                                <div class="bottom_text">Any name you go by works!</div>
                            </div>
                            <div class="form-group col-sm-6">
                                <input type="text" class="form-control" name="email" placeholder="Email Address" value="{{ Request::input('email') }}" required>
                                <div class="bottom_text">We will send replies here.</div>
                            </div>
                            {{--<h3 class="section-head col-sm-12 m-t-15">How did you hear about us</h3>--}}
                            <div class="form-group col-sm-6">
                                <select onchange="common.showSpecifyAboutUsField(this)" name="hear_about" id="hear-about" class="form-control hear-about-select" required>
                                    <option disabled selected value> -- Select an Option -- </option>
                                    <option value="LinkedIn Group">LinkedIn - Group</option>
                                    <option value="LinkedIn Post">LinkedIn - Post</option>
                                    <option value="LinkedIn Ad">LinkedIn - Ad</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Facebook">Facebook</option>
                                    <option value="Twitter">Twitter</option>
                                    <option value="Reddit">Reddit</option>
                                    <option value="Slack">Slack</option>
                                    <option value="Ad">Ad</option>
                                    <option value="Search">Search</option>
                                    <option value="Article">Article: </option>
                                    <option value="Email">Email: </option>
                                    <option value="Event">Event: </option>
                                    <option value="Podcast">Podcast: </option>
                                    <option value="Referral">Referral: </option>
                                    <option value="Other">Other: </option>
                                </select>
                                <div class="bottom_text">How did you hear about us</div>
                            </div>
                            <div class="form-group col-sm-6 hear-about-input">
                                <input class="form-control hear_about_other" name="hear_about_other"
                                       placeholder="Please specify..." value="{{ !empty($user) ? $user->hear_about_other : '' }}">
                                <label>Please specify</label>
                            </div>
                            <div class="form-group col-sm-12">
                                <div class="text_area">
                                    <textarea name="message" placeholder="Message" class="form-control" required>{{ Request::input('message') }}</textarea>
                                    <div class="bottom_text">
                                        <span>0</span>/1000
                                    </div>
                                </div>
                                <div class="btn_wrap">
                                    <button type="submit" class="btn btn-white-ylw btn-submit submitter" disabled>SEND</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            @endif
        </div>
    </div>
@endsection

@push('js')
    <script>
        $(function(){
            $('textarea').keyup(function(){
                $('.text_area .bottom_text span').text($(this).val().length);
            });
            common.bindFormValidation();
        });
    </script>
@endpush