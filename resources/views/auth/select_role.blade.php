@extends('layouts.simple', ['without_logo' => true])

@section('title', 'Select Role - Sign Up')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
    <div class="row select-role-wrap">
        <div class="col-sm-6 col-xs-12 role-wrap journalist-wrap" onclick="auth.selectJournalistToggle()">
            <div class="text-center">
                <div class="check-circle">
                    <input type="radio" name="role" readonly/>
                    </span>
                </div>
            </div>
            <h4 class="text-center">OnePitch for</h4>
            <h1 class="text-center">Journalist</h1>
            <p class="text-center">Join your tech peeps from the likes of:</p>
            <div class="companies-wrap">
                {{ HTML::image('img/press-logo-tech-crunch@3x.png', null, ['class' => 'tc-img']) }}
                {{ HTML::image('img/logos-black-business-insider-copy@3x.png', null, ['class' => 'bi-img']) }}
                {{ HTML::image('/images/New-Atlas-gray.png', null, ['class' => 'f-img']) }}
                {{ HTML::image('img/huffpost-copy@3x.png', null, ['class' => 'hp-img']) }}
                {{ HTML::image('/images/tnw-gray.png', null, ['class' => 'dt-img']) }}
            </div>
        </div>
        <div class="col-sm-6 col-xs-12 role-wrap publicist-wrap" onclick="auth.selectPublicistToggle()">
            <div class="text-center">
                <div class="check-circle">
                    <input type="radio" name="role" readonly/>
                    </span>
                </div>
            </div>
            <h4 class="text-center">OnePitch for</h4>
            <h1 class="text-center">Publicist</h1>
            <p class="text-center">Join your tech peeps from the likes of:</p>
            <div class="companies-wrap">
                {{ HTML::image('img/arpr-logo@3x.png', null, ['class' => 'bc-img']) }}
                {{ HTML::image('img/speaker-box-sticky-logo@3x.png', null, ['class' => 'sb-img']) }}
                {{ HTML::image('img/ampmpr-logo@3x.png', null, ['class' => 'am-img']) }}
                {{ HTML::image('img/ezpr@3x.png', null, ['class' => 'ez-img']) }}
                {{ HTML::image('img/the-hoffman-agency@3x.png', null, ['class' => 'ha-img']) }}
            </div>
        </div>

        <div class="journalist-value-wrap role-value-wrap">
            <div class="role-value-wrap-inner">
                <div class="role-wrap">
                    <div class="text-center">
                        <div class="check-circle">
                            <input type="radio" checked="checked" disabled/>
                            <span class="check-mark">
                            </span>
                        </div>
                    </div>
                    <h4 class="text-center">I'm a</h4>
                    <h1 class="text-center">Journalist</h1>

                    <div class="text-center">
                        <ul>
                            <li><span>Get <i>one</i> email a day with pitches matched precisely to your selected preferences</span></li>
                            <li><span>Stay private to publicists unless you want to make contact</span></li>
                            <li><span>Change preferences for your pitches any time</span></li>
                            <li><span>Rest assured: we've hand selected publicists from top agencies and manually review each pitch</span></li>
                        </ul>
                    </div>
                    <div class="text-center">
                        <a href="{{ route('signup_journalist') }}" class="btn btn-white-black">Let's do this</a>
                    </div>
                </div>

                <div class="back-area" onclick="auth.selectJournalistToggle()">
                    <i class="material-icons">arrow_back</i>
                    <i class="material-icons mobile-only">arrow_upward</i>
                </div>
            </div>
        </div>

        <div class="publicist-value-wrap role-value-wrap">
            <div class="role-value-wrap-inner">
                <div class="back-area" onclick="auth.selectPublicistToggle()">
                    <i class="material-icons">arrow_forward</i>
                    <i class="material-icons mobile-only">arrow_upward</i>
                </div>
                <div class="role-wrap">
                    <div class="text-center">
                        <div class="check-circle">
                            <input type="radio" checked="checked" disabled/>
                            <span class="check-mark">
                            </span>
                        </div>
                    </div>
                    <h4 class="text-center">I'm a</h4>
                    <h1 class="text-center">Publicist</h1>

                    <div class="text-center">
                        <ul>
                            <li><span>Pitch media and secure coverage easily<br/>(no, we're serious)</span></li>
                            <li><span>Save a LOT of time & effort</span></li>
                            <li><span>Sit back and hear directly from top tier journalists who email you directly</span></li>
                            <li><span>The one email journalists open everyday</span></li>
                        </ul>
                    </div>
                    <div class="text-center">
                        <a href="{{ route('signup_publicist') }}" class="btn btn-white-ylw">Let's do this</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@push('js')
<script>
	$(function () {
		common.fitScreen();

		$( window ).resize(function() {
			common.fitScreen();
		});
	});
</script>
@endpush