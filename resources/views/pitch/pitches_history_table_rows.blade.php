@foreach($pitches['items'] as $pitch)
    <tr onclick="pitch.viewPitchDetails({{ $pitch->id }})" id="pitch-row-{{ $pitch->id }}">
        <td>{{ str_limit($pitch->subject, 50) }}</td>
        <td>{{ str_limit($pitch->company, 50) }}</td>
        <td class="not-for-sm">{{ str_limit(stringifyModels($user->industries->intersect($pitch->industries), 'title', ', '), 50) }}</td>
        <td class="not-for-sm">
            @if(!empty($pitch))
                {{ str_limit(stringifyModels($pitch->topics(), 'title', ', '), 50) }}
            @endif
        </td>
        <td>{{ $pitch->sent_at ? convertDateToFormat($pitch->sent_at, 'm/d/Y') : 'N/A' }}</td>
    </tr>
@endforeach

<script>
    var rowCount = $('#pitches-history-list-wrapper tr').length - 1;
    var total = {{ $pitches['total'] }};
    $('.history-pitches-showing').text(rowCount);
    $('.history-pitches-total').text('{{ $pitches['total'] }}');

    if (rowCount < total) {
        $('.load-more-history-pitches').removeClass('hidden');
        $('.history-pitches-back-top').removeClass('hidden');
    } else {
        $('.load-more-history-pitches').addClass('hidden');
    }
</script>