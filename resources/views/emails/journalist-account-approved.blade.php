@extends('emails.layouts.layout')

@section('content')
    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0;max-width: 680px;width: 100%;" width="100%">
        @component('emails.parts.of-page.head')
            @slot('title')
                Your account has been approved!
            @endslot
        @endcomponent

        @component('emails.parts.of-page.content')
                To view and edit your profile click the button below or hang tight for your first Daily OnePitch email.
        @endcomponent
        <tr><td height="12"></td></tr>
        <tr>
            <td width="92"></td>
            <td>
                @component('emails.parts.of-page.button-and-link')
                    @slot('url')
                        {{ route('profile') }}
                    @endslot
                    @slot('img')
                        {{ asset('img/email/view-profile-button@2x.png') }}
                    @endslot
                    @slot('to')
                        to view your profile
                    @endslot
                @endcomponent
            </td>
            <td width="92"></td>
        </tr>
    </table>
@endsection