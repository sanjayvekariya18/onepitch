@can('edit-pitch', $pitch)
<p class="light-grey">Uploaded: {{ $pitch->uploaded_at ? convertDateToFormat($pitch->uploaded_at, 'M d, Y \a\t g:i A') : 'N/A' }}</p>
@if ($pitch->sent_at)
<p class="light-grey">Sent: {{ convertDateToFormat($pitch->uploaded_at, 'M d, Y \a\t g:i A') }}</p>
{{--<p class="light-grey">{{ $pitch->sent_amount }} Emails Sent</p>--}}
@else
<p class="{{ $pitch->getStatusClass() }}">{{ $pitch->getStatusText() }}</p>
@endif
@if (count($pitch->views) > 0)
        <!-- <p class="light-grey">
            <b>Views (by outlets):</b> {{ stringifyRelationshipModels($pitch->views, 'user', 'company', ', ') }}
        </p> -->
@endif
@else
    <p class="light-grey">Sent: {{ convertDateToFormat($pitch->sent_at, 'M d, Y \a\t g:i A') }}</p>
    @if ($pitch->saved_pitches->where('user_id', $user->id)->first()->created_at)
        <p class="light-grey">Saved: {{ convertDateToFormat($pitch->saved_pitches->where('user_id', $user->id)->first()->created_at, 'M d, Y \a\t g:i A') }}</p>
    @endif
@endcan

<h1>{{ $pitch->subject ? $pitch->subject : 'N/A' }}</h1>

<p class="m-b-8">Brand: {{ $pitch->company ? $pitch->company : 'N/A' }}</p>

@if ($pitch->website)
<p class="m-b-8">Link: <a href="{{ adjustUrl($pitch->website) }}" target="_blank">{{ $pitch->website }}</a></p>
@endif

<p class="small-bold">
    @can('edit-pitch', $pitch)
        Industries: {{ stringifyModels($indstrs_data['industries'], 'title', ', ') }}
    @else
        Industries: {{ stringifyModels($user->industries->intersect($pitch->industries), 'title', ', ') }}
    @endcan
</p>
<p class="small-bold m-b-8">
    Topics: {{ stringifyModels($indstrs_data['topics'], 'title', ', ') }}
</p>
@if($pitch->press_release)
<p class="small-bold m-b-8">
    Press Release: <a href="{{ getBucketPreUrl().$pitch->press_release->url }}" target="_blank">{{ $pitch->press_release->name }}</a>
</p>
@endif
@if($pitch->files[0])
<p class="small-bold m-b-8">
    Other Media Attachments: <a href="{{ getBucketPreUrl().$pitch->files[0]->url }}" target="_blank">{{ $pitch->files[0]->name }}</a>@if ($pitch->files[1]), <a href="{{ getBucketPreUrl().$pitch->files[1]->url }}" target="_blank">{{ $pitch->files[1]->name }}</a>@endif
</p>
@endif
@if ($pitch->event)
<p class="small-bold">
    Event:<br/>
</p>
<p class="small-regular">
    {{ $pitch->event->title }}<br/>
    @if ($pitch->event->getDateString())
    Date: {{ $pitch->event->getDateString() }}<br/>
    @endif
    @if ($pitch->event->getTimeString())
        Time: {{ $pitch->event->getTimeString() }}<br/>
    @endif
</p>
@endif

<h2 class="section-title m-b-8">What</h2>

<ul class="list m-b-32">
    @if ($pitch->what_point_1)
        <li>{{ $pitch->what_point_1 }}</li>
    @endif
    @if ($pitch->what_point_2)
        <li>{{ $pitch->what_point_2 }}</li>
    @endif
    @if ($pitch->what_point_3)
        <li>{{ $pitch->what_point_3 }}</li>
    @endif
    @if ($pitch->what_point_4)
        <li>{{ $pitch->what_point_4 }}</li>
    @endif
    @if ($pitch->what_point_5)
        <li>{{ $pitch->what_point_5 }}</li>
    @endif
</ul>

<h2 class="section-title m-b-8">Why</h2>

<ul class="list">
    @if ($pitch->why_point_1)
        <li>{{ $pitch->why_point_1 }}</li>
    @endif
    @if ($pitch->why_point_2)
        <li>{{ $pitch->why_point_2 }}</li>
    @endif
    @if ($pitch->why_point_3)
        <li>{{ $pitch->why_point_3 }}</li>
    @endif
    @if ($pitch->why_point_4)
        <li>{{ $pitch->why_point_4 }}</li>
    @endif
    @if ($pitch->why_point_5)
        <li>{{ $pitch->why_point_5 }}</li>
    @endif
