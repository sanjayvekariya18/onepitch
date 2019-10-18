<table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0" width="100%">
    @component('emails.parts.point-title-component')
        What
    @endcomponent
    @foreach($inquiry->getWhat() as $point)
        <tr>
            <td>
                @include('emails.parts.point-element')
            </td>
        </tr>
    @endforeach
    <tr>
        <td height="24"></td>
    </tr>
    @component('emails.parts.point-title-component')
        Want
    @endcomponent
    @foreach($inquiry->getWhy() as $point)
        <tr>
            <td>
                @include('emails.parts.point-element')
            </td>
        </tr>
    @endforeach
</table>
