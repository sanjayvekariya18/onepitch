@extends('emails.layouts.layout')

@section('header')
    <a href="{{ url('/') }}">
        <img style="width:150px;border:none;" src="{{ asset('img/email/onepitch-daily-logo@2x.png') }}">
    </a>
@endsection

@section('content')
    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0;max-width: 680px;width: 100%;">
        <tbody>
        <tr>
            <td></td>
            <td height="16"></td>
            <td></td>
        </tr>
        <tr align="center">
            <td width="*"></td>
            <td style="min-width:320px;max-width:680px;width:680px;">
                <table border="0" cellpadding="0" cellspacing="0" style="margin:0;padding:0;width:100%">
                    <tr>
                        <td>
                            <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0;max-width: 680px;width: 100%;">
                                <tr>
                                    <td width="40" style="background-color: #f4f5f5;"></td>
                                    <td style="height: 48px;background-color: #f4f5f5;font-size: 14px;font-weight: 500;line-height: 1.14;letter-spacing: 1.5px;text-align: center;color: #414745;font-family: sans-serif;text-transform: uppercase">
                                        {{ count($inquiries) }} INQUIRIES: {{ strtoupper(date('l, F j, Y')) }}
                                    </td>
                                    <td width="40" style="background-color: #f4f5f5;"></td>
                                </tr>
                                @foreach($inquiries as $i => $item)
                                    <tr>
                                        <td width="40"></td>
                                        <td height="24"></td>
                                        <td width="40"></td>
                                    </tr>
                                    <tr>
                                        <td width="40"></td>
                                        <td>
                                            <span style="background-color: #ffd831;width: 40px;height: 40px;display: block;line-height: 38px;font-size: 24px;font-family: sans-serif;font-weight: bold;text-align: center;">{{ 1 + $i }}</span>
                                        </td>
                                        <td width="40"></td>
                                    </tr>
                                    <tr>
                                        <td width="40"></td>
                                        <td>
                                            <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0;width:100%" width="100%">
                                                <tr>
                                                    <td height="16"></td>
                                                </tr>
                                                <tr>
                                                    <td style="width: 600px;height: 32px;font-size: 26px;line-height: 1.23;text-align: left;color: #414745;font-family: sans-serif">
                                                        {{ $item['inquiry']->subject }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 14px;line-height: 1.71;text-align: left;color: #414745;font-family: sans-serif;" height="24">
                                                        <b>Brand:</b> {{ $item['inquiry']->company ? $item['inquiry']->company : 'N/A' }}
                                                    </td>
                                                </tr>
                                                @if($item['inquiry']->website)
                                                    <tr>
                                                        <td style="font-size: 14px;line-height: 1.71;text-align: left;color: #414745;font-family: sans-serif;" height="24">
                                                            <b>Website:</b> <a href="{{ adjustUrl($item['inquiry']->website) }}" target="_blank">{{ $item['inquiry']->website }}</a>
                                                        </td>
                                                    </tr>
                                                @endif
                                                <tr>
                                                    <td height="8"></td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 14px;line-height: 1.43;text-align: left;color: #414745;font-family: sans-serif;">
                                                        <b>Industries:</b> {{ implode(', ', $item['indstrs_data']['industries']->pluck('title')->toArray()) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="font-size: 14px;line-height: 1.43;text-align: left;color: #414745;font-family: sans-serif;">
                                                        <b>Topics:</b> {{ implode(', ', $item['indstrs_data']['topics']->pluck('title')->toArray()) }}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td height="8"></td>
                                                </tr>
                                                @if ($item['inquiry']->files[0])
                                                    <tr>
                                                        <td style="font-size: 14px;line-height: 1.43;text-align: left;color: #414745;font-family: sans-serif;" height="40">
                                                            <b>Media Attachment:</b> <a href="{{ getBucketPreUrl().$item['inquiry']->files[0]->url }}" target="_blank">{{ $item['inquiry']->files[0]->name }}</a>
                                                            @if ($item['inquiry']->files[1]), <a href="{{ getBucketPreUrl().$item['inquiry']->files[1]->url }}" target="_blank">{{ $item['inquiry']->files[1]->name }}</a>@endif
                                                            @if ($item['inquiry']->files[2]), <a href="{{ getBucketPreUrl().$item['inquiry']->files[2]->url }}" target="_blank">{{ $item['inquiry']->files[2]->name }}</a>@endif
                                                        </td>
                                                    </tr>
                                                @endif
                                                @if($item['event'])
                                                    <tr>
                                                        <td height="16"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            @include('emails.parts.event', ['event' => $item['event']])
                                                        </td>
                                                    </tr>
                                                @endif
                                            </table>
                                        </td>
                                        <td width="40"></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td height="24"></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td width="40"></td>
                                        <td>
                                            @include('emails.parts.what_why', ['inquiry' => $item['inquiry']])
                                        </td>
                                        <td width="40"></td>
                                    </tr>
                                    <tr>
                                        <td width="40"></td>
                                        <td height="8"></td>
                                        <td width="40"></td>
                                    </tr>
                                    <tr>
                                        <td width="40"></td>
                                        <td>
                                            @if($item['user'])
                                                @include('emails.parts.user-info', ['user' => $item['user']])
                                            @endif
                                        </td>
                                        <td width="40"></td>
                                    </tr>
                                    <tr>
                                        <td width="40"></td>
                                        <td align="center" style="text-align: center">
                                            <a href="{{ route('inquiry_publicist_save', ['user_id' => $user,'code' => $item['inquiry']->confirmation_code]) }}" target="onepitch_saves">
                                                <img style="border: none" src="{{ asset('img/email/save-inquiry-button@2x.png') }}" alt="{{ $alt or '' }}" height="44">
                                            </a>
                                        </td>
                                        <td width="40"></td>
                                    </tr>
                                    <tr>
                                        <td width="40"></td>
                                        <td height="20"></td>
                                        <td width="40"></td>
                                    </tr>
                                    <tr>
                                        <td width="40"></td>
                                        <td>
                                            @component('emails.parts.of-page.button-and-link')
                                                @slot('url')
                                                    {{ 'mailto:'.$item['inquiry']->mailnuggets_id.'?subject='.rawurlencode("RE: OnePitch '".$item['inquiry']->subject."'").'&body='.rawurlencode('Hi '.$item['user']->full_name.',').'%0D%0A%0D%0A'.rawurlencode("I received your '".$item['inquiry']->subject."' inquiry in my OnePitch daily email. Here is the information you requested:\r\n-\r\n-\r\n-") }}
                                                @endslot
                                                @slot('img')
                                                    {{ asset('img/email/email-journalist-button@2x.png') }}
                                                @endslot
                                                @slot('to')
                                                    to email journalist
                                                @endslot
                                            @endcomponent
                                        </td>
                                        <td width="40"></td>
                                    </tr>
                                    <tr>
                                        <td width="40"></td>
                                        <td align="center" style="text-align: center;font-size: 15px; font-family: sans-serif; line-height: 1.6; color: #DB4437;">
                                            <a style="font-size: 15px; font-family: sans-serif; line-height: 1.6; color: #DB4437;" href="https://docs.google.com/forms/d/e/1FAIpQLSdtPwwk6_QDGpNRtPSZ-nsb-fOu8_Q4AYcq6HZnU_yeKb1L0w/viewform">CLICK HERE TO SUBMIT FEEDBACK</a>
                                        </td>
                                        <td width="40"></td>
                                    </tr>
                                    <tr>
                                        <td width="40" height="8"></td>
                                        <td height="8"></td>
                                        <td width="40" height="8"></td>
                                    </tr>
                                    <tr>
                                        <td style="height: 8px; background-color: #f4f5f5;" height="8"></td>
                                        <td style="height: 8px; background-color: #f4f5f5;" height="8"></td>
                                        <td style="height: 8px; background-color: #f4f5f5;" height="8"></td>
                                    </tr>
                                @endforeach
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
            <td width="*"></td>
        </tr>
        </tbody>
    </table>
@endsection