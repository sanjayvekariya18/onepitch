@extends('layouts.landing', [
    'with_header' => true,
])

@section('title', 'Investor Pitch - OnePitch')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
    <div class="faq_page referral_page">
        <div class="page_header">
            <div class="page_title">
                Welcome to our Investor Pitch!
            </div>
            <div class="bottom_text" style="max-width: 821px;">
                *Please check that you are an accredited investor and then select the date that works best for you for a 30-minute pitch session. We look forward to presenting OnePitch.
            </div>
            <div class="agree-checkbox" style="text-align: center; padding-top: 48px; text-transform: uppercase">
                <div class="check-box">
                    <input type="checkbox" class="agree_sample" name="agree_sample" value="1" onchange="toggleButton(this, '.sample-button')"/>
                    <span class="check-mark">
                                        <i class="material-icons">done</i>
                                    </span>
                </div>

                <span class="check-box-label">I AM AN ACCREDITED INVESTOR.</span>
            </div>
            <div class="submit-wrapper">
                {{--<a href="https://zoom.us/webinar/register/WN_g9ZpSjYqRxeQSAG886uNBA" class="btn btn-white-ylw btn-submit sample-button" disabled style="height: auto;line-height: 30px; margin: 5px 20px;">--}}
                    {{--NOV. 13TH <br/> Tuesday, 8am PT--}}
                {{--</a>--}}

                {{--<a href="https://zoom.us/webinar/register/WN_hJ3O9EqYQ4aR2DLODCFIIA" class="btn btn-white-ylw btn-submit sample-button" disabled style="height: auto;line-height: 30px; margin: 5px 20px;">--}}
                    {{--NOV. 15TH <br/> Thursday, 12pm PT--}}
                {{--</a>--}}

                <a href="https://zoom.us/webinar/register/WN_wIBqzlpcTbqHhdy6lYFVRw" class="btn btn-white-ylw btn-submit sample-button" disabled style="height: auto;line-height: 30px; margin: 5px 20px;">
                    NOV. 27TH <br/> Tuesday, 8:30am PT
                </a>

                <a href="https://zoom.us/webinar/register/WN_lo5vIeCtTK-Ux-qAalgFrg" class="btn btn-white-ylw btn-submit sample-button" disabled style="height: auto;line-height: 30px; margin: 5px 20px;">
                    NOV. 27TH <br/> Tuesday, 3pm PT
                </a>
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script>
        function toggleButton (el, btn) {
            if ($(el).is(':checked')) {
                $(btn).prop('disabled', false);
                $(btn).removeAttr('disabled');
            } else {
                $(btn).prop('disabled', true);
                $(btn).attr('disabled', 'disabled');
            }
        }
    </script>
@endpush