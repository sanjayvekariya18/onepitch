@extends('emails.layouts.layout')

@section('content')
    <table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0" width="100%">
<!--        <tr>
            <td style="font-size: 15px;line-height: 1.6;text-align: center;color: #414745;font-family: sans-serif">
                <img src="data:image/png;base64,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">
            </td>
        </tr>-->
        @component('emails.parts.of-page.head')
            @slot('title')
                Contact
            @endslot
                Questions and Feedback
        @endcomponent
        <tr><td height="40"></td></tr>
        <tr>
            <td width="92px"></td>
            <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                
                Name:
                <!--<img src='data:image/png;base64,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'/>-->
                {{$name}}
            </td>
            <td width="92px"></td>
        </tr>
        <tr>
            <td width="92px"></td>
            <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                Email:
                {{$email}}
            </td>
            <td width="92px"></td>
        </tr>
        <tr>
            <td width="92px"></td>
            <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                Where Did You Hear About Us:
                {{$hear_about}}
            </td>
            <td width="92px"></td>
        </tr>
        @if ( isset($hear_about_other) )
            <tr>
                <td width="92px"></td>
                <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                    Specify:
                    {{$hear_about_other}}
                </td>
                <td width="92px"></td>
            </tr>
        @endif
        <tr>
            <td width="92px"></td>
            <td style="font-size: 15px;line-height: 1.6;text-align: left;color: #414745;font-family: sans-serif">
                Message:
                <br>
                {{$message_text}}
            </td>
            <td width="92px"></td>
        </tr>
        <tr><td height="40"></td></tr>
    </table>

@endsection