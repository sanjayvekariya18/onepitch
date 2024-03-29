@extends('emails.layouts.layout')

@section('content')
    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0;max-width: 680px;width: 100%;">
        @component('emails.parts.of-page.head')
            @slot('title')
                Good news!
            @endslot
            Your inquiry has been approved.
        @endcomponent
        <tr>
            <td></td>
            <td height="24"></td>
            <td></td>
        </tr>
        <tr>
            <td width="40" style="background-color: #f4f5f5;"></td>
            <td height="48" style="height: 48px;background-color: #f4f5f5;font-size: 14px;font-weight: 500;line-height: 1.14;letter-spacing: 1.5px;text-align: center;color: #414745;font-family: sans-serif;text-transform: uppercase">
                Inquiry will be sent on {{ strtoupper($inquiry->sentAtFormat()) }} at 5:00am PST
            </td>
            <td width="40" style="background-color: #f4f5f5;"></td>
        </tr>
        <tr>
            <td></td>
            <td height="24"></td>
            <td></td>
        </tr>
        <tr>
            <td width="40"></td>
            <td>
                <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0" width="100%">
                    <tr>
                        <td style="font-size: 24px;font-weight: 500;line-height: 1.33;text-align: left;font-family: sans-serif;color: #414745;" height="32">
                            {{ $inquiry->subject }}
                        </td>
                    </tr>
                    <tr>
                        <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif;" height="24">
                            Brand: {{ $inquiry->company ?: 'N/A' }}
                        </td>
                    </tr>
                    @if($inquiry->website)
                        <tr>
                            <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif;" height="24">
                                Website: <a href="{{ adjustUrl($inquiry->website) }}" target="_blank">{{ $inquiry->website }}</a>
                            </td>
                        </tr>
                    @endif
                    <tr>
                        <td height="8"></td>
                    </tr>
                    @if($inquiry->event)
                        <tr>
                            <td>
                                @include('emails.parts.event', ['event' => $inquiry->event])
                            </td>
                        </tr>
                    @endif
                    <tr>
                        <td style="font-size: 14px;font-weight: bold;line-height: 1.43;text-align: left;color: #414745;font-family: sans-serif;" height="40">
                            {{ stringifyModels($indstrs_data['industries'], 'title', ', ') }}<br/>
                            {{ stringifyModels($indstrs_data['topics'], 'title', ', ') }}
                        </td>
                    </tr>
                    <tr>
                        <td height="8"></td>
                    </tr>
                    @if ($inquiry->files[0])
                        <tr>
                            <td style="font-size: 14px;line-height: 1.43;text-align: left;color: #414745;font-family: sans-serif;" height="40">
                                Media Attachment: <a href="{{ getBucketPreUrl().$inquiry->files[0]->url }}" target="_blank">{{ $inquiry->files[0]->name }}</a>
                                @if ($inquiry->files[1]), <a href="{{ getBucketPreUrl().$inquiry->files[1]->url }}" target="_blank">{{ $inquiry->files[1]->name }}</a>@endif
                                @if ($inquiry->files[2]), <a href="{{ getBucketPreUrl().$inquiry->files[2]->url }}" target="_blank">{{ $inquiry->files[2]->name }}</a>@endif
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
                @include('emails.parts.inquiry_what_why')
            </td>
            <td width="40"></td>
        </tr>
        <tr>
            <td width="40"></td>
            <td>
                @include('emails.parts.user-info')
            </td>
            <td width="40"></td>
        </tr>
        <tr>
            <td colspan="3">
                <table cellpadding="0" cellspacing="0" style="padding:0;margin:0;width:100%">
                    <tr>
                        <td></td>
                        <td>
                            @component('emails.parts.of-page.button-and-link')
                                @slot('url')
                                    {{ route('inquiry_what', ['inquiry_id' => 'create']) }}
                                @endslot
                                @slot('img')
                                    {{ asset('img/email/upload-inquiry-button@2x.png') }}
                                @endslot
                                @slot('to')
                                    to upload a new inquiry
                                @endslot
                            @endcomponent
                        </td>
                        <td>
                            @component('emails.parts.of-page.button-and-link')
                                @slot('url')
                                    {{ route('inquiry_cancel', ['code' => $inquiry->confirmation_code]) }}
                                @endslot
                                @slot('img')
                                    {{ asset('img/email/cancel-inquiry-button@2x.png') }}
                                @endslot
                                @slot('to')
                                    to edit
                                @endslot
                            @endcomponent
                        </td>
                        <td></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
@endsection