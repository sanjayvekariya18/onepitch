@extends('emails.layouts.layout')

@section('content')
    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0;max-width: 680px;width: 100%;" width="100%">
        @component('emails.parts.of-page.head')
            @slot('title')
                Hey there, savvy publicist…
            @endslot
                Looks like you forgot to confirm your pitch below.
        @endcomponent
            <tr>
                <td width="40px"></td>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0" width="100%">
                        <tr><td height="40"></td></tr>
                        <tr>
                            <td style="font-size: 24px;font-weight: 500;line-height: 1.33;text-align: left;font-family: sans-serif;color: #414745;" height="32">
                                {{ $pitch->subject }}
                            </td>
                        </tr>
                        <tr>
                            <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif;" height="24">
                                Brand: {{ $pitch->company ? $pitch->company : 'N/A' }}
                            </td>
                        </tr>
                        @if($pitch->website)
                            <tr>
                                <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif;" height="24">
                                    Website: <a href="{{ adjustUrl($pitch->website) }}" target="_blank">{{ $pitch->website }}</a>
                                </td>
                            </tr>
                        @endif
                        <tr><td height="8"></td></tr>
                        <tr>
                            <td style="font-size: 14px;font-weight: bold;line-height: 1.43;text-align: left;color: #414745;font-family: sans-serif;" height="40">
                                {{ stringifyModels($indstrs_data['industries'], 'title', ', ') }}<br/>
                                {{ stringifyModels($indstrs_data['topics'], 'title', ', ') }}
                            </td>
                        </tr>
                        <tr>
                            <td height="8"></td>
                        </tr>
                        @if ($pitch->press_release[0])
                            <tr>
                                <td style="font-size: 14px;line-height: 1.43;text-align: left;color: #414745;font-family: sans-serif;" height="24">
                                    Press Release: <a href="{{ getBucketPreUrl().$pitch->press_release->url }}" target="_blank">{{ $pitch->press_release->name }}</a>
                                </td>
                            </tr>
                        @endif
                        @if ($pitch->files)
                            <tr>
                                <td style="font-size: 14px;line-height: 1.43;text-align: left;color: #414745;font-family: sans-serif;" height="40">
                                    Other Media Attachment: <a href="{{ getBucketPreUrl().$pitch->files[0]->url }}" target="_blank">{{ $pitch->files[0]->name }}</a>@if ($pitch->files[1]), <a href="{{ getBucketPreUrl().$pitch->files[1]->url }}" target="_blank">{{ $pitch->files[1]->name }}</a>@endif
                                </td>
                            </tr>
                        @endif
                    </table>
                </td>
                <td width="40px"></td>
            </tr>
            <tr>
                <td></td>
                <td height="24"></td>
                <td></td>
            </tr>
            <tr>
                <td width="40px"></td>
                <td>
                    @include('emails.parts.what_why')
                <td width="40"></td>
            </tr>
        <tr>
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
                        <td width="40"></td>
                        <td>
                            @component('emails.parts.of-page.button-and-link')
                                @slot('url')
                                    {{ route('pitch_confirm', ['code' => $pitch->confirmation_code]) }}
                                @endslot
                                @slot('img')
                                    {{ asset('img/email/confirm-button@2x.png') }}
                                @endslot
                                @slot('to')
                                    to confirm
                                @endslot
                            @endcomponent
                        </td>
                        <td>
                            @component('emails.parts.of-page.button-and-link')
                                @slot('url')
                                    {{ route('pitch_edit', ['code' => $pitch->confirmation_code]) }}
                                @endslot
                                @slot('img')
                                    {{ asset('img/email/edit-pitch-button@2x.png') }}
                                @endslot
                                @slot('to')
                                    to edit
                                @endslot
                            @endcomponent
                        </td>
                        <td width="40"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
@endsection