@extends('emails.layouts.layout')

@section('content')
    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0;max-width: 680px;width: 100%;" width="100%">
        @component('emails.parts.of-page.head')
            @slot('title')
                Thanks for signing up!
            @endslot
                Please confirm your email address.
        @endcomponent

        @component('emails.parts.of-page.content')
                To confirm this is your correct email, please click the button below.
        @endcomponent
        <tr>
            <td></td>
            <td height="12"></td>
            <td></td>
        </tr>
        <tr>
            <td width="92"></td>
            <td>
                @component('emails.parts.of-page.button-and-link')
                    @slot('url')
                        {{ route('auth.confirm-email', ['code' => $user->verification_code]) }}
                    @endslot
                    @slot('img')
                        {{ asset('img/email/confirm-button@2x.png') }}
                    @endslot
                    @slot('to')
                        to confirm
                    @endslot
                @endcomponent
            </td>
            <td width="92"></td>
        </tr>
    </table>
@endsection