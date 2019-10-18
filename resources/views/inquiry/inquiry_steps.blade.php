<?php
$steps = [
    'profile' => 0,
    'what' => 1,
    'why' => 2,
    'where' => 3,
];
?>
<div class="wizard-progress-wrap">
    <div class="wizard-progress">
        @if (!Auth::check())
            <div class="wizard-element {{ $step == 'profile' ? 'current' : '' }}" onclick="window.location='{{ route('signup_publicist') }}'">
                <div class="icon">
                    @if (isset($steps[$step]) && $steps[$step] > $steps['profile'])
                        {{ HTML::image('img/icn-done-black.svg') }}
                    @else
                        {{ HTML::image('img/icn-profile-black.svg') }}
                    @endif
                </div>
                <div class="title">Who</div>
            </div>

            <div class="wizard-line {{ isset($steps[$step]) && $steps[$step] > $steps['profile'] ? 'done' : '' }}"></div>
        @endif

        <div class="wizard-element {{ $step == 'what' ? 'current' : '' }}" onclick="window.location='{{ route('inquiry_what') }}'">
            <div class="icon">
                @if (isset($steps[$step]) && $steps[$step] > $steps['what'])
                    {{ HTML::image('img/icn-done-black.svg') }}
                @else
                    {{ HTML::image('img/icn-what-black.svg') }}
                @endif
            </div>
            <div class="title">What</div>
        </div>

        <div class="wizard-line {{ isset($steps[$step]) && $steps[$step] > $steps['what'] ? 'done' : '' }}"></div>

        <div class="wizard-element {{ $step == 'why' ? 'current' : '' }}" onclick="window.location='{{ route('inquiry_why') }}'">
            <div class="icon">
                @if (isset($steps[$step]) && $steps[$step] > $steps['why'])
                    {{ HTML::image('img/icn-done-black.svg') }}
                @else
                    {{ HTML::image('img/icn-checklist-black.svg') }}
                @endif
            </div>
            <div class="title">Want</div>
        </div>

        <div class="wizard-line {{ isset($steps[$step]) && $steps[$step] > $steps['why'] ? 'done' : '' }}"></div>

        <div class="wizard-element {{ $step == 'where' ? 'current' : '' }}" onclick="window.location='{{ route('inquiry_where') }}'">
            <div class="icon">
                @if (isset($steps[$step]) && $steps[$step] > $steps['where'])
                    {{ HTML::image('img/icn-done-black.svg') }}
                @else
                    {{ HTML::image('img/icn-geo-black.svg') }}
                @endif
            </div>
            <div class="title">Where</div>
        </div>

        <div class="clear"></div>
    </div>
</div>