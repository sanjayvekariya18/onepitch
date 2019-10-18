@can('edit-inquiry', $inquiry)
<p class="light-grey">Uploaded: {{ $inquiry->uploaded_at ? convertDateToFormat($inquiry->uploaded_at, 'M d, Y \a\t g:i A') : 'N/A' }}</p>
@if ($inquiry->sent_at)
    <p class="light-grey">Sent: {{ convertDateToFormat($inquiry->uploaded_at, 'M d, Y \a\t g:i A') }}</p>
{{--    <p class="light-grey">{{ $inquiry->sent_amount }} Emails Sent</p>--}}
@else
    <p class="{{ $inquiry->getStatusClass() }}">{{ $inquiry->getStatusText() }}</p>
@endif
@if (count($inquiry->views) > 0)
    <!-- <p class="light-grey">
        <b>Views (by outlets):</b> {{ stringifyRelationshipModels($inquiry->views, 'user', 'company', ', ') }}
    </p> -->
@endif
@else
    <p class="light-grey">Sent: {{ convertDateToFormat($inquiry->sent_at, 'M d, Y \a\t g:i A') }}</p>
    @if ($inquiry->saved_inquiries->where('user_id', $user->id)->first()->created_at)
        <p class="light-grey">Saved: {{ convertDateToFormat($inquiry->saved_inquiries->where('user_id', $user->id)->first()->created_at, 'M d, Y \a\t g:i A') }}</p>
    @endif
@endcan

<h1>{{ $inquiry->subject ? $inquiry->subject : 'N/A' }}</h1>

<p class="m-b-8">Brand: {{ $inquiry->company ? $inquiry->company : 'N/A' }}</p>

@if ($inquiry->website)
    <p class="m-b-8">Link: <a href="{{ adjustUrl($inquiry->website) }}" target="_blank">{{ $inquiry->website }}</a></p>
@endif

<p class="small-bold">
    @can('edit-inquiry', $inquiry)
        Industries: {{ stringifyModels($indstrs_data['industries'], 'title', ', ') }}
    @else
        Industries: {{ stringifyModels($user->industries->intersect($inquiry->industries), 'title', ', ') }}
    @endcan
</p>
<p class="small-bold m-b-8">
    Topics: {{ stringifyModels($indstrs_data['topics'], 'title', ', ') }}
</p>

@if($inquiry->files[0])
    <p class="small-bold m-b-8">
        Media Attachments: <a href="{{ getBucketPreUrl().$inquiry->files[0]->url }}" target="_blank">{{ $inquiry->files[0]->name }}</a>
        @if ($inquiry->files[1]), <a href="{{ getBucketPreUrl().$inquiry->files[1]->url }}" target="_blank">{{ $inquiry->files[1]->name }}</a>@endif
        @if ($inquiry->files[2]), <a href="{{ getBucketPreUrl().$inquiry->files[2]->url }}" target="_blank">{{ $inquiry->files[2]->name }}</a>@endif
    </p>
@endif

@if ($inquiry->event)
    <p class="small-bold">
        Deadline:<br/>
    </p>
    <p class="small-regular">
        {{ $inquiry->event->title }}<br/>
        @if ($inquiry->event->getDateString())
            Date: {{ $inquiry->event->getDateString() }}<br/>
        @endif
        @if ($inquiry->event->getTimeString())
            Time: {{ $inquiry->event->getTimeString() }}<br/>
        @endif
    </p>
@endif

<h2 class="section-title m-b-8">What</h2>

<ul class="list m-b-32">
    @if ($inquiry->what_point_1)
        <li>{{ $inquiry->what_point_1 }}</li>
    @endif
    @if ($inquiry->what_point_2)
        <li>{{ $inquiry->what_point_2 }}</li>
    @endif
    @if ($inquiry->what_point_3)
        <li>{{ $inquiry->what_point_3 }}</li>
    @endif
    @if ($inquiry->what_point_4)
        <li>{{ $inquiry->what_point_4 }}</li>
    @endif
    @if ($inquiry->what_point_5)
        <li>{{ $inquiry->what_point_5 }}</li>
    @endif
</ul>

<h2 class="section-title m-b-8">Want</h2>

<ul class="list">
    @if ($inquiry->why_point_1)
        <li>{{ $inquiry->why_point_1 }}</li>
    @endif
    @if ($inquiry->why_point_2)
        <li>{{ $inquiry->why_point_2 }}</li>
    @endif
    @if ($inquiry->why_point_3)
        <li>{{ $inquiry->why_point_3 }}</li>
    @endif
    @if ($inquiry->why_point_4)
        <li>{{ $inquiry->why_point_4 }}</li>
    @endif
    @if ($inquiry->why_point_5)
        <li>{{ $inquiry->why_point_5 }}</li>
    @endif
</ul>

