@extends('layouts.simple')

@section('title', 'Brands')

@section('content')
    <div class="content">
        <div class="buttons-group m-b-56">
            <a onclick="common.openBrandModal()"
               class="btn btn-white-ylw">Add New Brand</a>
        </div>

        <h2 class="text-center">
            <div class="block-center">
                Brand Index
            </div>
        </h2>
        <hr class="small"/>

        <div>
            @if (count($user->companies))
                <table class="table table-striped m-t-48">
                    <thead>
                    <tr>
                        <td>Brand Name</td>
                        <td class="not-for-xs">Brand Website</td>
                        <td class="not-for-xs">Brand Location</td>
                        <td class="not-for-sm">Industries</td>
                        <td class="not-for-xs">Topics</td>
                    </tr>
                    </thead>
                    <tbody>
                        @foreach($user->companies as $company)
                            <tr  onclick="common.openBrandModal({{ $company->id }})">
                                <td>{{ str_limit($company->company, 50) }}</td>
                                <td class="not-for-sm">{{ $company->website }}</td>
                                <td class="not-for-sm">{{ $company->location }}</td>
                                <td class="not-for-xs">{{ str_limit(stringifyRelationshipModels($company->industries, 'industry', 'title', ', '), 50) }}</td>
                                <td class="not-for-xs">{{ str_limit(stringifyRelationshipModels($company->industries[0]->topics, 'topic', 'title', ', '), 50) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            @else
                <h3 class="section-head text-center m-b-64 no-industries">
                    You do not have any Companies.
                    <br/>
                    <img src="/img/pensive-face-1-f-614@3x.png" />
                </h3>
            @endif
        </div>

        {{--<div class="row industries">--}}
            {{--@if (count($user->companies))--}}
                {{--@foreach ($user->companies as $company)--}}
                    {{--<div id="industry-block{{ $company->id }}" class="col-sm-6 col-md-4 industry">--}}
                        {{--<div class="industry-container">--}}
                            {{--<div class="industry-container-inner list">--}}
                                {{--<div>--}}
                                    {{--<div class="industry-title">{{ $company->company }}</div>--}}
                                {{--</div>--}}

                            {{--</div>--}}

                            {{--<div class="industry-container-inner hover">--}}
                                {{--<div class="industry-title">{{ $industry->title }}</div>--}}
                                {{--<div class="industry-description">{{ $industry->description }}</div>--}}
                            {{--</div>--}}
                        {{--</div>--}}
                    {{--</div>--}}
                {{--@endforeach--}}
            {{--@else--}}
                {{--<h3 class="section-head text-center m-b-64 no-industries">--}}
                    {{--You do not have any Companies.--}}
                    {{--<br/>--}}
                    {{--<img src="/img/pensive-face-1-f-614@3x.png" />--}}
                {{--</h3>--}}
            {{--@endif--}}
        {{--</div>--}}
    </div>

    <div class="modal" tabindex="-1" role="dialog" id="add-brand-modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">&nbsp;</button>
                <div class="modal-body no-padding-xs">
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <div class="modal yes-no-modal" tabindex="-1" role="dialog" id="brand-delete-modal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body no-padding-xs">
                    <h1>Delete Brand</h1>
                    <p>Are you sure you want to permanently delete this brand?</p>
                    <div class="yes-no-submit">
                        <button type="button" class="btn btn-cancel" data-dismiss="modal" aria-label="Cancel">Cancel</button>
                        <a type="button" onclick="common.brandDelete();" class="btn btn-white-ylw btn-submit">Yes, DELETE</a>
                        <input type="hidden" id="brand-delete-id"/>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>

@endsection