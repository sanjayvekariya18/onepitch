@if (count($industries['items']))
    @foreach ($industries['items'] as $industry)
        <div id="industry-block{{ $industry->id }}" class="col-sm-6 col-md-4 industry">
            <div class="industry-container">
                <div class="industry-container-inner list">
                    <div>
                        <div class="industry-title">{{ $industry->title }}</div>
                        @if ($industry->full_title)
                            <div class="industry-full-title">({{ $industry->full_title }})</div>
                        @endif
                    </div>

                </div>

                <div class="industry-container-inner hover">
                    <div class="industry-title">{{ $industry->title }}</div>
                    <div class="industry-description">{{ $industry->description }}</div>
                </div>
            </div>
        </div>
    @endforeach
@else
    <h3 class="section-head text-center m-b-64 no-industries">
        You’re search for “{{ $term }}” Industry shows no results.
        <br/>
        <img src="/img/pensive-face-1-f-614@3x.png" />
    </h3>
@endif

<script>
    $('.industries-showing').text('{{ $count }}');
    $('.industries-total').text('{{ $industries['total'] }}');
    $('input[name="offset"]').val('{{ $offset }}');

    @if ($count < $industries['total'])
    $('.load-more-industries').removeClass('hidden');
    @else
    $('.load-more-industries').addClass('hidden');
    @endif;
</script>