@can('edit-inquiry', $inquiry)
@if (in_array($inquiry->status, \App\Models\Inquiry::getStatusesToEdit()))
    <div class="text-center submit-wrapper m-t-32 m-b-0">
        <a href="{{ route('inquiry_what', ['inquiry_id' => $inquiry->id]) }}" class="btn btn-white-ylw btn-submit submitter">Edit Inquiry</a>
        <div class="or-inline">
            Or you can
            <a href="javascript:;" onclick="inquiry.openDeleteInquiryModal({{ $inquiry->id }})">delete this inquiry</a>
        </div>
    </div>
@elseif ($inquiry->status != \App\Models\Inquiry::STATUS_PUBLISHED)
    <div class="text-center submit-wrapper m-t-48 m-b-0">
        <div class="or-inline">
            <a href="javascript:;" onclick="inquiry.openDeleteInquiryModal({{ $inquiry->id }})">Click here to delete this inquiry.</a>
        </div>
    </div>
@endif

@if ($inquiry->status > 1)
    <div class="text-center row m-t-32 m-b-0 modal-metrics">
        <div class="col-md-2 col-md-offset-1">
            <div class="icon-image">
                <img src="/fonts/icon-mail-sent.svg" alt="">
            </div>
            <div class="metrics">
                {{ $inquiry->sent_amount }}
            </div>
        </div>
        <div class="col-md-2">
            <div class="icon-image">
                <img src="/fonts/icon-mail-open.svg" alt="">
            </div>
            <div class="metrics">
                {{ $inquiry->opens }}
            </div>
        </div>
        <div class="col-md-2">
            <div class="icon-image">
                <img src="/fonts/icon-mail-click.svg" alt="">
            </div>
            <div class="metrics">
                {{ $inquiry->clicks }}
            </div>
        </div>
        <div class="col-md-2">
            <div class="icon-image">
                <img src="/fonts/icon-mail-save.svg" alt="">
            </div>
            <div class="metrics">
                {{ $savedInquiries->count() }}
            </div>
        </div>
        <div class="col-md-2">
            <div class="icon-image">
                <img src="/fonts/icon-mail-response.svg" alt="">
            </div>
            <div class="metrics">
                {{ count($inquiry->mail_statistics) }}
            </div>
        </div>
    </div>
@endif
@else
    <div class="modal-user-info">
        @if($inquiry->user)
            <div class="text-center m-t-16 m-b-0">
                @if ($inquiry->user->hasPhoto())
                    <img class="image" src="{{ $inquiry->user->getPhotoUrl() }}" alt="" width="80" height="80">
                @else
                    <span class="initials">{{ $inquiry->user->initials }}</span>
                @endif
            </div>
            <div class="text-center m-b-0">
                <p>
                    <b>{{ strtoupper($inquiry->user->full_name) }}</b>
                </p>
            </div>
            <div class="text-center m-b-0">
                <p>
                    {{ $inquiry->user->company }}
                </p>
            </div>
            {{--<div class="text-center m-b-0">--}}
                {{--@if($inquiry->user->phone_number)--}}
                    {{--<p>--}}
                        {{--<b>Call:</b> {{ $inquiry->user->phone_number }}--}}
                    {{--</p>--}}
                {{--@endif--}}
            {{--</div>--}}
            <div class="text-center m-b-0">
                @foreach ($inquiry->user->socials as $social)
                    <a href="{{ $social->url }}" style="margin-right: 8px; margin-left: 8px; text-decoration: none" target="_blank">
                        <img class="socials" src="{{ $social->getImageForEmail() }}" width="16" height="16">
                    </a>
                @endforeach
            </div>
        @endif
        <div class="text-center submit-wrapper m-t-32 m-b-0">
            <a href="{{ 'mailto:'.$inquiry->mailnuggets_id.'?subject='.rawurlencode("RE: OnePitch '".$inquiry->subject."'").'&body='.rawurlencode('Hi '.$inquiry->user->full_name.',').'%0D%0A%0D%0A'.rawurlencode("I received your '".$inquiry->subject."' inquiry in my OnePitch daily email. Here is the information you requested:\r\n-\r\n-\r\n-") }}"
               class="btn btn-white-ylw btn-submit submitter">Email Journalist</a>
            <div class="or-inline">
                or <a href="{{ 'mailto:'.$inquiry->mailnuggets_id.'?subject='.rawurlencode("RE: OnePitch '".$inquiry->subject."'").'&body='.rawurlencode('Hi '.$inquiry->user->full_name.',').'%0D%0A%0D%0A'.rawurlencode("I received your '".$inquiry->subject."' inquiry in my OnePitch daily email. Here is the information you requested:\r\n-\r\n-\r\n-") }}">click here</a> to email journalist
            </div>
        </div>
    </div>

@endcan
