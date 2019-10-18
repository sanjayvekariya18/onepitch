@if(Auth::check())
    <a href="{{route('profile')}}">View Profile</a>
    <a href="{{ route('profile_edit') }}">Edit Profile</a>
    @if(Auth::user()->role == App\Models\User::ROLE_PUBLICIST)
        <a href="{{route('pitch_what', ['pitch_id' => 'create'])}}">Create Pitch</a>
        <a href="{{ route('publicist_interests') }}">Subscribe to Inquiry</a>
        <a href="javascript:common.openBrandModal()">Add New Brand</a>
        <a href="{{ route('social_listening_dashboard') }}">Social Listening Dashboard</a>
    @endif
    @if(Auth::user()->role == App\Models\User::ROLE_JOURNALIST)
        <a href="{{ route('journalist_interests') }}">Subscribe to Pitches</a>
        <a href="{{ route('publicist_brands') }}">Brand Index</a>
        <a href="{{route('inquiry_what', ['inquiry_id' => 'create'])}}">Create Inquiry</a>
    @endif
    <a href="{{route('logout')}}">Sign Out</a>
@else
    <a href="{{route('login')}}">Sign In</a>
    <a href="{{route('signup_select_role')}}">Sign Me Up</a>
@endif