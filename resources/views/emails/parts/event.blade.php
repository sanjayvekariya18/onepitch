<table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin: 0;padding: 0;width: 100%;border: none">
    <tr>
        <td style="font-family: sans-serif;font-size: 14px;line-height: 1.43;text-align: left;color: #414745;font-weight: bold">Deadline:</td>
    </tr>
    <tr>
        <td style="font-family: sans-serif;font-size: 14px;line-height: 1.43;text-align: left;color: #414745;">{{ $event->title }}</td>
    </tr>
    <tr>
        <td style="font-family: sans-serif;font-size: 14px;line-height: 1.43;text-align: left;color: #414745;">Date: {{ $event->getDateString() }}</td>
    </tr>
    <tr>
        <td style="font-family: sans-serif;font-size: 14px;line-height: 1.43;text-align: left;color: #414745;">Time: {{ $event->getTimeString() }}</td>
    </tr>
</table>