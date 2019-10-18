@foreach($inquiries['items'] as $inquiry)
    <tr onclick="inquiry.viewInquiryDetails({{ $inquiry->id }})" id="inquiry-row-{{ $inquiry->id }}">
        <td>{{ str_limit($inquiry->subject, 50) }}</td>
        <td class="not-for-xs">{{ $inquiry->uploaded_at ? convertDateToFormat($inquiry->uploaded_at, 'm/d/Y') : 'N/A' }}</td>
{{--        <td class="not-for-sm">{{ $inquiry->uploaded_at ? convertDateToFormat($inquiry->uploaded_at, 'g:i A') : 'N/A' }}</td>--}}
        <td class="not-for-xs">{{ $inquiry->sent_at ? convertDateToFormat($inquiry->sent_at, 'm/d/Y') : 'N/A' }}</td>
        <td class="{{ $inquiry->getStatusClass() }}">{{ $inquiry->getStatusText() }}</td>
        <td class="{{ $inquiry->getMetricsClass() }} pitch-sent not-for-xs">{{ $inquiry->status > 1 ? $inquiry->sent_amount : '' }}</td>
        <td class="{{ $inquiry->getMetricsClass() }} pitch-open view-tooltip not-for-xs">
            {{ $inquiry->status > 1 ? $inquiry->opens : '' }}
            @if (count($inquiry->views) > 0)
                <span class="tooltiptext">
                {{ stringifyRelationshipModels($inquiry->views, 'user', 'company', ', ', 5) }}
            </span>
            @endif
        </td>
        <td class="{{ $inquiry->getMetricsClass() }} pitch-click not-for-xs">{{ $inquiry->status > 1 ? $inquiry->clicks : '' }}</td>
        <td class="{{ $inquiry->getMetricsClass() }} pitch-saves not-for-xs">{{ $inquiry->status > 1 ? $inquiry->saved_inquiries_count : '' }}</td>
        <td class="{{ $inquiry->getMetricsClass() }} pitch-response">{{ $inquiry->status > 1 ? count($inquiry->mail_statistics) : '' }}</td>
    </tr>
@endforeach

<script>
    $('.inquiries-showing').text('{{ $showing }}');
    $('.inquiries-total').text('{{ $inquiries['total'] }}');

    @if ($showing < $inquiries['total'])
    $('.load-more-inquiries').removeClass('hidden');
    $('.back-top').removeClass('hidden');
    @else
    $('.load-more-inquiries').addClass('hidden');
    @endif;
</script>