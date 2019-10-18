<h3 class="section-head left" style="text-align: center;margin-top: 15px;">
    <!-- What are the most relevant topics related to this pitch? -->
    <span class="hidden-xs pitch-tooltip">
        <span class="tooltiptext">
            We recommend selecting at least two topics and no more than five. If you have a new product launch and thought leadership in the same pitch, then we recommend submitting separate pitches for each topic.
        </span>
        <i class="material-icons">info_outline</i>
    </span>

    @can('pitch-tool')
        <span class="pitch-tooltip">
            <span class="topicsDot dot dotrel red"></span>
            <span class="topicsDot tooltiptext insidedot" >0/3</span>
        </span>
    @endcan
</h3>
{{--<div class="sub-section-head">Be wise, savvy publicist. You'll pick the industry on the next step.</div>--}}

<div class="row search-industries-wrap">
                    <div class="col-sm-8">
                        <div class="form-group">
                            <div class="input-group white-input">
                                <input type="text" autocomplete="off" id="search-topic" class="form-control" placeholder="Search Topics">
                                <div class="input-group-addon"><img src="/img/icon-search.svg"></div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="col-sm-4 industries-count-wrap">
                        <div class="showing-count">
                            Showing <span class="count industries-showing"></span>/<span class="industries-total"></span> Industries
                        </div>
                    </div> -->
                </div>

<div class="row topics m-b-64">
    <form action="" class="topics-form">
    @if (count($all_topics))
        @foreach ($all_topics as $topic)
            <div class="col-sm-6 topic" data-id="{{ $topic->id }}">
                <div class="topic-inner checkbox-wrapper">
                    <div class="check-circle pull-left" onclick="common.selectIndustryTopic(this);common.validateFieldCountAndShowColor(this,'topics');">
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
    @else
        <h3 class="section-head text-center m-b-64 no-industries"> 
            You’re search for “{{ $term }}” Topic shows no results.
            <br/>
            <img src="/img/pensive-face-1-f-614@3x.png" />
        </h3>
    @endif

        <div class="col-sm-6 topic" data-id="custom">
            <div class="topic-inner checkbox-wrapper custom-topic">
                <div class="check-circle pull-left" onclick="common.selectIndustryTopicCustom(this);common.validateFieldCountAndShowColor(this,'topics');">
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
                <div class="check-circle pull-left" onclick="common.selectIndustryTopicCustom(this);common.validateFieldCountAndShowColor(this,'topics');">
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
                                       placeholder="Events/Embargoes" value="{{ $pitch->event ? $pitch->event->title : '' }}" required/>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-6 m-t-15 date-input-wrapper">
                            <div class="form-group">
                                <input type="text" class="form-control calendar-control main" onfocus="common.selectCutomTopicInput(this)"
                                       onblur="common.selectEventTopic(this)"
                                       name="event_date" id="event_date"
                                       placeholder="Select Date" value="{{ $pitch->event ? generateDateRange($pitch->event->date_from, $pitch->event->date_to) : '' }}" required/>

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
                                       placeholder="Select Time (optional)" value="{{ $pitch->event ? generateTimeRange($pitch->event->time_from, $pitch->event->time_to) : '' }}"/>

                                <div class="form-group m-t-15">
                                    <select name="event_timezone">
                                        <option value="hide" {{ $pitch->event && !$pitch->event->timezone ? 'selected' : '' }}>Select Time Zone</option>
                                        <option value="EST" {{ $pitch->event && $pitch->event->timezone == 'EST' ? 'selected' : '' }}>Eastern Standard Time (EST)</option>
                                        <option value="CST" {{ $pitch->event && $pitch->event->timezone == 'CST' ? 'selected' : '' }}>Central Standard Time (CST)</option>
                                        <option value="MST" {{ $pitch->event && $pitch->event->timezone == 'MST' ? 'selected' : '' }}>Mountain Standard Time (MST)</option>
                                        <option value="PST" {{ $pitch->event && $pitch->event->timezone == 'PST' ? 'selected' : '' }}>Pacific Standard Time (PST)</option>
                                        <option value="AKST" {{ $pitch->event && $pitch->event->timezone == 'AKST' ? 'selected' : '' }}>Alaskan Standard Time (AKST)</option>
                                        <option value="HST" {{ $pitch->event && $pitch->event->timezone == 'HST' ? 'selected' : '' }}>Hawaii-Aleutian Standard Time (HST)</option>
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
                                                           placeholder="00" value="{{ $pitch->event ? convertDateToFormat($pitch->event->time_from, 'g') : '' }}" required maxlength="2" min="0" max="12" data-parsley-type="digits"/>
                                                </div>

                                                <div class="time-separator">:</div>

                                                <div class="form-group">
                                                    <input type="text" class="form-control time-input"
                                                           onfocus="common.selectCutomTopicInput(this)"
                                                           name="event_from_minutes"
                                                           placeholder="00" value="{{ $pitch->event ? convertDateToFormat($pitch->event->time_from, 'i') : '' }}" required maxlength="2" min="0" max="59" data-parsley-type="digits"/>
                                                </div>

                                                <div class="clear"></div>

                                                <div class="m-t-20 text-center">
                                                    <div class="small-check-circle-wrap m-r-16">
                                                        <div class="small-check-circle">
                                                            <input type="radio" name="event_time_from_am_pm" value="AM" {{ $pitch->event ? amPMCheck($pitch->event->time_from, 'AM') : '' }}/>
                                                            <span class="check-mark"></span>
                                                        </div>
                                                        <label>AM</label>
                                                        <div class="clear"></div>
                                                    </div>

                                                    <div class="small-check-circle-wrap">
                                                        <div class="small-check-circle">
                                                            <input type="radio" name="event_time_from_am_pm" value="PM" {{ $pitch->event ? amPMCheck($pitch->event->time_from, 'PM') : '' }}/>
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
                                                           placeholder="00" value="{{ $pitch->event ? convertDateToFormat($pitch->event->time_to, 'g') : '' }}" maxlength="2" min="0" max="12" data-parsley-type="digits"/>
                                                </div>

                                                <div class="time-separator">:</div>

                                                <div class="form-group">
                                                    <input type="text" class="form-control time-input"
                                                           onfocus="common.selectCutomTopicInput(this)"
                                                           name="event_to_minutes"
                                                           placeholder="00" value="{{ $pitch->event ? convertDateToFormat($pitch->event->time_to, 'i') : '' }}" maxlength="2" min="0" max="59" data-parsley-type="digits"/>
                                                </div>

                                                <div class="clear"></div>

                                                <div class="m-t-20 text-center">
                                                    <div class="small-check-circle-wrap m-r-16">
                                                        <div class="small-check-circle">
                                                            <input type="radio" name="event_time_to_am_pm" value="AM" {{ $pitch->event ? amPMCheck($pitch->event->time_to, 'AM') : '' }}/>
                                                            <span class="check-mark"></span>
                                                        </div>
                                                        <label>AM</label>
                                                        <div class="clear"></div>
                                                    </div>

                                                    <div class="small-check-circle-wrap">
                                                        <div class="small-check-circle">
                                                            <input type="radio" name="event_time_to_am_pm" value="PM" {{ $pitch->event ? amPMCheck($pitch->event->time_from, 'PM') : '' }}/>
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
       class="btn btn-white-ylw btn-submit m-b-64" disabled>Next</a>
</div>

<script>
	$(function () {

        $('#search-topic').keyup(function(e) {
            clearTimeout($.data(this, 'timer'));
            if (e.keyCode == 13)
            search(true);
            else
            $(this).data('timer', setTimeout(search, 500));
        });
        function search(force) {
            var existingString = $("#search-topic").val();
            var pitch_id = $("#pitchId").val();
            if (!force && existingString.length > 0 && existingString.length < 3) return; //wasn't enter, not > 2 char
            $.ajax({
                type: 'POST',
                url: laroute.route('service_load_pitch_topics'),
                data: {
                    pitch_id: pitch_id,
                    term: existingString,
                },
                success: function (data) {  
                $('.content-area').addClass('hidden')
                $('.industry-topics').html(data)
                $('.industry-topics').removeClass('hidden')
                $("#search-topic").val(existingString).focus()
                if (tour) {
                  tour.redraw()
                }
                },
            })
        }

		pitch.bindTopicsFromTag('#industry-tags');

		$('#add-topics').click(function () {
          var topicsSelected = $('.topics-form').find('.topic-input:checked').length

          if(topicsSelected)
            pitch.loadPitchIndustries({{ $pitch->id }});
        })

		var datepicker_binded = false;
		@if ($pitch->event)
		    @if ($pitch->event->isRange())
                $('#single-range-date-switch').trigger('click');
		        datepicker_binded = true;
		    @endif

            common.selectEventTopic('.topic-inner.event-topic .form-control[name="event_title"]');
        @endif

        if (!datepicker_binded) {
			common.bindDateRangePicker('#event_date', true);
        }

		var $slct = $('select').select2({
			minimumResultsForSearch: Infinity,
		});
		$slct.on("select2:open", function (e) {
			common.selectCutomTopicInput(this)
		});

		common.bindCustomFormValidation('#timepicker-form');
	})
</script>
