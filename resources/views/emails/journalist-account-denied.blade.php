@extends('emails.layouts.layout')

@section('content')
    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0;max-width: 680px;width: 100%;" width="100%">
        @component('emails.parts.of-page.head')
            @slot('title')
                Yikes!
            @endslot
                Your profile has some issues and was not able to be created.
        @endcomponent
        <td height="40"></td>
        <tr>
            <td width="92"></td>
            <td height="24" style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                Here's why your account may have been declined:
            </td>
            <td width="92"></td>
        </tr>
        <tr><td height="8"></td></tr>
        <tr>
            <td width="92"></td>
            <td>
                <table>
                    <tr>
                        <td width="32" style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            •
                        </td>
                        <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            Missing Publication / Outlet
                        </td>
                    </tr>
                    <tr>
                        <td width="32" style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            •
                        </td>
                        <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            Missing Twitter or LinkedIn URL
                        </td>
                    </tr>
                    <tr>
                        <td width="32" style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            •
                        </td>
                        <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            Forgot to set a password
                        </td>
                    </tr>
                    <tr>
                        <td width="32" style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            •
                        </td>
                        <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                            You’re a bot and we hate you.
                        </td>
                    </tr>
                </table>
            </td>
            <td width="92"></td>
        </tr>
        <tr>
            <td height="24"></td>
        </tr>
        <tr>
            <td width="92"></td>
            <td>
                @component('emails.parts.of-page.button-and-link')
                    @slot('url')
                        {{ route('signup_journalist') }}
                    @endslot
                    @slot('img')
                        {{ asset('img/email/re-apply-button@2x.png') }}
                    @endslot
                    @slot('to')
                        to reapply
                    @endslot
                @endcomponent
            </td>
            <td width="92"></td>
        </tr>
    </table>
@endsection