<table cellpadding="0" cellspacing="0" style="padding:0;margin:0;width:100%">
    <tr>
        <td align="center" style="text-align: center">
            <a href="{{ $url }}">
                <img style="border: none" src="{{ $img }}" alt="{{ $alt or '' }}" height="44">
            </a>
        </td>
    </tr>
    <tr>
        <td height="24"></td>
    </tr>
    <tr>
        <td align="center" style="text-align: center;font-size: 15px; font-family: sans-serif; line-height: 1.6; color: #414745;">
            or <a style="font-size: 15px; font-family: sans-serif; line-height: 1.6; color: #414745;" href="{{ $url }}">click here</a> {{ $to }}
        </td>
    </tr>
    <tr>
        <td height="40"></td>
    </tr>
</table>