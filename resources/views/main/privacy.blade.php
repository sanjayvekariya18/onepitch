@extends('layouts.landing', [
    'with_header' => true,
])

@section('title', 'Privacy Policy - OnePitch')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
<div class="faq_page terms_page">
    <div class="page_header">
        <div class="page_title">
            Privacy Policy
        </div>
        <div class="line_separator"></div>
    </div>
    <div class="page_content">
        <div class="text_section no_border">
            <div class="section_body">
                <div class="section_body_title">
                    Introduction
                </div>
                <div class="section_body_text">
                    OnePitch LLC, a Delaware limited liability company doing business in California (<strong>"Company," "we,"</strong> or <strong>“us”</strong>) respects your privacy and is committed to protecting it through our compliance with this policy.
                    <br>
                    <br>
                    This policy (“Policy”) describes the types of information we may collect from you or that you may provide when you visit the website <a href="{{config('mail.site')}}">{{config('mail.site')}}</a> (our "Website") and our practices for collecting, using, maintaining, protecting and disclosing that information.
                </div>
                <div class="section_body_title">
                    This policy applies to information we collect:
                </div>
                <div class="section_body_text">
                    <ul>
                        <li>On this Website.</li>
                        <li>In e-mail, text and other electronic exchanges between you and this Website.</li>
                    </ul>
                </div>
                <div class="section_body_title">
                    It does not apply to information collected by:
                </div>
                <div class="section_body_text">
                    <ul>
                        <li>Us offline or through any other means, including on any other website operated by the Company or any third party (including our affiliates and subsidiaries); or </li>
                        <li>Any third party (including our affiliates and subsidiaries), including through any application or content (including advertising) that may link to or be accessible from, or on, the Website.</li>
                    </ul>
                    <br>
                    Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, your only choice is to refrain from using our Website. By accessing or using this Website, you agree to this Policy. This Policy may change from time to time. Your continued use of this Website after we make changes is deemed to be your acceptance of those changes, so please check the Policy periodically for updates.
                </div>
                <div class="section_body_title">
                    Children Under the Age of 13
                </div>
                <div class="section_body_text">
                    Our Website is not intended for children under 13 years of age. No one under the age of 13 may provide any personal information to, or on, the Website. We do not knowingly collect personal information from children under 13. If you are under 13, do not use or provide any information on this Website, or on or through any of its features/functionality, make any purchases through the Website, use any of the interactive or public comment features that may be available on this Website, or provide any information about yourself to us, including your name, address, telephone number, e-mail address or any screen name or user name you may use. 
                    <br>
                    <br>
                    If we learn that we have collected or received personal information from a child under 13 without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 13, please contact us at <a href="mailto:{{config('mail.from.address')}}">{{config('mail.from.address')}}</a>.
                </div>
                <div class="section_body_title">
                    Information We Collect About You and How We Collect It
                </div>
                <div class="section_body_text">
                    We collect several types of information from and about users of our Website, including information:
                    <br>
                    <ul>
                        <li>By which you may be personally identified, such as first and last name, e-mail address and image (if uploaded) (<strong>"personal information"</strong>);</li>
                        <li>That is about you but individually does not identify you, such as your company or outlet name and a password created by you; and/or</li>
                        <li>About your Internet connection, the equipment you use to access our Website, and usage details.</li>
                    </ul>
                    We collect this information:
                    <br>
                    <ul>
                        <li>When you directly provide it to us.</li>
                        <li>Automatically as you navigate through the site. Information collected automatically may include usage details, IP addresses and information collected through cookies, web beacons, and other tracking technologies.</li>
                        <li>From your account creation.</li>
                    </ul>
                </div>
                <div class="section_body_title">
                    Information You Provide to Us. 
                </div>
                <div class="section_body_text">
                    The information we collect on or through our Website may include:
                    <br>
                    <ul>
                        <li>Information that you provide by filling in forms on our Website. This includes information provided at the time of creating an account with us. We may also ask you for information when you enter into our referral sweepstakes and when you report a problem with our Website.</li>
                        <li>Records and copies of your correspondence (including e-mail addresses), if you contact us.</li>
                    </ul>
                    <br>
                    You also may provide information to be published or displayed (hereinafter, <strong>"posted"</strong>) on public areas of the Website, or transmitted to other users of the Website or third parties (collectively, <strong>"User Contributions"</strong>). Your User Contributions are posted on and transmitted to others at your own risk. Please be aware that no security measures are perfect or impenetrable. Additionally, we cannot control the actions of other users of the Website with whom you may choose to share information. Therefore, we cannot and do not guarantee that your information will not be viewed by unauthorized persons if you choose to share this information publicly or with other Users.
                </div>
                <div class="section_body_title">
                    Information We Collect Through Automatic Data Collection Technologies. 
                </div>
                <div class="section_body_text">
                    As you navigate through and interact with our Website, we may use automatic data collection technologies to collect certain information about your equipment, browsing actions and patterns, including:
                    <br>
                    <ul>
                        <li>Details of your visits to our Website, including traffic data, location data, logs and other communication data, and the resources that you access and use on the Website.</li>
                        <li>Information about your computer and Internet connection, including your IP address, operating system and browser type.</li>
                    </ul>
                    <br>
                    The information we collect automatically is statistical data and does not include personal information, but we may maintain it or associate it with personal information we collect in other ways or receive from third parties. It helps us to determine referrals, improve our Website and to deliver a better and more personalized service, including by enabling us to:
                    <ul>
                        <li>Confirm your entry into any referral sweepstakes using your referral code (if applicable). </li>
                        <li>Estimate our audience size and usage patterns.</li>
                        <li>Store information about your preferences, allowing us to customize our Website according to your individual interests.</li>
                        <li>Recognize you when you return to our Website.</li>
                        <li>Recognize when a user saves specific information to their profile.</li>
                        <li>Recognize when a user contacts another user through their profile.</li>

                    </ul>
                    <br>
                    The technologies we use for this automatic data collection may include:
                    <ul>
                        <li><strong>Cookies (or browser cookies).</strong> A cookie is a small file placed on the hard drive of your computer. You may refuse to accept browser cookies by activating the appropriate setting on your browser. However, if you select this setting you may be unable to access certain parts of our Website. Unless you have adjusted your browser setting so that it will refuse cookies, our system will issue cookies when you direct your browser to our Website. </li>
                        <li><strong>Flash Cookies.</strong> Certain features of our Website may use local stored objects (or Flash cookies) to collect and store information about your preferences and navigation to, from and on our Website. Flash cookies are not managed by the same browser settings as are used for browser cookies. For information about managing your privacy and security settings for Flash cookies, see Choices about How We Use and Disclose Your Information below.</li>
                        <li><strong>Web Beacons.</strong> Pages of our Website [and our e-mails] may contain small electronic files known as web beacons (also referred to as clear gifs. pixel tags and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or [opened an e-mail] and for other related website statistics (for example, recording the popularity of certain website content and verifying system and server integrity). </li>
                    </ul>
                </div>
                <div class="section_body_title">
                    Third-party Use of Cookies and Other Tracking Technologies.
                </div>
                <div class="section_body_text">
                    Some content or applications, including advertisements, on the Website are served by third parties, including advertisers, ad networks and servers, content providers and application providers. These third parties may use cookies (alone or in conjunction with web beacons or other tracking technologies) to collect information about you when you use our website. The information they collect may be associated with your personal information or they may collect information, including personal information, about your online activities over time and across different websites and other online services. They may use this information to provide you with interest-based (behavioral) advertising or other targeted content. 
                    <br>
                    <br>
                    We do not control these third parties' tracking technologies or how they may be used. If you have any questions about an advertisement or other targeted content, you should contact the responsible provider directly. 
                </div>
                <div class="section_body_title">
                    How We Use Your Information
                </div>
                <div class="section_body_text">
                    We use information that we collect about you or that you provide to us, including any personal information:
                    <ul>
                        <li>To present our Website and its contents to you.</li>
                        <li>To provide you with information, products, or services that you request from us.</li>
                        <li>To provide you with notices about your subscription, including expiration and renewal notices.</li>
                        <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for pitch collection and response.</li>
                        <li>To notify you about changes to our Website or any products or services we offer or provide though it.</li>
                        <li>To allow you to participate in interactive features on our Website.</li>
                        <li>In any other way we may describe when you provide the information.</li>
                        <li>To fulfill any other purpose for which you provide it.</li>
                        <li>For any other purpose with your consent.</li>
                    </ul>
                </div>
                <div class="section_body_title">
                    Disclosure of Your Information
                </div>
                <div class="section_body_text">
                    We will <strong>not</strong> disclose your personal information other than as described below.
                    <br>
                    <br>
                    We may disclose <strong>aggregated, anonymized</strong>, and/or <strong>non-identifying</strong> information about our users without restriction. 
                    <br>
                    <br>
                    We may disclose personal information that we collect or that you provide:
                    <ul>
                        <li>To our subsidiaries and affiliates.</li>
                        <li>To contractors, service providers and other third parties we use to support our business and who are bound by contractual obligations to keep personal information confidential and use it only for the purposes for which we disclose it to them.</li>
                        <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution or other sale or transfer of some or all of OnePitch's assets, whether as a going concern or as part of bankruptcy, liquidation or similar proceeding, in which personal information held by OnePitch about our Website users is among the assets transferred.</li>
                        <li>To fulfill the purpose for which you provide it. For example, if you give us an e-mail address to subscribe to our newsletter.</li>
                        <li>For any other purpose disclosed by us when you provide the information.</li>
                        <li>With your consent.</li>
                    </ul>
                    <br>
                    We may also disclose your personal information:
                    <ul>
                        <li>To comply with any court order, law or legal process, including to respond to any government or regulatory request.</li>
                        <li>To enforce or apply our Terms of Use: <a href="{{route('terms')}}">{{route('terms')}}</a> and other agreements, including for billing and collection purposes.</li>
                        <li>If we believe disclosure is necessary or appropriate to protect the rights, property, or safety of OnePitch, our customers, or others. This may include exchanging information with other companies and organizations for the purposes of fraud protection and credit risk reduction.</li>
                    </ul>
                </div>
                <div class="section_body_title">
                    Choices About How We Use and Disclose Your Information
                </div>
                <div class="section_body_text">
                    We strive to provide you with choices regarding the personal information you provide to us. The following mechanisms should help to provide you with control over your information:
                    <ul>
                        <li><strong>Tracking Technologies and Advertising.</strong> You can set your browser to refuse all or some browser cookies, or to alert you when cookies are being sent. To learn how you can manage your Flash cookie settings, visit the Flash player settings page on Adobe's website. If you disable or refuse cookies, please note that some parts of this site may then be inaccessible or not function properly.</li>
                        <li><strong>Promotional Offers from the Company.</strong> If you do not wish to have your e-mail address and/or contact information used by the Company to promote our own or third parties' products or services, you can opt-out by notifying us at <a href="mailto:{{config('mail.from.address')}}">{{config('mail.from.address')}}</a> or at any other time by logging into the Website and adjusting your user preferences in your account profile by checking or unchecking the relevant boxes or by sending us an e-mail stating your request to <a href="mailto:{{config('mail.from.address')}}">{{config('mail.from.address')}}</a>. If we have sent you a promotional e-mail, you may send us a return e-mail asking to be omitted from future e-mail distributions. </li>
                    </ul>
                    <br>
                    We do not control third parties' collection or use of your information to serve interest-based advertising. However, these third parties may provide you with ways to choose not to have your information collected or used in this way. You can opt out of receiving targeted ads from members of the Network Advertising Initiative ("NAI") on the <a href="{{config('mail.site')}}">NAI's website</a>.
                </div>
                <div class="section_body_title">
                    Accessing and Correcting Your Information
                </div>
                <div class="section_body_text">
                    You can review and change your personal information by logging into the Website and visiting your account profile page.
                    <br>
                    <br>
                    You may also send us an e-mail at <a href="mailto:{{config('mail.from.address')}}">{{config('mail.from.address')}}</a> to request access to, correct or delete any personal information that you have provided to us. We cannot delete your personal information except by also deleting your user account. We may not accommodate a request to change information if we believe the change would violate any law or legal requirement, or cause the information to be incorrect.
                </div>
                <div class="section_body_title">
                    California Users
                </div>
                <div class="section_body_text">
                    If you are a California resident, you have the right to request information from us regarding the manner in which we share certain categories of your personal information with third parties for their own direct marketing uses. California law provides that you have the right to submit a request to us at our email address in order to receive information on the categories of customer information that we shared and the names and addresses of those businesses with which we shared customer information for the immediately prior calendar year. To obtain this information, please send an email message to <a href="mailto:{{config('mail.from.address')}}">{{config('mail.from.address')}}</a> with "Request for California Privacy Information" in the subject line and in the body of your message. We will provide the requested information to you in your email address in response.
                    <br>
                    <br>
                    Please be aware that not all information sharing is covered by the "Shine the Light" requirements, and only information on covered sharing will be included in our response.
                </div>
                <div class="section_body_title">
                    Notice to Users from the European Economic Area (“EEA”)
                </div>
                <div class="section_body_text">
                    If you are visiting and using the Services from the European Economic Area (“EEA”), please be aware that you are sending information (including personal data) to the United States where our partner platform’s servers are located. Our staff operating outside the EEA may process this information. The information may then be transferred within the United States or back out of the United States to other countries outside of your country of residence, depending on the type of information and how we store it. These countries (including the United States) may not necessarily have data protection laws as comprehensive or protective as those in your country of residence; however, our collection, storage and use of your personal data will at all times continue to be governed by this Privacy Policy. 
                    <br>
                    <br>
                    BY SUPPLYING YOUR PERSONAL INFORMATION TO US YOU EXPRESSLY AGREE TO THE TRANSFER OF YOUR PERSONAL INFORMATION OUT OF THE EEA, AND TO THE PROCESSING OF YOUR INFORMATION IN THE U.S., SUBJECT TO THIS PRIVACY POLICY.
                </div>
                <div class="section_body_title">
                    Changes to Our Privacy Policy
                </div>
                <div class="section_body_text">
                    It is our policy to post any changes we make to our Privacy Policy on this page with a notice that the Privacy Policy has been updated on the Website home page. If we make material changes to how we treat our users' personal information, we will notify you by e-mail to the primary e-mail address specified in your account and/or through a notice on the Website home page. The date the Privacy Policy was last revised is identified at the top of the page. You are responsible for ensuring we have an up-to-date active and deliverable e-mail address for you, and for periodically visiting our Website and this privacy policy to check for any changes.
                </div>
                <div class="section_body_title">
                    Contact Information
                </div>
                <div class="section_body_text">
                    To ask questions or comment about this Privacy Policy and our privacy practices, contact us at: <a href="mailto:{{config('mail.from.address')}}">{{config('mail.from.address')}}</a>.
                </div>
            </div>
            <div class="arrow_to_top" onClick="common.scrollTo()">
                <div class="arrow_wrap">
                    <div class="arrow_up"></div>
                    <div class="arrow_stick"></div>
                </div>
                TOP
            </div>
        </div>
    </div>
</div>
@endsection