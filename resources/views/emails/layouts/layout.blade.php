<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
<head>
    @yield('style')
</head>
<body>
    <table border="0" cellpadding="0" cellspacing="0" style="width:100%;padding:0;margin:0">
        <tbody>
            <tr>
                <td></td>
                <td height="24"></td>
                <td></td>
            </tr>
            <tr align="center">
                <td width="*"></td>
                <td style="min-width:320px;max-width:680px;width:680px;">
                    <table border="0" cellpadding="0" cellspacing="0" style="margin:0;padding:0;width:100%">
                        <tr>
                            <td align="center">
                                @section('header')
                                    <a href="{{ url('/') }}">
                                        <img style="width:150px;border:none;" src="{{ asset('img/email/one-pitch-logo-medium@2x.png') }}">
                                    </a>
                                @show
                            </td>
                        </tr>
                        <tr>
                            <td height="12"></td>
                        </tr>
                        <tr align="center">
                            <td>
                                @yield('content')
                            </td>
                        </tr>
                        <tr>
                            <td>
                                @include('emails.layouts.footer')
                            </td>
                        </tr>
                    </table>
                </td>
                <td width="*"></td>
            </tr>
        </tbody>
    </table>
</body>
</html>