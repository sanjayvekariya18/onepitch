@extends('layouts.landing', [
    'with_header' => true,
])

@section('title', 'Terms Of Use - OnePitch')

@section('canonical')
    {{ URL::current() }}
@stop

@section('content')
<div class="faq_page terms_page">
    <div class="page_header">
        <div class="page_title">
            Terms of Use
        </div>
        <div class="line_separator"></div>
    </div>
    <div class="page_content">
        <div class="text_section no_border">
            <div class="section_body">
                <div class="section_body_title">
                    Acceptance of the Terms of Use
                </div>
                <div class="section_body_text">
                    This website is operated by OnePitch LLC, a Delaware limited liability company doing business in California. Throughout this Agreement we use the terms “we”, “us”, “our”, or the “Company” to refer to OnePitch. We refer to any person accessing or using this website as “You,” or the “User.” The following terms and conditions, together with any other legal agreements we reference (we call all of these the “Agreement”), govern your access to and use of <a href="{{config('mail.site')}}">{{config('mail.site')}}</a> (our "Website), whether as a guest or a registered user.
                    <br>
                    <br>
                    Please read these Terms of Use carefully before you start to use our Website. <strong>By using the Website or by clicking to accept or agree to the Terms of Use when this option is made available to you, you accept and agree to be bound and abide by these Terms of Use and our Privacy Policy, found at <a href="{{route('terms')}}">{{route('terms')}}</a> and <a href="{{route('privacy')}}">{{route('privacy')}}</a>, incorporated herein by reference</strong>. If you do not want to agree to these Terms of Use, or the Privacy Policy, your only option is to not access or use the Website. 
                    <br>
                    <br>
                    This Website is offered and available to users who are 18 years of age or older and reside in the United States or any of its territories or possessions and are a registered and approved user. By using this Website, you represent and warrant that you are of legal age to form a binding contract with the Company and meet all of the foregoing eligibility requirements. If you do not meet all of these requirements, you must not access or use the Website.
                </div>
                <div class="section_body_title">
                    Changes to the Terms of Use
                </div>
                <div class="section_body_text">
                    We may revise and update these Terms of Use from time to time in our sole discretion. All changes are effective immediately when we post them, and apply to all access to and use of the Website thereafter. However, any changes to the dispute resolution provisions set forth in <i>Governing Law and Jurisdiction</i> below will not apply to any disputes for which the parties have actual notice prior to the date the change is posted on the Website. 
                    <br>
                    <br>
                    Your continued use of the Website following the posting of revised Terms of Use means that you accept and agree to the changes. You are expected to check this page from time to time so that you are aware of any changes, as they are binding on you. A printed version of these Terms of Service and of any notices given to you in electronic form or otherwise shall be admissible in judicial or administrative proceedings based upon or relating to these Terms of Service to the same extent and subject to the same conditions as other business documents and records originally generated and maintained in printed form.
                </div>
                <div class="section_body_title">
                    Accessing the Website and Account Security
                </div>
                <div class="section_body_text">
                    We reserve the right to withdraw or amend this Website, and any service or material we provide on the Website, in our sole discretion without notice. We will not be liable if for any reason all or any part of the Website is unavailable at any time or for any period. From time to time, we may restrict access to some parts of the Website, or the entire Website, to users, including registered users.
                    <br>
                    <br>
                    You are responsible for:
                    <ul>
                        <li>Making all arrangements necessary for you to have access to the Website.</li>
                        <li>Ensuring that all persons who access the Website through your Internet connection are aware of these Terms of Use and comply with them.</li>
                    </ul>
                    <br>
                    To access the Website, or some of the resources it offers, you may be asked to provide certain registration details or other information. It is a condition of your use of the Website that all the information you provide on the Website is correct, current, and complete. You agree that all information you provide to register with this Website or otherwise, including but not limited to through the use of any interactive features on the Website, is governed by our Privacy Policy <a href="{{route('privacy')}}">{{route('privacy')}}</a>, and you consent to all actions we take with respect to your information consistent with our Privacy Policy.
                    <br>
                    <br>
                    If you choose, or are provided with, a user name, password, or any other piece of information as part of our security procedures, you must treat such information as confidential, and you must not disclose it to any other person or entity. You also acknowledge that your account is personal to you and agree not to provide any other person with access to this Website or portions of it using your user name, password or other security information. You agree to notify us immediately of any unauthorized access to or use of your username or password or any other breach of security. You also agree to ensure that you exit from your account at the end of each session. You should use particular caution when accessing your account from a public or shared computer so that others are not able to view or record your password or other personal information.
                    <br>
                    <br>
                    We have the right to disable any username, password or other identifier, whether chosen by you or provided by us, at any time in our sole discretion for any or no reason, including if, in our opinion, you have violated any provision of these Terms of Use.
                </div>
                <div class="section_body_title">
                    Intellectual Property Rights
                </div>
                <div class="section_body_text">
                    The Website and its entire contents, features and functionality (including but not limited to all information, software, text, displays, images, video and audio, and the design, selection and arrangement thereof, collectively the “Content”), are owned by the Company, its licensors or other providers of such material, and are protected by United States and international copyright, trademark, patent, trade secret and other intellectual property or proprietary rights laws.
                    <br>
                    <br>
                    These Terms of Use grant you a limited, revocable, non-transferable, and non-exclusive license to use the Website for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store or transmit any of the material on our Website, except as follows:
                    <ul>
                        <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials.</li>
                        <li>You may store files that are automatically cached by your web browser for display enhancement purposes.</li>
                        <li>You may print or download one copy of a reasonable number of pages of the Website for your own personal, non-commercial use and not for further reproduction, publication or distribution.</li>
                        <li>If we provide social media features in connection with certain content, you may take such actions as are enabled by such features.</li>
                    </ul>
                    <br>
                    You must <strong>not</strong>:
                    <ul>
                        <li>Modify copies of any materials from this site.</li>
                        <li>Use any illustrations, photographs, video or audio sequences or any graphics separately from the accompanying text.</li>
                        <li>Delete or alter any copyright, trademark or other proprietary rights notices from copies of materials from this site.</li>
                        <li>Decompile, reverse engineer, reverse assemble, decipher or otherwise attempt to discover any programming code or any source code used in or with the Content, or otherwise distribute in any way the Content other than as specifically permitted in this Agreement.</li>
                        <li>Access, or use, for any commercial purposes, any part of the Website or any services or materials available through the Website. </li>
                    </ul>
                    <br>
                    If you wish to make any use of material on the Website other than that set out in this section, please address your request to: <a href="mailto:{{config('mail.from.address')}}">{{config('mail.from.address')}}</a>.
                    <br>
                    <br>
                    If you print, copy, modify, download or otherwise use or provide any other person with access to any part of the Website in breach of the Terms of Use, your right to use the Website will cease immediately and you must, at our option, return or destroy any copies of the materials you have made. No right, title or interest in or to the Website or any content on the Website is transferred to you, and all rights not expressly granted are reserved by OnePitch. Any use of the Website not expressly permitted by these Terms of Use is a breach of these Terms and may violate copyright, trademark and other laws.
                </div>
                <div class="section_body_title">
                    Email Correspondence
                </div>
                <div class="section_body_text">
                    Emails sent to any <a href="mailto:{{config('mail.from.address')}}">{{config('mail.from.address')}}</a> email address are considered our property. You can read more about this in our Privacy Policy <a href="{{route('privacy')}}">{{route('privacy')}}</a>. If you wish to remain anonymous, please specify this in the body of the email itself and we will do our best to respect your wishes.
                </div>
                <div class="section_body_title">
                    Trademarks
                </div>
                <div class="section_body_text">
                    The Company name, the terms, and all related names, logos, product and service names, designs and slogans are trademarks of the Company or its affiliates or licensors. You must not use such marks without the prior written permission of the Company. All other names, logos, product and service names, designs and slogans on this Website are the trademarks of their respective owners.
                </div>
                <div class="section_body_title">
                    Prohibited Uses
                </div>
                <div class="section_body_text">
                    You may use the Website only for lawful purposes and in accordance with these Terms of Use. You agree not to use the Website:
                    <ul>
                        <li>In any way that violates any applicable federal, state, local or international law or regulation (including, without limitation, any laws regarding the export of data or software to and from the US or other countries). </li>
                        <li>For the purpose of exploiting, harming or attempting to exploit or harm minors in any way by exposing them to inappropriate content, asking for personally identifiable information or otherwise.</li>
                        <li>To send, knowingly receive, upload, download, use or re-use any material, which does not comply with the Content Standards set out below.</li>
                        <li>To transmit, or procure the sending of, any advertising or promotional material, without our prior written consent, including any "junk mail", "chain letter" or "spam" or any other similar solicitation.</li>
                        <li>To impersonate or attempt to impersonate the Company, a Company employee, another user or any other person or entity (including, without limitation, by using e-mail addresses or screen names associated with any of the foregoing).</li>
                        <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Website, or which, as determined by us, may harm the Company or users of the Website or expose them to liability.</li>
                    </ul>
                    <br>
                    Additionally, you agree not to:
                    <ul>
                        <li>Use the Website in any manner that could disable, overburden, damage, or impair the site or interfere with any other party's use of the Website, including their ability to engage in real time activities through the Website.</li>
                        <li>Use any robot, spider or other automatic device, process or means to access the Website for any purpose, including monitoring or copying any of the material on the Website.</li>
                        <li>Use any manual process to monitor or copy any of the material on the Website or for any other unauthorized purpose without our prior written consent.</li>
                        <li>Use any device, software or routine that interferes with the proper working of the Website.</li>
                        <li>Introduce any viruses, trojan horses, worms, logic bombs or other material which is malicious or technologically harmful.</li>
                        <li>Attempt to gain unauthorized access to, interfere with, damage or disrupt any parts of the Website, the server on which the Website is stored, or any server, computer or database connected to the Website. </li>
                        <li>Attack the Website via a denial-of-service attack or a distributed denial-of-service attack.</li>
                        <li>Otherwise attempt to interfere with the proper working of the Website.</li>
                    </ul>
                </div>
                <div class="section_body_title">
                    User Contributions
                </div>
                <div class="section_body_text">
                    The Website may contain profiles and other interactive features (collectively, <strong>"Interactive Services"</strong>) that allow users to <strong>post</strong>, submit, publish, display or transmit to other users or other persons (hereinafter, "post") content or materials (collectively, <strong>"User Contributions"</strong>) on or through the Website.
                    <br>
                    <br>
                    All User Contributions must comply with the Content Standards set out in these Terms of Use.
                    <br>
                    <br>
                    Any User Contribution you post to the site will be considered non-confidential and non-proprietary. By providing any User Contribution on the Website, you grant us and our affiliates and service providers, and each of their and our respective licensees, successors and assigns the right to use, reproduce, modify, perform, display, distribute and otherwise disclose to third parties any such material royalty-free for any purpose, or according to your account settings. 
                    <br>
                    <br>
                    You represent and warrant that: 
                    <ul>
                        <li>You own or control all rights in and to the User Contributions and have the right to grant the license granted above to us and our affiliates and service providers, and each of their and our respective licensees, successors and assigns.</li>
                        <li>All of your User Contributions do and will comply with these Terms of Use.</li>
                    </ul>
                    <br>
                    You understand and acknowledge that you are responsible for any User Contributions you submit or contribute, and you, not the Company, take full responsibility for such content, including its legality, reliability, accuracy and appropriateness.
                    <br>
                    <br>
                    We are not responsible, or liable to any third party, for the content or accuracy of any User Contributions posted by you or any other user of the Website. 
                </div>
                <div class="section_body_title">
                    Monitoring and Enforcement; Termination
                </div>
                <div class="section_body_text">
                    We have the right to:
                    <ul>
                        <li>Remove or refuse to post any User Contributions for any or no reason in our sole discretion.</li>
                        <li>Take any action with respect to any User Contribution that we deem necessary or appropriate in our sole discretion, including if we believe that such User Contribution violates the Terms of Use, including the Content Standards, infringes any intellectual property right or other right of any person or entity, threatens the personal safety of users of the Website or the public or could create liability for the Company.</li>
                        <li>Disclose your identity or other information about you to any third party who claims that material posted by you violates their rights, including their intellectual property rights or their right to privacy.</li>
                        <li>Take appropriate legal action, including without limitation, referral to law enforcement, for any illegal or unauthorized use of the Website. </li>
                        <li>Terminate or suspend your access to all or part of the Website for any or no reason, including without limitation, any violation of these Terms of Use.</li>
                    </ul>
                    <br>
                    Without limiting the foregoing, we have the right to fully cooperate with any law enforcement authorities or court order requesting or directing us to disclose the identity or other information of anyone posting any materials on or through the Website. YOU WAIVE AND HOLD HARMLESS THE COMPANY AND ITS AFFILIATES, LICENSEES AND SERVICE PROVIDERS FROM ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY THE COMPANY AND/OR ANY OF THE FOREGOING PARTIES DURING OR AS A RESULT OF ITS INVESTIGATIONS AND FROM ANY ACTIONS TAKEN AS A CONSEQUENCE OF INVESTIGATIONS BY EITHER THE COMPANY OR SUCH PARTIES OR LAW ENFORCEMENT AUTHORITIES.
                    <br>
                    <br>
                    However, we do not undertake to review all material before it is posted on the Website, and cannot ensure prompt removal of objectionable material after it has been posted. Accordingly, we assume no liability for any action or inaction regarding transmissions, communications or content provided by any user or third party. We have no liability or responsibility to anyone for performance or nonperformance of the activities described in this section. 
                </div>
                <div class="section_body_title">
                    Content Standards
                </div>
                <div class="section_body_text">
                    These content standards apply to any and all User Contributions and use of Interactive Services. User Contributions must in their entirety comply with all applicable federal, state, local and international laws and regulations. Without limiting the foregoing, User Contributions must not:
                    <ul>
                        <li>Contain any material, which is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory or otherwise objectionable.</li>
                        <li>Promote sexually explicit or pornographic material, violence, or discrimination based on race, sex, religion, nationality, disability, sexual orientation or age.</li>
                        <li>Infringe any patent, trademark, trade secret, copyright or other intellectual property or other rights of any other person.</li>
                        <li>Violate the legal rights (including the rights of publicity and privacy) of others or contain any material that could give rise to any civil or criminal liability under applicable laws or regulations or that otherwise may be in conflict with these Terms of Use and our Privacy Policy <a href="{{route('terms')}}">{{route('terms')}}</a> <a href="{{route('privacy')}}">{{route('privacy')}}</a>.</li>
                        <li>Be likely to deceive any person.</li>
                        <li>Promote any illegal activity, or advocate, promote or assist any unlawful act.</li>
                        <li>Cause annoyance, inconvenience, bullying, or needless anxiety or be likely to upset, embarrass, alarm or annoy any other person.</li>
                        <li>Impersonate any person, or misrepresent your identity or affiliation with any person or organization. </li>
                        <li>Involve commercial activities or sales, such as contests, sweepstakes and other sales promotions, barter or advertising.</li>
                        <li>Give the impression that they emanate from or are endorsed by us or any other person or entity, if this is not the case.</li>
                    </ul>
                </div>
                <div class="section_body_title">
                    Image and Video
                </div>
                <div class="section_body_text">
                    We may display images, audio, and video (the “Material”) on the Website from time to time. The types of Material Users are authorized to access on the Site includes Material commissioned by the Company, embedded Material, Material we believe to be covered by the Fair Use Doctrine, Material from photographic archive and video vendors, and Material supplied to our staff or released into the public domain by public relations and marketing companies for press purposes.
                </div>
                <div class="section_body_title">
                    Copyright Infringement Notices
                </div>
                <div class="section_body_text">
                    In accordance with the Digital Millennium Copyright Act (“DMCA”), we will remove any Content if properly notified that such Content infringes on your intellectual property rights. We reserve the right, at our sole discretion, to remove any Content without prior notice.
                    <br>
                    <br>
                    If we publish or are hosting Content that you think infringes your copyright, please email us at <a href="mailto:{{config('mail.from.address')}}">{{config('mail.from.address')}}</a> and we will address your concerns. 
                    <br>
                    <br>
                    If the Content falls into one of the categories listed above under Image and Video, we believe that our use is legitimate and we may not remove it from the site. If you have corresponded with the Company directly, and thereafter choose to pursue a copyright notice, please note that we will respond only to notices of alleged infringement that comply with the DMCA. The text of the Act can be found at the <a href="{{config('mail.site')}}">U.S. Copyright Office Web Site</a>.
                    <br>
                    <br>
                    To file a notice of infringement with us, you must provide a written communication by email to <a href="mailto:{{config('mail.from.address')}}">{{config('mail.from.address')}}</a> with an attached and signed PDF that sets forth the items specified below. If we do not respond in 10 business days, please write again – high email volume and spam means we sometimes miss emails.
                    <br>
                    <br>
                    To enable us to address your concerns quickly and efficiently, please provide the following information in your notice email:
                    <ul>
                        <li>For each alleged infringement that you wish to have removed, please provide the exact URL for the page containing the Material.</li>
                        <li>Provide information reasonably sufficient to permit us to contact you - an email address and/or telephone number is preferred.</li>
                        <li>
                            For images, provide the following to substantiate your claim to ownership of the copyright in the allegedly infringing image:
                            <ul>
                                <li>Proof of copyright in the image concerned, namely proof of copyright registration of the Image, or, absent such registration, a detailed description of the image – where it was taken, by whom, who or what the subject of the image is, and evidence to support your claim that you own the copyright. We may not comply with requests to remove an image if you cannot prove that you own the copyright in the image in question.</li>
                                <li>Include the following statement: “I swear, under penalty of perjury, that the information in the notification is accurate and that I am the copyright owner or am authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.”</li>
                            </ul>
                        </li>
                        <li>Sign the document (physically or electronically) and email it to <a href="mailto:{{config('mail.from.address')}}">{{config('mail.from.address')}}</a></li>
                    </ul>
                    <br>
                    You acknowledge that if you fail to comply with all of the requirements of this section, your DMCA notice may not be valid and we will have no obligation to respond or acknowledge receipt of your notice. Please note that you will be liable for damages (including costs and attorneys’ fees) if you materially misrepresent that any material on OnePitch infringes your copyrights. 
                </div>
                <div class="section_body_title">
                    Reliance on Information Posted
                </div>
                <div class="section_body_text">
                    The information presented on or through the Website is made available solely for general information purposes. We do not warrant the accuracy, completeness or usefulness of this information. Any reliance you place on such information is strictly at your own risk. We disclaim all liability and responsibility arising from any reliance placed on such materials by you or any other visitor to the Website, or by anyone who may be informed of any of its contents.
                    <br>
                    <br>
                    This Website may include content provided by third parties, including materials provided by other users, bloggers and third-party licensors, syndicators, aggregators and/or reporting services. All statements and/or opinions expressed in these materials, and all articles and responses to questions and other content, other than the content provided by the Company, are solely the opinions and the responsibility of the person or entity providing those materials. These materials do not necessarily reflect the opinion of the Company. We are not responsible, or liable to you or any third party, for the content or accuracy of any materials provided by any third parties.
                </div>
                <div class="section_body_title">
                    Changes to the Website
                </div>
                <div class="section_body_text">
                    We may update the content on this Website from time to time, but its content is not necessarily complete or up-to-date. Any of the material on the Website may be out of date at any given time, and we are under no obligation to update such material. 
                </div>
                <div class="section_body_title">
                    Information About You and Your Visits to the Website
                </div>
                <div class="section_body_text">
                    All information we collect on this Website is subject to our Privacy Policy <a href="{{route('privacy')}}">{{route('privacy')}}</a>. By using the Website, you consent to all actions taken by us with respect to your information in compliance with the Privacy Policy. 
                </div>
                <div class="section_body_title">
                    Other Terms and Conditions
                </div>
                <div class="section_body_text">
                    All information we collect on this Website is subject to our Privacy Policy <a href="{{route('privacy')}}">{{route('privacy')}}</a>. By using the Website, you consent to all actions taken by us with respect to your information in compliance with the Privacy Policy. All referrals sent to and entries created through such referrals to our site or other information formed through the Website or as a result of visits made by you are governed by our Sweepstakes Rules <a href="{{route('referral')}}">{{route('referral')}}</a>, which are hereby incorporated into these Terms of Use.
                    <br>
                    <br>
                    Additional terms and conditions may also apply to specific portions, services or features of the Website. All such additional terms and conditions are hereby incorporated by this reference into these Terms of Use.
                </div>
                <div class="section_body_title">
                    Linking to the Website and Social Media Features
                </div>
                <div class="section_body_text">
                    You may link to our homepage, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it, but you must not establish a link in such a way as to suggest any form of association, approval or endorsement on our part, without our express written consent. 
                    <br>
                    <br>
                    This Website may provide certain social media features that enable you to:
                    <ul>
                        <li>Link from your own or certain third-party websites to certain content on this Website.</li>
                        <li>Send e-mails or other communications with certain content, or links to certain content, on this Website.</li>
                        <li>Cause limited portions of content on this Website to be displayed or appear to be displayed on your own or certain third-party websites.</li>
                    </ul>
                    <br>
                    You may use these features solely as we provide them, and solely with respect to the content they are displayed with. Subject to the foregoing, you must not:
                    <ul>
                        <li>Establish a link from any website that is not owned by you if done so with malicious or wrongful intent.</li>
                        <li>Cause the Website or portions of it to be displayed, or appear to be displayed by, for example, framing, deep linking or in-line linking, on any other site.</li>
                        <li>Otherwise take any action with respect to the materials on this Website that is inconsistent with any other provision of these Terms of Use.</li>
                    </ul>
                    <br>
                    The website from which you are linking, or on which you make certain content accessible, must comply in all respects with the Content Standards set out in these Terms of Use.
                    <br>
                    <br>
                    You agree to cooperate with us in causing any unauthorized framing or linking immediately to cease. We reserve the right to withdraw linking permission without notice.
                    <br>
                    <br>
                    We may disable all or any social media features and any links at any time without notice in our discretion. 
                </div>
                <div class="section_body_title">
                    Links from the Website
                </div>
                <div class="section_body_text">
                    If the Website contains links to other sites and resources provided by third parties, these links are provided for your convenience only. This includes links contained in advertisements, including banner advertisements and sponsored links. We have no control over the contents of those sites or resources, and accept no responsibility for them or for any loss or damage that may arise from your use of them. If you decide to access any of the third-party websites linked to this Website, you do so entirely at your own risk and subject to the terms and conditions of use for such websites.
                </div>
                <div class="section_body_title">
                    Geographic Restrictions
                </div>
                <div class="section_body_text">
                    The owner of the Website is based in the state of California in the United States. This Website is intended for use only by persons located in the United States. We make no claims that the Website or any of its content is accessible or appropriate outside of the United States. Access to the Website may not be legal by certain persons or in certain countries. If you access the Website from outside the United States, you do so on your own initiative and are responsible for compliance with local laws.
                </div>
                <div class="section_body_title">
                    Disclaimer of Warranties
                </div>
                <div class="section_body_text">
                    You understand that we cannot and do not guarantee or warrant that files available for downloading from the Internet or the Website will be free of viruses or other destructive code. You are responsible for implementing sufficient procedures and checkpoints to satisfy your particular requirements for anti-virus protection and accuracy of data input and output, and for maintaining a means external to our site for any reconstruction of any lost data. No data transmission over the Internet can be guaranteed to be 100% safe. Thus, we cannot warrant that your information will be absolutely secure. The Company has a variety of safeguards – technical, administrative, and physical – in place to help protect against unauthorized access to, use, or disclosure of user information. WE WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED BY A DISTRIBUTED DENIAL-OF-SERVICE ATTACK, VIRUSES OR OTHER TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT YOUR COMPUTER EQUIPMENT, COMPUTER PROGRAMS, DATA OR OTHER PROPRIETARY MATERIAL DUE TO YOUR USE OF THE WEBSITE OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE OR TO YOUR DOWNLOADING OF ANY MATERIAL POSTED ON IT, OR ON ANY WEBSITE LINKED TO IT.
                    <br>
                    <br>
                    YOUR USE OF THE WEBSITE, ITS CONTENT AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE IS AT YOUR OWN RISK. THE WEBSITE, ITS CONTENT AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY OR AVAILABILITY OF THE WEBSITE. WITHOUT LIMITING THE FOREGOING, NEITHER THE COMPANY NOR ANYONE ASSOCIATED WITH THE COMPANY REPRESENTS OR WARRANTS THAT THE WEBSITE, ITS CONTENT OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE WILL BE ACCURATE, RELIABLE, ERROR-FREE OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT OUR SITE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE WEBSITE OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS. 
                    <br>
                    <br>
                    THE COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT AND FITNESS FOR PARTICULAR PURPOSE.
                    <br>
                    <br>
                    THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
                </div>
                <div class="section_body_title">
                    Limitation on Liability
                </div>
                <div class="section_body_text">
                    IN NO EVENT WILL THE COMPANY, ITS AFFILIATES OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE WEBSITE, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE WEBSITE OR SUCH OTHER WEBSITES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE WEBSITE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT OR OTHERWISE, EVEN IF FORESEEABLE.
                    <br>
                    <br>
                    THE FOREGOING DOES NOT AFFECT ANY LIABILITY WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
                </div>
                <div class="section_body_title">
                    Indemnification
                </div>
                <div class="section_body_text">
                    You agree to defend, indemnify and hold harmless the Company, its affiliates, licensors and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms of Use or your use of the Website, including, but not limited to, your User Contributions, any use of the Website's content, services and products other than as expressly authorized in these Terms of Use or your use of any information obtained from the Website.
                </div>
                <div class="section_body_title">
                    Governing Law and Jurisdiction
                </div>
                <div class="section_body_text">
                    All matters relating to the Website and these Terms of Use and any dispute or claim arising therefrom or related thereto (in each case, including non-contractual disputes or claims), shall be governed by and construed in accordance with the internal laws of the State of CALIFORNIA without giving effect to any choice or conflict of law provision or rule.
                    <br>
                    <br>
                    Any legal suit, action or proceeding arising out of, or related to, these Terms of Use or the Website shall be instituted exclusively in the federal courts of the United States or the courts of the State of CALIFORNIA in each case located in the City of SAN DIEGO and County of SAN DIEGO although we retain the right to bring any suit, action or proceeding against you for breach of these Terms of Use in your country of residence or any other relevant country. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.
                </div>
                <div class="section_body_title">
                    Arbitration
                </div>
                <div class="section_body_text">
                    If you have any issue or dispute with the Company, you agree to first contact us at <a href="mailto:{{config('mail.from.address')}}">{{config('mail.from.address')}}</a> and attempt to resolve the dispute with us informally. If we are not able to resolve the dispute with you informally, both parties agree to resolve any claim, dispute, or controversy (excluding claims for injunctive or other equitable relief) arising out of or in connection with or relating to these Terms by binding arbitration by the American Arbitration Association ("AAA") under the Commercial Arbitration Rules and Supplementary Procedures for Consumer Related Disputes then in effect for the AAA, except as provided herein. 
                    <br>
                    <br>
                    Unless both parties agree otherwise, the arbitration will be conducted in SAN DIEGO COUNTY. Each party will be responsible for paying their respective AAA filing, administrative and arbitrator fees in accordance with AAA rules. The award rendered by the arbitrator shall include costs of arbitration, reasonable attorneys' fees, and reasonable costs for expert and other witnesses, and any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction. Nothing in this Section shall prevent either party from seeking injunctive or other equitable relief from the courts for matters related to data security, intellectual property or unauthorized access to the Service. 
                    <br>
                    <br>
                    ALL CLAIMS MUST BE BROUGHT IN THE PARTIES' INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING, AND, UNLESS WE AGREE OTHERWISE, THE ARBITRATOR MAY NOT CONSOLIDATE MORE THAN ONE PERSON'S CLAIMS. YOU AGREE THAT, BY ENTERING INTO THESE TERMS, YOU AND THE COMPANY ARE EACH WAIVING THE RIGHT TO A TRIAL BY JURY OR TO PARTICIPATE IN A CLASS ACTION.
                </div>
                <div class="section_body_title">
                    Limitation on Time to File Claims
                </div>
                <div class="section_body_text">
                    ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING TO THESE TERMS OF USE OR THE WEBSITE MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES, OTHERWISE, SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED.
                </div>
                <div class="section_body_title">
                    Waiver and Severability
                </div>
                <div class="section_body_text">
                    No waiver of by the Company of any term or condition set forth in these Terms of Use shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of the Company to assert a right or provision under these Terms of Use shall not constitute a waiver of such right or provision.
                    <br>
                    <br>
                    If any provision of these Terms of Use is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms of Use will continue in full force and effect. 
                </div>
                <div class="section_body_title">
                    Entire Agreement
                </div>
                <div class="section_body_text">
                    The Terms of Use, our Privacy Policy, and Sweepstakes Rules (if applicable) constitute the sole and entire agreement between you and OnePitch with respect to the Website, and supersede all prior and contemporaneous understandings, agreements, representations and warranties, both written and oral, with respect to the Website. 
                </div>
                <div class="section_body_title">
                    Your Comments and Concerns
                </div>
                <div class="section_body_text">
                    This website is operated by OnePitch, located at 702 Ash St #100, San Diego, CA 92101.
                    <br>
                    <br>
                    All feedback, comments, requests for technical support and other communications relating to the Website should be directed to <a href="mailto:{{config('mail.from.address')}}">{{config('mail.from.address')}}</a>.
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