<?php
    $steps = [
    	'profile' => 0,
		'interests' => 1,
		'what_next' => 2,
    ];
?>
<div class="wizard-progress-wrap">
    <div class="wizard-progress">
        <div class="wizard-element {{ $step == 'profile' ? 'current' : '' }}" onclick="window.location='{{ route('signup_journalist') }}'">
            <div class="icon">
                @if (isset($steps[$step]) && $steps[$step] > $steps['profile'])
                    {{ HTML::image('img/icn-done-black.svg') }}
                @else
                    {{ HTML::image('img/icon-signup-dark.svg') }}
                @endif
            </div>
            <div class="title">Create Profile</div>
        </div>

        <div class="wizard-line {{ isset($steps[$step]) && $steps[$step] > $steps['profile'] ? 'done' : '' }}"></div>

        <div class="wizard-element {{ $step == 'interests' ? 'current' : '' }}" onclick="window.location='{{ route('journalist_interests') }}'">
            <div class="icon">
                @if (isset($steps[$step]) && $steps[$step] > $steps['interests'])
                    {{ HTML::image('img/icn-done-black.svg') }}
                @else
                    {{ HTML::image('img/icon-checklist-dark.svg') }}
                @endif
            </div>
            <div class="title">Select Interests</div>
        </div>

        <div class="wizard-line {{ isset($steps[$step]) && $steps[$step] > $steps['interests'] ? 'done' : '' }}"></div>

        <div class="wizard-element {{ $step == 'what_next' ? 'current' : '' }} no-pointer">
            <div class="icon">
                @if (isset($steps[$step]) && $steps[$step] > $steps['what_next'])
                    {{ HTML::image('img/icn-done-black.svg') }}
                @else
                    {{ HTML::image('img/icon-dots-dark.svg') }}
                @endif
            </div>
            <div class="title">What's next</div>
        </div>

        <div class="clear"></div>
    </div>
</div>