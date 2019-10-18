<table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0" width="100%">
    <tr>
        <td height="24"></td>
    </tr>
    <tr>
        <td style="text-align: center">
            @if ($user->hasPhoto())
                <img style="border-radius: 50%;border:none;" src="{{ $user->getPhotoUrl() }}" alt="" width="80" height="80">
            @else
                <span style="display:inline-block;font-size:36px;font-weight:bold;line-height:80px;text-align:center;color:#414745;font-family:sans-serif;width: 80px;height: 80px;border-radius: 50%;background-color: #ffd831;">{{ $user->initials }}</span>
            @endif
        </td>
    </tr>
    <tr>
        <td height="8"></td>
    </tr>
    <tr>
        <td height="16" style="text-align: center;font-size: 12px;font-weight: bold;line-height: 1.33;letter-spacing: 0.8px;color: #414745;font-family: sans-serif">
            {{ strtoupper($user->full_name) }}
        </td>
    </tr>
    <tr>
        <td height="16" style="font-size: 12px;line-height: 1.33;text-align: center;color: #414745;font-family: sans-serif">
            {{ $user->company }}
        </td>
    </tr>
    @if(isset($number))
        @if($number->phone_number)
            <tr>
                <td height="16" style="font-size: 12px;line-height: 1.33;text-align: center;color: #414745;font-family: sans-serif">
                    <span style="font-weight:bold;">Call:</span> {{ $number->phone_number }}
                </td>
            </tr>
        @endif
    @endif
    <tr>
        <td height="8"></td>
    </tr>
    <tr>
        <td>
            <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0" width="100%">
                <tr>
                    <td width="*" align="center">
                        @foreach ($user->socials as $social)
                            <a href="{{ $social->url }}" style="margin-right: 8px; margin-left: 8px; text-decoration: none" target="_blank">
                                <img style="border:none;" src="{{ $social->getImageForEmail() }}" width="16" height="16">
                            </a>
                        @endforeach
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td height="16"></td>
    </tr>
</table>