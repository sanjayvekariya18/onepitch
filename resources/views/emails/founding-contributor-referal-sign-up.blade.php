@extends('emails.layouts.layout')

@section('content')
    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0;max-width: 680px;width: 100%;" width="100%">
        @component('emails.parts.of-page.head')
            @slot('title')
                Nice Job!
            @endslot
                Your referral “John Doe” has signed up and uploaded their first pitch.
        @endcomponent
        <tr>
            <td width="92px"></td>
            <td>
                <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0" width="100%">
                    <tr>
                        <td height="40"></td>
                    </tr>
                    <tr>
                        <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif;">
                            Your cash money is on the way! Keep sharing your referral code for more chances to earn cash for helping out. Remember: there's no limit how many referrals you send or how much you earn. As a reminder, here's your reward for spreading the word:
                        </td>
                    </tr>
                    <tr>
                        <td height="8"></td>
                    </tr>
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0" width="100%">
                                <tr>
                                    <td width="32" style="vertical-align: top;font-family: sans-serif">
                                        •
                                    </td>
                                    <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745; font-family: sans-serif">
                                        $25 to Amazon
                                    </td>
                                </tr>
                                <tr>
                                    <td width="32" style="vertical-align: top;font-family: sans-serif">
                                        •
                                    </td>
                                    <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745; font-family: sans-serif">
                                        All gifts are sent on Friday of each week
                                    </td>
                                </tr>
                                <tr>
                                    <td width="32" style="vertical-align: top;font-family: sans-serif">
                                        •
                                    </td>
                                    <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745; font-family: sans-serif">
                                        Keep an eye out in your INBOX for the gift (via email)
                                    </td>
                                </tr>
                            </table>
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
                    <tr><td height="16"></td></tr>
                    <tr>
                        <td align="center" style="font-size: 15px;line-height: 1.6;text-align: center;color: #414745;font-family: sans-serif">
                            Find this link in <a style="color:#414745;font-family: sans-serif" href="{{ url('') }}">your profile</a> at any time.
                        </td>
                    </tr>
                    <tr><td height="40"></td></tr>
                </table>
            </td>
            <td width="92px"></td>
        </tr>
    </table>
@endsection