@extends('emails.layouts.layout')

@section('content')
    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0;max-width: 680px;width: 100%;" width="100%">
        @component('emails.parts.of-page.head')
            @slot('title')
                No Match for your Interests…yet!
            @endslot
        @endcomponent
        <tr>
            <td></td>
            <td height="40"></td>
            <td></td>
        </tr>
        <tr>
            <td width="92"></td>
            <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                Sorry, your industry/topic(s) selection do not match any journalists' criteria currently signed up for the BETA. We'll send you an email as soon as we have a match for you!
            </td>
            <td width="92"></td>
        </tr>
        <tr>
            <td></td>
            <td height="16"></td>
            <td></td>
        </tr>
        <tr>
            <td width="40"></td>
            <td style="font-size: 26px;line-height: 1.23;text-align: left;color: #414745;font-family: sans-serif">
                Win cash for helping spread the word about OnePitch!
            </td>
            <td width="92"></td>
        </tr>
        <tr>
            <td></td>
            <td height="8"></td>
            <td></td>
        </tr>
        <tr>
            <td width="92"></td>
            <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                Win $100 every month for referring your PR and journalist friends. We'll select one random winner and announce them on our social media channels. One referral=one entry to win.
            </td>
            <td width="92"></td>
        </tr>
        <tr>
            <td></td>
            <td height="24"></td>
            <td></td>
        </tr>
        <tr>
            <td width="92"></td>
            <td height="24" style="font-size: 15px;line-height: 1.6;text-align: center;color: #414745;font-family: sans-serif">
                It's time to <b>#QuitBitchingAboutPitching</b>
            </td>
            <td width="92"></td>
        </tr>
        <tr>
            <td></td>
            <td height="24"></td>
            <td></td>
        </tr>
        <tr>
            <td width="92"></td>
            <td>
                @component('emails.parts.of-page.button-and-link')
                    @slot('url')
                        {{ route('referral') }}
                    @endslot
                    @slot('img')
                        {{ asset('img/email/get-started-button@2x.png') }}
                    @endslot
                    @slot('to')
                        to get started
                    @endslot
                @endcomponent
            </td>
            <td width="92"></td>
        </tr>
    </table>
@endsection