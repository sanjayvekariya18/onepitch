@extends('layouts.simple', [
    'body_classes' => ['error_page'],
    'without_logo' => true,
])

@section('title', 'Page Not Found')

@section('content')
<div class="error_page_wrap">
    <div class="page_header">
        <div class="img_wrap">
            {{HTML::image('/images/one-pitch-logo-medium-lightyll.png')}}
        </div>
        <div class="page_title">
            <div class="vertical_separator"></div>
            404 Error
        </div>
        <div class="line_separator"></div>
        <div class="bottom_text">
            Sorry, this page doesn’t exist.
        </div>
    </div>
</div>
@endsection