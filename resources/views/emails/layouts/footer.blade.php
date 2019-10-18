<table border="0" cellpadding="0" cellspacing="0"
       style="width: 100%; height: 228px; background-color: #414745; font-family: sans-serif">
    <tr>
        <td height="32"></td>
    </tr>
    <tr>
        <td style="text-align: center;" align="center">
            <table border="0" cellpadding="0" cellspacing="0" style="padding:0;margin:0;display: inline-block"
                   align="center">
                <tr align="center">
                    <td>
                        <a href="{{config('socials.linkedin')}}">
                            <img style="border:none;" src="{{ asset('img/email/linkedin-white@2x.png') }}"
                                 alt="LinkedIn" width="32" height="32">
                        </a>
                    </td>
                    <td style="width: 24px" width="24px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </td> {{-- &nbsp; for Outlook 2010 and 2017 --}}
                    <td>
                        <a href="{{config('socials.facebook')}}">
                            <img style="border:none;" src="{{ asset('img/email/facebook-white@2x.png') }}"
                                 alt="Facebook" width="32" height="32">
                        </a>
                    </td>
                    <td style="width: 24px" width="24px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </td> {{-- &nbsp; for Outlook 2010 and 2017 --}}
                    <td>
                        <a href="{{config('socials.instagram')}}">
                            <img style="border:none;" src="{{ asset('img/email/instagram-white@2x.png') }}"
                                 alt="Instagram" width="32" height="32">
                        </a>
                    </td>
                    <td style="width: 24px" width="24px">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </td> {{-- &nbsp; for Outlook 2010 and 2017 --}}
                    <td>
                        <a href="{{config('socials.twitter')}}">
                            <img style="border:none;" src="{{ asset('img/email/twitter@2x.png') }}" alt="Twitter"
                                 width="32" height="32">
                        </a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td height="32"></td>
    </tr>
    <tr>
        <td style="text-align: center">
            <a href="{{ route('profile_edit') }}" style="color: #fff; font-family: sans-serif; line-height: 1.71">Manage
                Notifications</a>
        </td>
    </tr>
    <tr>
        <td height="8"></td>
    </tr>
    <tr>
        <td style="text-align: center;line-height: 1.71;color: #ffffff;">
            <p style="color: #ffffff;">
                © {{date('Y')}} OnePitch<br>
                702 Ash St #100, San Diego, CA 92101
            </p>
            <a href="mailto:{{config('mail.from.address')}}" style="color: #fff">{{config('mail.from.address')}}</a>
            <p style="color: #fff">{{ config('contact_information.phone') }}</p>
        </td>
    </tr>
    <tr>
        <td height="28"></td>
    </tr>
</table>