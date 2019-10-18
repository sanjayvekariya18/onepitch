@extends('emails.layouts.layout')

@section('content')
    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0;max-width: 680px;width: 100%;" width="100%">
        @component('emails.parts.of-page.head')
            @slot('title')
                Yikes!
            @endslot
            Your inquiry could not be accepted.
        @endcomponent
        <td height="40"></td>
        <tr>
            <td width="40"></td>
            <td height="24" style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                Here's why your inquiry may have been declined:
            </td>
            <td width="40"></td>
        </tr>
        <tr><td height="8"></td></tr>
        <tr>
            <td width="40"></td>
            <td>
                <table>
                    <tr>
                        <td width="32" style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            •
                        </td>
                        <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            Missing subject line
                        </td>
                    </tr>
                    <tr>
                        <td width="32" style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            •
                        </td>
                        <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            Invalid brand name
                        </td>
                    </tr>
                    <tr>
                        <td width="32" style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            •
                        </td>
                        <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            Did not provide enough information for WHAT or WANT
                        </td>
                    </tr>
                    <tr>
                        <td width="32" style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            •
                        </td>
                        <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            Topic(s) or industry(s) do not match inquiry content
                        </td>
                    </tr>
                    <tr>
                        <td width="32" style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            •
                        </td>
                        <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            Missing event name or date(s) ***FOR EVENTS ONLY****
                        </td>
                    </tr>
                </table>
            </td>
            <td width="40"></td>
        </tr>
        <tr>
            <td></td>
            <td height="8"></td>
            <td></td>
        </tr>
        <tr>
            <td width="40"></td>
            <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                If you have any questions, please <a style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif" href="mailto:{{ config('mail.from.address') }}">contact us</a>. You can also <a style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif" href="{{ route('profile') }}">upload a new inquiry</a> and try again!
            </td>
            <td width="40"></td>
        </tr>
        <tr>
            <td height="24"></td>
            <td height="24"></td>
            <td height="24"></td>
        </tr>
        <tr>
            <td width="40"></td>
            <td>
                @component('emails.parts.of-page.button-and-link')
                    @slot('url')
                        {{ route('profile') }}
                    @endslot
                    @slot('img')
                        {{ asset('img/email/upload-inquiry-button@2x.png') }}
                    @endslot
                    @slot('to')
                        to upload a new inquiry
                    @endslot
                @endcomponent
            </td>
            <td width="40"></td>
        </tr>
    </table>
@endsection