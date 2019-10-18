@foreach($inquiries['items'] as $inquiry)
    <tr onclick="inquiry.viewInquiryDetails({{ $inquiry->id }})" id="inquiry-row-{{ $inquiry->id }}">
        <td>{{ str_limit($inquiry->subject, 50) }}</td>
        <td>{{ str_limit($inquiry->company, 50) }}</td>
        <td class="not-for-sm">{{ str_limit(stringifyModels($user->industries->intersect($inquiry->industries), 'title', ', '), 50) }}</td>
        <td class="not-for-sm">{{ str_limit(stringifyModels($inquiry->topics(), 'title', ', '), 50) }}</td>
        <td>{{ $inquiry->saved_inquiries->where('user_id', $user->id)->first()->created_at ? convertDateToFormat($inquiry->saved_inquiries->where('user_id', $user->id)->first()->created_at, 'm/d/Y') : 'N/A' }}</td>
    </tr>
@endforeach

<script>
    var rowCount = $('#saved-inquiries-list-wrapper tr').length - 1;
    var total = {{ $inquiries['total'] }};
    $('.saved-inquiries-showing').text(rowCount);
    $('.saved-inquiries-total').text('{{ $inquiries['total'] }}');

    if (rowCount < total) {
        $('.load-more-saved-inquiries').removeClass('hidden');
        $('.saved-inquiries-back-top').removeClass('hidden');
    } else {
        $('.load-more-saved-inquiries').addClass('hidden');
    }
</script>