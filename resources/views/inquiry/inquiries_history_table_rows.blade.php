@foreach($inquiries['items'] as $inquiry)
    <tr onclick="inquiry.viewInquiryDetails({{ $inquiry->id }})" id="inquiry-row-{{ $inquiry->id }}">
        <td>{{ str_limit($inquiry->subject, 50) }}</td>
        <td>{{ str_limit($inquiry->company, 50) }}</td>
        <td class="not-for-sm">{{ str_limit(stringifyModels($user->industries->intersect($inquiry->industries), 'title', ', '), 50) }}</td>
        <td class="not-for-sm">
            @if(!empty($inquiry))
                {{ str_limit(stringifyModels($inquiry->topics(), 'title', ', '), 50) }}
            @endif
        </td>
        <td>{{ $inquiry->sent_at ? convertDateToFormat($inquiry->sent_at, 'm/d/Y') : 'N/A' }}</td>
    </tr>
@endforeach

<script>
    var rowCount = $('#inquiries-history-list-wrapper tr').length - 1;
    var total = {{ $inquiries['total'] }};
    $('.history-inquiries-showing').text(rowCount);
    $('.history-inquiries-total').text('{{ $inquiries['total'] }}');

    if (rowCount < total) {
        $('.load-more-history-inquiries').removeClass('hidden');
        $('.history-inquiries-back-top').removeClass('hidden');
    } else {
        $('.load-more-history-inquiries').addClass('hidden');
    }
</script>