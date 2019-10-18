<table border="0" cellpadding="0" cellspacing="0" style="margin:0; padding:0" width="100%">
    @component('emails.parts.point-title-component')
        What
    @endcomponent
    @if(isset($pitch))
        @foreach($pitch->getWhat() as $point)
            <tr>
                <td>
                    @include('emails.parts.point-element')
                </td>
            </tr>
        @endforeach
    @elseif(isset($inquiry))
        @foreach($inquiry->getWhat() as $point)
            <tr>
                <td>
                    @include('emails.parts.point-element')
                </td>
            </tr>
        @endforeach
    @endif
    <tr>
        <td height="24"></td>
    </tr>
    @component('emails.parts.point-title-component')
        @if(isset($pitch))
            Why
        @elseif(isset($inquiry))
            Want
        @endif
    @endcomponent
        @if(isset($pitch))
            @foreach($pitch->getWhy() as $point)
                <tr>
                    <td>
                        @include('emails.parts.point-element')
                    </td>
                </tr>
            @endforeach
        @elseif(isset($inquiry))
            @foreach($inquiry->getWhy() as $point)
                <tr>
                    <td>
                        @include('emails.parts.point-element')
                    </td>
                </tr>
            @endforeach
        @endif

</table>
