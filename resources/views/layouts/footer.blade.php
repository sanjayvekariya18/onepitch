<footer class="page-footer">
    @stack('footer.top')
            <div class="row">
                <div class="col-md-2">
                    <a href="{{route('home')}}">
                        {{ HTML::image('img/one-pitch-logo-medium.svg', null, ['class' => 'footer-logo desktop']) }}
                    </a>
                </div>
                <div class="col-md-8">
                    <ul class="footer-links">
                        <li><a href="{{route('blog.index')}}">Blog</a></li>
                        <li><a href="{{route('service_all_topics')}}">Topics</a></li>
                        <li><a href="{{route('service_all_industries')}}">Industries</a></li>
                        <li><a href="{{route('referral')}}">Refer</a></li>
                        <li class="faq-link"><a href="{{route('faq')}}">FAQ</a></li>
                        <li><a href="{{route('contact')}}">Contact</a></li>
                        <li><a href="{{route('terms')}}">Terms of Use</a></li>
                        <!--<li><a href="#">Founding Contributors</a></li>-->
                        {{--<li><a href="{{route('privacy')}}">Privacy Policy</a></li>--}}
                    </ul>
                </div>
                <div class="col-md-2">
                    <ul class="social-links">
                        <li><a target="_blank" href="{{config('socials.linkedin')}}">{{ HTML::image('img/social/linkedin.svg') }}</a></li>
{{--                        <li><a target="_blank" href="{{config('socials.facebook')}}">{{ HTML::image('img/social/facebook.svg') }}</a></li>--}}
                        <li><a target="_blank" href="{{config('socials.instagram')}}">{{ HTML::image('img/social/instagram.svg') }}</a></li>
                        <li><a target="_blank" href="{{config('socials.twitter')}}">{{ HTML::image('img/social/twitter.svg') }}</a></li>
                    </ul>
                </div>
                <a href="{{route('home')}}">
                    {{ HTML::image('img/one-pitch-logo-medium.svg', null, ['class' => 'footer-logo mobile']) }}
                </a>
            </div>
            <div class="row">
                <div class="pull-right" style="color: #737373;padding-right: 5px;">
                    Copyright {{date('Y')}} OnePitch
                </div>
            </div>

            <div class="clear"></div>
</footer>
<script>
  (function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r
    i[r] = i[r] || function () { (i[r].q = i[r].q || []).push(arguments)}

      , i[r].l = 1 * new Date()
    a = s.createElement(o),
      m = s.getElementsByTagName(o)[0]
    a.async = 1
    a.src = g
    m.parentNode.insertBefore(a, m)
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')

  ga('create', 'UA-106060689-1', 'auto')
  ga('send', 'pageview')

</script>