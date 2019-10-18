@foreach($pitches['items'] as $pitch)
<tr onclick="pitch.viewPitchDetails({{ $pitch->id }})" id="pitch-row-{{ $pitch->id }}">
    <td>{{ str_limit($pitch->subject, 50) }}</td>
    <td class="not-for-xs">{{ $pitch->uploaded_at ? convertDateToFormat($pitch->uploaded_at, 'm/d/Y') : 'N/A' }}</td>
{{--    <td class="not-for-sm">{{ $pitch->uploaded_at ? convertDateToFormat($pitch->uploaded_at, 'g:i A') : 'N/A' }}</td>--}}
    <td class="not-for-xs">{{ $pitch->sent_at ? convertDateToFormat($pitch->sent_at, 'm/d/Y') : 'N/A' }}</td>
    <td class="{{ $pitch->getStatusClass() }}">{{ $pitch->getStatusText() }}</td>
    <td class="{{ $pitch->getMetricsClass() }} pitch-sent not-for-xs">{{ $pitch->status > 1 ? $pitch->sent_amount : '' }}</td>
    <td class="{{ $pitch->getMetricsClass() }} pitch-open view-tooltip not-for-xs">
        {{ $pitch->status > 1 ? $pitch->opens : '' }}
        @if (count($pitch->views) > 0)
            <span class="tooltiptext">
                {{ stringifyRelationshipModels($pitch->views, 'user', 'company', ', ', 5) }}
            </span>
        @endif
    </td>
    <td class="{{ $pitch->getMetricsClass() }} pitch-click not-for-xs">{{ $pitch->status > 1 ? $pitch->clicks : '' }}</td>
    <td class="{{ $pitch->getMetricsClass() }} pitch-saves not-for-xs">{{ $pitch->status > 1 ? $pitch->saved_pitches_count : '' }}</td>
    <td class="{{ $pitch->getMetricsClass() }} pitch-response">{{ $pitch->status > 1 ? count($pitch->mail_statistics) : '' }}</td>
</tr>
@endforeach

<script>
	$('.pitches-showing').text('{{ $showing }}');
	$('.pitches-total').text('{{ $pitches['total'] }}');

	@if ($showing < $pitches['total'])
        $('.load-more-pitches').removeClass('hidden');
	    $('.back-top').removeClass('hidden');
	@else
        $('.load-more-pitches').addClass('hidden');
    @endif;
</script>