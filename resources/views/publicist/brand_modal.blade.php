<h2 class="text-center">{{ $brand ? 'Edit' : 'Add New' }} Brand</h2>
<form id="add-brand-form" action="{{ route('brand_view_modal') }}" method="post" data-parsley-focus="none">
    <div class="row">
        <div class="form-group col-sm-12">
            <input type="text" class="form-control" name="company" placeholder="Brand Name"
                   value="{{ $brand ? $brand->company : '' }}" onkeyup="common.charsCount(this);" required maxlength="100">
            <label>Brand Name</label>
            <div class="counter"></div>
        </div>
        <div class="form-group col-sm-6">
            <input type="url" class="form-control" name="website"
                   onkeyup="common.charsCount(this);" required maxlength="100"
                   placeholder="Brand URL" value="{{ $brand ? $brand->website : '' }}">
            <label>Brand URL</label>
        </div>

        <div class="form-group col-sm-6">
            <input type="text" class="form-control" name="location"
                   onkeyup="common.charsCount(this);"
                   placeholder="Brand Location" value="{{ $brand ? $brand->location : '' }}">
            <label>Brand Location</label>
        </div>

        <div class="form-group col-sm-6">
            <input type="url" class="form-control" name="twitter_url"
                   onkeyup="common.charsCount(this);" maxlength="100"
                   placeholder="Brand Twitter" value="{{ $brand ? $brand->twitter_url : '' }}">
            <label>Brand Twitter</label>
        </div>

        <div class="form-group col-sm-6">
            <input type="url" class="form-control" name="linkedin_url"
                   onkeyup="common.charsCount(this);" maxlength="100"
                   placeholder="Brand LinkedIn" value="{{ $brand ? $brand->linkedin_url : '' }}">
            <label>Brand LinkedIn</label>
        </div>

        <div class="form-group col-sm-6">
            <input type="url" class="form-control" name="facebook_url"
                   onkeyup="common.charsCount(this);" maxlength="100"
                   placeholder="Brand Facebook" value="{{ $brand ? $brand->facebook_url : '' }}">
            <label>Brand Facebook</label>
        </div>

        <div class="form-group col-sm-6">
            <input type="url" class="form-control" name="instagram_url"
                   onkeyup="common.charsCount(this);" maxlength="100"
                   placeholder="Brand Instagram" value="{{ $brand ? $brand->instagram_url : '' }}">
            <label>Brand Instagram</label>
        </div>

        <div class="form-group col-sm-6">
            <input type="url" class="form-control" name="youtube_url"
                   onkeyup="common.charsCount(this);" maxlength="100"
                   placeholder="Brand YouTube" value="{{ $brand ? $brand->youtube_url : '' }}">
            <label>Brand YouTube</label>
        </div>

        <div class="form-group col-sm-6">
            <input type="url" class="form-control" name="vimeo_url"
                   onkeyup="common.charsCount(this);" maxlength="100"
                   placeholder="Brand Vimeo" value="{{ $brand ? $brand->vimeo_url : '' }}">
            <label>Brand Vimeo</label>
        </div>

        <h3 class="section-head col-sm-12 m-t-15">Industries</h3>
        <div class="form-group col-sm-12">
            <select name="industries[]" id="industry" multiple="multiple" class="form-control" required>
                @foreach ($industries as $industry)
                    <option value="{{ $industry->id }}">{{ $industry->title }}</option>
                @endforeach
            </select>
        </div>

        <h3 class="section-head col-sm-12 m-t-15">Topics</h3>
        <div class="form-group col-sm-12">
            <select name="topics[]" id="topic" multiple="multiple"  class="form-control" required>
                @foreach ($topics as $topic)
                    <option value="{{ $topic->id }}">{{ $topic->title }}</option>
                @endforeach
            </select>
        </div>
        @if ($brand)
            <input name="brand_id" type="hidden" value="{{ $brand->id }}">
        @endif
    </div>

    <div class="text-center submit-wrapper">
        <button type="submit" class="btn btn-white-ylw btn-submit submitter" disabled>SAVE CHANGES</button>
    </div>
    @if ($brand)
        <div class="text-center submit-wrapper delete-button m-t-48 m-b-0">
            <div class="or-inline">
                <a href="javascript:;" onclick="common.openDeleteBrandModal({{ $brand->id }})">Click here to delete this brand.</a>
            </div>
        </div>
    @endif
</form>

<script>
    $(function () {
        var selectedIndustries = {!! json_encode($brandIndustries) !!};
        var selectedTopics = {!! json_encode($brandTopics) !!};

        for (var i in selectedIndustries) {
            $('select#industry option[value="' + selectedIndustries[i] + '"]').attr("selected",true);
        }

        for (var i in selectedTopics) {
            $('select#topic option[value="' + selectedTopics[i] + '"]').attr("selected",true);
        }

        var $slct = $('select#industry').select2({
            maximumSelectionLength: 5,
            placeholder: "Select Industries",
        });
        var $slct1 = $('select#topic').select2({
            maximumSelectionLength: 5,
            placeholder: "Select Topics",
        });

        $('.select2-search.select2-search--inline > input').width('150');
        $('.select2-selection.select2-selection--multiple').css('overflow', 'scroll');

        common.bindBrandFormValidation();
    })
</script>