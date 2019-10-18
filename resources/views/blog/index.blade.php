@extends('layouts.landing', [
'with_header' => true,
'header_classes' => ['yellow', 'fixed'],
])

@section('title', 'Blog - OnePitch')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
    <div class="col-lg-12 blog">
        <div class="content">
            <div class="header">
                <img src="/img/blog/typebar-logo.png" alt="typebar-logo-image">
            </div>
            <div class="row">
                <div class="col-md-12 m-t-15 m-b-15">
                    <div style="width: 95%;margin-left:auto;margin-right: auto">
                        <ul class="nav nav-pills nav-justified">
                            @foreach($blogCategories as $blogCategory)
                                <li role="presentation" class="active" style="padding-bottom: 5px;">
                                    <div class="nav-block-common active" data-cat="{{$blogCategory->id}}"
                                         id="block_category_{{$blogCategory->id}}">
                                        {{$blogCategory->name}}
                                    </div>
                                </li>
                            @endforeach
                        </ul>
                    </div>
                    <div class="hidden-xs pitch-tooltip" style="position: absolute;right: 10px;top: 14px;">
                        <i class="material-icons">info_outline</i>
                        <span class="tooltiptext">To filter by blog post type, select your desired category by clicking<br/> the category name (hint: it will turn yellow).</span>
                    </div>
                </div>
            </div>
            <div class="row all">
                <div class="col-md-2 hidden-sm left-blog"></div>
                <div class="col-md-8">
                    <div class="row">
                        <div class="col-md-8 feature-post-container">
                            <div class="wrapper featured-post @if(!$featuredPost->blog_post_categories->count()){{'cat-0'}}@endif @foreach($featuredPost->blog_post_categories as $category){{'cat-' . $category->blog_post_category_id}} @endforeach">
                                @include('blog.partials._card', ['post' => $featuredPost])
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="wrapper subscribe">
                                <div class="card radius">
                                    <div class="mailing-subscribe">
                                        <div class="mailing-content">
                                            <p>Subscribe to receive monthly updates, access to new blogs, Taylor's top
                                                Tips and more.</p>
                                            @include('blog.parts.subscribe-form')
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row posts-container">
                        @foreach($blogPosts as $blogPost)
                            <div class="col-sm-6 col-md-4">
                                <div class="wrapper @if(!$blogPost->blog_post_categories->count()){{'cat-0'}}@endif @foreach($blogPost->blog_post_categories as $category){{'cat-' . $category->blog_post_category_id}} @endforeach">
                                    @include('blog.partials._card', ['post' => $blogPost])
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
                <div class="col-md-2 hidden-sm right-blog"></div>
            </div>
        </div>
    </div>
@endsection

@push('js')
    <script>
      function filterCategory () {
        var changeFeatured = true

        $('div.posts-container > div').hide()

        $('div.nav-block-common.active').each(function (e) {
          var idCategory = $(this).data('cat')

          $('div.cat-' + idCategory).parent('div').show()

          if ($('div.featured-post').hasClass('cat-' + idCategory)) {
            changeFeatured = false
          }

        })

        $('div.cat-0').parent('div').show()

        if (changeFeatured) {
          var firstCardShownElm = $('div.posts-container > div:visible').first()
          var firstCardClone = firstCardShownElm.children('div')
          var featureCardClone = $('div.feature-post-container').children('div')

          firstCardClone.addClass('featured-post')
          featureCardClone.removeClass('featured-post')

          $('div.feature-post-container').append(firstCardClone)
          firstCardShownElm.append(featureCardClone)
          firstCardShownElm.hide()
        }
      }

      $(document).ready(function ($) {
        var isFirstClick = 0

        $('.nav-block-common').on('click', function () {
          if (!isFirstClick++) {
            $('div.nav-block-common').toggleClass('active')
          }

          $(this).toggleClass('active')
          filterCategory()
        })

        $('.card__share > a').on('click', function (e) {
          e.preventDefault() // prevent default action - hash doesn't appear in url
          $(this).parent().find('div').toggleClass('card__social--active')
          $(this).toggleClass('share-expanded')
        })

      })
    </script>
@endpush