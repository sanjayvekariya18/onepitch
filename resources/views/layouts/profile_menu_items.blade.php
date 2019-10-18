@if(Auth::check())
    <a href="{{route('profile')}}">View Profile</a>
    <a href="{{ route('profile_edit') }}">Edit Profile</a>
    <a href="{{route('logout')}}">Sign Out</a>
@else
    <a href="{{route('login')}}">Sign In</a>
    <a href="{{route('signup_select_role')}}">Sign Me Up</a>
@endif