</ul>

@can('edit-pitch', $pitch)
@if (in_array($pitch->status, \App\Models\Pitch::getStatusesToEdit()))
    <div class="text-center submit-wrapper m-t-32 m-b-0">
        <a href="{{ route('pitch_what', ['pitch_id' => $pitch->id]) }}" class="btn btn-white-ylw btn-submit submitter">Edit Pitch</a>
        <div class="or-inline">
            Or you can
            <a href="javascript:;" onclick="pitch.openDeletePitchModal({{ $pitch->id }})">delete this pitch</a>
        </div>
    </div>
@elseif ($pitch->status != \App\Models\Pitch::STATUS_PUBLISHED)
    <div class="text-center submit-wrapper m-t-48 m-b-0">
        <div class="or-inline">
            <a href="javascript:;" onclick="pitch.openDeletePitchModal({{ $pitch->id }})">Click here to delete this pitch.</a>
        </div>
    </div>
@endif

@if ($pitch->status > 1)
    <div class="text-center row m-t-32 m-b-0 modal-metrics">
        <div class="col-md-2 col-md-offset-1">
            <div class="icon-image">
                <img src="/fonts/icon-mail-sent.svg" alt="">
            </div>
            <div class="metrics">
                {{ $pitch->sent_amount }}
            </div>
        </div>
        <div class="col-md-2">
            <div class="icon-image">
                <img src="/fonts/icon-mail-open.svg" alt="">
            </div>
            <div class="metrics">
                {{ $pitch->opens }}
            </div>
        </div>
        <div class="col-md-2">
            <div class="icon-image">
                <img src="/fonts/icon-mail-click.svg" alt="">
            </div>
            <div class="metrics">
                {{ $pitch->clicks }}
            </div>
        </div>
        <div class="col-md-2">
            <div class="icon-image">
                <img src="/fonts/icon-mail-save.svg" alt="">
            </div>
            <div class="metrics">
                {{ $savedPitches->count()}}
            </div>
        </div>
        <div class="col-md-2">
            <div class="icon-image">
                <img src="/fonts/icon-mail-response.svg" alt="">
            </div>
            <div class="metrics">
                {{ count($pitch->mail_statistics) }}
            </div>
        </div>
    </div>
@endif
@else
    <div class="modal-user-info">
        @if($pitch->user)
            <div class="text-center m-t-16 m-b-0">
                @if ($pitch->user->hasPhoto())
                    <img class="image" src="{{ $pitch->user->getPhotoUrl() }}" alt="" width="80" height="80">
                @else
                    <span class="initials">{{ $pitch->user->initials }}</span>
                @endif
            </div>
            <div class="text-center m-b-0">
                <p>
                    <b>{{ strtoupper($pitch->user->full_name) }}</b>
                </p>
            </div>
            <div class="text-center m-b-0">
                <p>
                    {{ $pitch->user->company }}
                </p>
            </div>
            <div class="text-center m-b-0">
                @if($pitch->user->phone_number)
                    <p>
                        <b>Call:</b> {{ $pitch->user->phone_number }}
                    </p>
                @endif
            </div>
            <div class="text-center m-b-0">
                @foreach ($pitch->user->socials as $social)
                    <a href="{{ $social->url }}" style="margin-right: 8px; margin-left: 8px; text-decoration: none" target="_blank">
                        <img class="socials" src="{{ $social->getImageForEmail() }}" width="16" height="16">
                    </a>
                @endforeach
            </div>
        @endif
        <div class="text-center submit-wrapper m-b-0">
            <a href="{{ 'mailto:'.$pitch->mailnuggets_id.'?subject='.rawurlencode("RE: OnePitch '".$pitch->subject."'").'&body='.rawurlencode('Hi '.$pitch->user->full_name.',').'%0D%0A%0D%0A'.rawurlencode("I received your '".$pitch->subject."' pitch in my OnePitch daily email. Can you please provide the following information:") }}"
               class="btn btn-white-ylw btn-submit submitter">Email Publicist</a>
            <div class="or-inline">
                or <a href="{{ 'mailto:'.$pitch->mailnuggets_id.'?subject='.rawurlencode("RE: OnePitch '".$pitch->subject."'").'&body='.rawurlencode('Hi '.$pitch->user->full_name.',').'%0D%0A%0D%0A'.rawurlencode("I received your '".$pitch->subject."' pitch in my OnePitch daily email. Can you please provide the following information:") }}">click here</a> to email publicist
            </div>
        </div>
    </div>
@endcan
