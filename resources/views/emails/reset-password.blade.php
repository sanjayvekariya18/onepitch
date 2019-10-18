@extends('emails.layouts.layout')

@section('content')
    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0;max-width: 680px;width: 100%;" width="100%">
        @component('emails.parts.of-page.head')
            @slot('title')
                We all forget sometimes.
            @endslot

                We received a request to reset your password.
        @endcomponent
        @component('emails.parts.of-page.content')
            <span class="reset-text">If you did not make this request, just ignore this email. Otherwise, click the button below to change your password.</span>
        @endcomponent
        <tr><td height="12"></td></tr>
        <tr>
            <td width="92"></td>
            <td>
                @component('emails.parts.of-page.button-and-link')
                    @slot('url')
                        {{ url(config('app.url').route('password.reset', $token, false)).'?email='.$email }}
                    @endslot
                    @slot('img')
                        {{ asset('img/email/reset-password-button@2x.png') }}
                    @endslot
                    @slot('to')
                        to reset password
                    @endslot
                @endcomponent
            </td>
            <td width="92"></td>
        </tr>
    </table>
@endsection