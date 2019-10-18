@extends('emails.layouts.layout')

@section('content')
    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0;max-width: 680px;width: 100%;" width="100%">
        @component('emails.parts.of-page.head')
            @slot('title')
                Good News
            @endslot
                You are now a Founding Contributor!
        @endcomponent
        <tr>
            <td width="92"></td>
            <td>
                <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0" width="100%">
                    <tr>
                        <td height="40"></td>
                    </tr>
                    <tr>
                        <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif;">
                            We are beyond excited. And you should be too! In order to start referring contacts, access the link below or find it within your profile at any time. REMEMBER PUBLICISTS: To receive your prize, your referral MUST join AND submit a pitch.
                        </td>
                    </tr>
                    <tr>
                        <td height="24"></td>
                    </tr>
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0" width="100%">
                                <tr>
                                    <td></td>
                                    <td height="2" style="height: 2px; background-color: #ffd831"></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td height="6"></td>
                                </tr>
                                <tr>
                                    <td width="30%"></td>
                                    <td width="40%" style="font-size: 15px;font-weight: 500;line-height: 1.6;text-align: center;color: #414745;font-family: sans-serif">
                                        http://onepitch.com/jeredmartin
                                    </td>
                                    <td width="30%"></td>
                                </tr>
                                <tr>
                                    <td height="6"></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td height="2" style="height: 2px; background-color: #ffd831"></td>
                                    <td></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="16"></td>
                    </tr>
                    <tr>
                        <td align="center" style="font-size: 15px;line-height: 1.6;text-align: center;color: #414745;font-family: sans-serif">
                            Find this link in <a style="color:#414745;font-family: sans-serif" href="{{ url('') }}">your profile</a> at any time.
                        </td>
                    </tr>
                    <tr>
                        <td height="40"></td>
                    </tr>
                </table>
            </td>
            <td width="92"></td>
        </tr>
    </table>
@endsection