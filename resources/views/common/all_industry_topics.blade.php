<h2 class="text-center">
    What topics do you cover for all industry selection</h2>

<hr class="small"/>

<div class="topics-head">
    <h3 class="section-head left m-b-0">Pick as many topics as you want.</h3>
    <div class="select-all-wrap">
        <div class="check-box">
            <input type="checkbox" onchange="common.selectAll(this, 'topic-input', '#add-topics')"/>
            <span class="check-mark">
                <i class="material-icons">done</i>
            </span>
        </div>

        Select All
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

        <input type="hidden" name="industry" value=""/>

    </form>
</div>

<div class="text-center">
    <a href="javascript:void(0);"
       id="add-topics"
       onclick="common.addAllIndustryTopics();"
       class="btn btn-white-ylw btn-submit m-b-64" disabled>Next</a>
</div>