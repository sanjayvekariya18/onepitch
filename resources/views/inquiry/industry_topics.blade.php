<h3 class="section-head left" style="text-align: center;
    margin-left: 3px;
    margin-top: 20px;
    margin-bottom: -72px;">
    <!-- First, pick the topics related to your inquiry. -->
    <span class="hidden-xs pitch-tooltip">
        <span class="tooltiptext">
            Select the MOST important topics related to your inquiry. If you're asking for multiple topics in the same pitch (i.e. product launch, funding, interview/speaking opp), then we recommend submitting separate inquiries for each topic.
        </span>
        <i class="material-icons">info_outline</i>
    </span>
</h3>
{{--<div class="sub-section-head">You'll pick the industry on the next step.</div>--}}

<div class="row search-industries-wrap">
    <div class="col-sm-8">
    </div>
    <div class="col-sm-4 industries-count-wrap">
        <div class="select-all-wrap showing-count">
            <div class="check-box">
                <input type="checkbox" name="check_all_topics" id="check_all_topics"/>
                <span class="check-mark">
                    <i class="material-icons">done</i>
                </span>
            </div>

            Select All
        </div>
    </div>
</div>

<div class="row topics m-b-64">
    <form action="" class="topics-form">
        @foreach ($all_topics as $topic)
            <div class="col-sm-6 topic" data-id="{{ $topic->id }}">
                <div class="topic-inner checkbox-wrapper">
                    <div class="check-circle pull-left" onclick="common.selectIndustryTopic(this);">
                        <input type="checkbox" class="topic-input" id="topic-input{{ $topic->id }}" name="topics" value="{{ $topic->id }}"/>
                        <span class="check-mark">
                        </span>
                    </div>

                    <div class="topic-title">
                        <span>{{ $topic->title }}</span>
                    </div>

                    <div class="topic-description">
                        {{ $topic->description }}
                    </div>

                    <div class="clear"></div>
                </div>
            </div>
        @endforeach

        <div class="col-sm-6 topic" data-id="custom">
            <div class="topic-inner checkbox-wrapper custom-topic">
                <div class="check-circle pull-left" onclick="common.selectIndustryTopicCustom(this);">
                    <input type="checkbox" class="topic-input" id="topic-input-custom" name="topics" value="" />
                    <span class="check-mark">
                    </span>
                </div>

                <div class="form-group custom-topic-form">
                    <input type="text" class="form-control" onfocus="common.selectCutomTopicInput(this)"
                           onblur="common.selectCustomTopic(this)"
                           placeholder="Add New Topic (Make your own)" value=""/>
                </div>

                <div class="clear"></div>
            </div>
        </div>

        <div class="col-sm-12 topic" data-id="event">
            <div class="topic-inner checkbox-wrapper event-topic">
                <div class="check-circle pull-left" onclick="common.selectIndustryTopicCustom(this);">
                    <input type="checkbox" class="topic-input" id="topic-input-event" name="event" value="0" />
                    <span class="check-mark">
                    </span>
                </div>

                <div class="custom-topic-form">
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <input type="text" class="form-control main" onfocus="common.selectCutomTopicInput(this)"
                                       onblur="common.selectEventTopic(this)"
                                       name="event_title"
                                       placeholder="Deadline" value="{{ $inquiry->event ? $inquiry->event->title : '' }}" required/>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-6 m-t-15 date-input-wrapper">
                            <div class="form-group">
                                <input type="text" class="form-control calendar-control main" onfocus="common.selectCutomTopicInput(this)"
                                       onblur="common.selectEventTopic(this)"
                                       name="event_date" id="event_date"
                                       placeholder="Select Date" value="{{ $inquiry->event ? generateDateRange($inquiry->event->date_from, $inquiry->event->date_to) : '' }}" required/>

                                <div class="text-left m-t-15">
                                    <div class="check-box">
                                        <input type="checkbox" id="single-range-date-switch"
                                               onchange="common.switchSingleRangeDate(this, '#event_date')"/>
                                        <span class="check-mark">
                                            <i class="material-icons">done</i>
                                        </span>
                                    </div>

                                    <span class="check-box-label">Date Range</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6 m-t-15 timepicker-input-wrapper">
                            <div class="form-group">
                                <input type="text" class="form-control time-control main" onfocus="common.selectCutomTopicInput(this)"
                                       onblur="common.selectEventTopic(this)"
                                       name="event_time"
                                       class="dropdown-toggle"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                                       id="customTimePicker"
                                       placeholder="Select Time (optional)" value="{{ $inquiry->event ? generateTimeRange($inquiry->event->time_from, $inquiry->event->time_to) : '' }}"/>

                                <div class="form-group m-t-15">
                                    <select name="event_timezone">
                                        <option value="hide" {{ $inquiry->event && !$inquiry->event->timezone ? 'selected' : '' }}>Select Time Zone</option>
                                        <option value="EST" {{ $inquiry->event && $inquiry->event->timezone == 'EST' ? 'selected' : '' }}>Eastern Standard Time (EST)</option>
                                        <option value="CST" {{ $inquiry->event && $inquiry->event->timezone == 'CST' ? 'selected' : '' }}>Central Standard Time (CST)</option>
                                        <option value="MST" {{ $inquiry->event && $inquiry->event->timezone == 'MST' ? 'selected' : '' }}>Mountain Standard Time (MST)</option>
                                        <option value="PST" {{ $inquiry->event && $inquiry->event->timezone == 'PST' ? 'selected' : '' }}>Pacific Standard Time (PST)</option>
                                        <option value="AKST" {{ $inquiry->event && $inquiry->event->timezone == 'AKST' ? 'selected' : '' }}>Alaskan Standard Time (AKST)</option>
                                        <option value="HST" {{ $inquiry->event && $inquiry->event->timezone == 'HST' ? 'selected' : '' }}>Hawaii-Aleutian Standard Time (HST)</option>
                                    </select>
                                </div>


                                <div class="timepicker daterangepicker dropdown-menu ltr single openscenter show-calendar dropup" aria-labelledby="customTimePicker">
                                    <div id="timepicker-form" class="custom-timepicker-form">
                                        <div class="time-wrapper">
                                            <div class="time-label">
                                                Start Time
                                            </div>
                                            <div class="text-center time-block">
                                                <div class="form-group">
                                                    <input type="text" class="form-control time-input"
                                                           onfocus="common.selectCutomTopicInput(this)"
                                                           name="event_from_hours"
                                                           placeholder="00" value="{{ $inquiry->event ? convertDateToFormat($inquiry->event->time_from, 'g') : '' }}" required maxlength="2" min="0" max="12" data-parsley-type="digits"/>
                                                </div>

                                                <div class="time-separator">:</div>

                                                <div class="form-group">
                                                    <input type="text" class="form-control time-input"
                                                           onfocus="common.selectCutomTopicInput(this)"
                                                           name="event_from_minutes"
                                                           placeholder="00" value="{{ $inquiry->event ? convertDateToFormat($inquiry->event->time_from, 'i') : '' }}" required maxlength="2" min="0" max="59" data-parsley-type="digits"/>
                                                </div>

                                                <div class="clear"></div>

                                                <div class="m-t-20 text-center">
                                                    <div class="small-check-circle-wrap m-r-16">
                                                        <div class="small-check-circle">
                                                            <input type="radio" name="event_time_from_am_pm" value="AM" {{ $inquiry->event ? amPMCheck($inquiry->event->time_from, 'AM') : '' }}/>
                                                            <span class="check-mark"></span>
                                                        </div>
                                                        <label>AM</label>
                                                        <div class="clear"></div>
                                                    </div>

                                                    <div class="small-check-circle-wrap">
                                                        <div class="small-check-circle">
                                                            <input type="radio" name="event_time_from_am_pm" value="PM" {{ $inquiry->event ? amPMCheck($inquiry->event->time_from, 'PM') : '' }}/>
                                                            <span class="check-mark"></span>
                                                        </div>
                                                        <label>PM</label>
                                                        <div class="clear"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="time-blocks-separator">-</div>

                                        <div class="time-wrapper m-b-64">
                                            <div class="time-label">
                                                End Time (optional)
                                            </div>
                                            <div class="text-center time-block">
                                                <div class="form-group">
                                                    <input type="text" class="form-control time-input"
                                                           onfocus="common.selectCutomTopicInput(this)"
                                                           name="event_to_hours"
                                                           placeholder="00" value="{{ $inquiry->event ? convertDateToFormat($inquiry->event->time_to, 'g') : '' }}" maxlength="2" min="0" max="12" data-parsley-type="digits"/>
                                                </div>

                                                <div class="time-separator">:</div>

                                                <div class="form-group">
                                                    <input type="text" class="form-control time-input"
                                                           onfocus="common.selectCutomTopicInput(this)"
                                                           name="event_to_minutes"
                                                           placeholder="00" value="{{ $inquiry->event ? convertDateToFormat($inquiry->event->time_to, 'i') : '' }}" maxlength="2" min="0" max="59" data-parsley-type="digits"/>
                                                </div>

                                                <div class="clear"></div>

                                                <div class="m-t-20 text-center">
                                                    <div class="small-check-circle-wrap m-r-16">
                                                        <div class="small-check-circle">
                                                            <input type="radio" name="event_time_to_am_pm" value="AM" {{ $inquiry->event ? amPMCheck($inquiry->event->time_to, 'AM') : '' }}/>
                                                            <span class="check-mark"></span>
                                                        </div>
                                                        <label>AM</label>
                                                        <div class="clear"></div>
                                                    </div>

                                                    <div class="small-check-circle-wrap">
                                                        <div class="small-check-circle">
                                                            <input type="radio" name="event_time_to_am_pm" value="PM" {{ $inquiry->event ? amPMCheck($inquiry->event->time_from, 'PM') : '' }}/>
                                                            <span class="check-mark"></span>
                                                        </div>
                                                        <label>PM</label>
                                                        <div class="clear"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="text-center">
                                            <a href="javascript:;"
                                               onclick="common.submitTime(this, '#customTimePicker');"
                                               class="btn btn-white-ylw btn-submit submitter" disabled>Set Time</a>
                                        </div>
                                    </div>

                                    <div class="clear"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div class="clear"></div>
            </div>
        </div>
    </form>
</div>

<div class="text-center">
    <a href="javascript:void(0);"
       id="add-topics"
       onclick="inquiry.loadInquiryIndustries({{ $inquiry->id }});"
       class="btn btn-white-ylw btn-submit m-b-64" disabled>Next</a>
</div>

<script>
  $(function () {
    inquiry.bindTopicsFromTag('#industry-tags')

    var datepicker_binded = false
      @if ($inquiry->event)
      @if ($inquiry->event->isRange())
      $('#single-range-date-switch').trigger('click')
    datepicker_binded = true
      @endif

      common.selectEventTopic('.topic-inner.event-topic .form-control[name="event_title"]')
      @endif

      if (!datepicker_binded) {
        common.bindDateRangePicker('#event_date', true)
      }

    var $slct = $('select').select2({
      minimumResultsForSearch: Infinity,
    })
    $slct.on('select2:open', function (e) {
      common.selectCutomTopicInput(this)
    })

    common.bindCustomFormValidation('#timepicker-form')

    $('#check_all_topics').click(function () {
      if ($(this).is(':checked')) {
        $('input:checkbox[name=\'topics\']').each(function () {
          if (!$(this).is(':checked') && $(this).attr('id') !== 'topic-input-custom') {
            $(this).click()
          }
        })
      } else {
        $('input:checkbox[class=\'topic-input\']:checked').each(function () {
          $(this).click()
        })

      }
    })
  })
</script>
