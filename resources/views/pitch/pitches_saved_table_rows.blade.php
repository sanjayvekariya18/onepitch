@foreach($pitches['items'] as $pitch)
    <tr onclick="pitch.viewPitchDetails({{ $pitch->id }})" id="pitch-row-{{ $pitch->id }}">
        <td>{{ str_limit($pitch->subject, 50) }}</td>
        <td>{{ str_limit($pitch->company, 50) }}</td>
        <td class="not-for-sm">{{ str_limit(stringifyModels($user->industries->intersect($pitch->industries), 'title', ', '), 50) }}</td>
        <td class="not-for-sm">{{ str_limit(stringifyModels($pitch->topics(), 'title', ', '), 50) }}</td>
        <td>{{ $pitch->saved_pitches->where('user_id', $user->id)->first()->created_at ? convertDateToFormat($pitch->saved_pitches->where('user_id', $user->id)->first()->created_at, 'm/d/Y') : 'N/A' }}</td>
    </tr>
@endforeach

<script>
    var rowCount = $('#saved-pitches-list-wrapper tr').length - 1;
    var total = {{ $pitches['total'] }};
    $('.saved-pitches-showing').text(rowCount);
    $('.saved-pitches-total').text('{{ $pitches['total'] }}');

    if (rowCount < total) {
        $('.load-more-saved-pitches').removeClass('hidden');
        $('.saved-pitches-back-top').removeClass('hidden');
    } else {
        $('.load-more-saved-pitches').addClass('hidden');
    }
</script>