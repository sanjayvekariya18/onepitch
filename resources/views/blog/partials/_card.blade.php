<div class="card radius shadowDepth1">
    <div class="card__image border-tlr-radius">
        <a href="/blog/{{ $post->link }}">
            <img src="{{ $post->featured_image }}" alt="image"
                 class="border-tlr-radius">
        </a>
    </div>

    <div class="card__content card__padding">
        <div class="card__share">
            <div class="card__social">
                <a class="share-icon twitter" target="_blank"
                   href="https://twitter.com/intent/tweet?url={{ rawurlencode(Request::url()) }}/{{ rawurlencode($post->link) }}&text={{ rawurlencode($post->title) }}"><i
                            class="fab fa-twitter"></i></a>
                <a class="share-icon linkedin" target="_blank"
                   href="https://www.linkedin.com/shareArticle?mini=true&url={{ rawurlencode(Request::url()) }}/{{ rawurlencode($post->link) }}&title={{ rawurlencode($post->title) }}"><span
                            class="fab fa-linkedin-in"></span></a>
                <a class="share-icon facebook" target="_blank"
                   href="https://www.facebook.com/sharer/sharer.php?u={{ rawurlencode(Request::url()) }}/{{ rawurlencode($post->link) }}"><span
                            class="fab fa-facebook-f"></span></a>
            </div>

            <a class="fas share-toggle share-icon" href="#"> </a>
        </div>

        <div class="card__meta">
            <span>
                @foreach($post->blog_post_categories as $category)
                    {{ $loop->first ? '' : ', ' }}
                    {{$category->category->name}}
                @endforeach
            </span>
            <time>
                {{ $post->published_at->toFormattedDateString() }}
            </time>
        </div>

        <article class="card__article">
            <h2>
                <a href="/blog/{{ $post->link }}">{{ $post->title }}</a>
            </h2>
            <p>{{ $post->excerpt }}</p>
        </article>
    </div>

    <div class="card__action">
        <div class="card__author">
            @if($post->user_id == 35)
                <img src="/img/blog/cassie.jpg" alt="Cassie Gonzalez">
                <div class="card__author-content">
                    By Cassie Gonzalez
                </div>
            @elseif($post->user_id == 22)
                <img src="/img/blog/jered.jpg" alt="Jered Martin">
                <div class="card__author-content">
                    By Jered Martin
                </div>
            @elseif($post->user_id == 491)
                <img src="/img/blog/mike.jpg" alt="Mike Melvin">
                <div class="card__author-content">
                    By Mike Melvin
                </div>
            @elseif($post->user_id == 890)
                <img src="/img/blog/jesse.jpg" alt="Jesse Ghiorzi">
                <div class="card__author-content">
                    By Jesse Ghiorzi
                </div>
            @elseif($post->user_id == 1)
                <img src="/img/blog/typewriter.png" alt="OnePitch Team">
                <div class="card__author-content">
                    By OnePitch Team
                </div>
            @elseif($post->user_id == 1851)
                <img src="/img/blog/kendall.jpg" alt="Kendall Aldridge">
                <div class="card__author-content">
                    By Kendall Aldridge
                </div>
            @elseif($post->user_id == 1892)
                <img src="/img/blog/stephen-karaolis.jpg" alt="Stephen Karaolis">
                <div class="card__author-content">
                    By Stephen Karaolis
                </div>
            @elseif($post->user_id == 2056)
                <img src="/img/blog/darcy-cudmore.jpg" alt="Darcy Cudmore">
                <div class="card__author-content">
                    By Darcy Cudmore
                </div>
            @elseif($post->user_id == 2147)
                <img src="/img/blog/big-kayla-perkins.jpg" alt="Kayla Perkins">
                <div class="card__author-content">
                    By Kayla Perkins
                </div>
            @endif
        </div>
    </div>
</div>