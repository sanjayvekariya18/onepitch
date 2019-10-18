<div class="support_icon" onClick="common.toggleSupportModal()">
    <span>&#63;</span>
</div>
<div class="support_modal">
    <h3 class="support_modal_title">NEED HELP?</h3>
    <form id="support-form" class="support_modal_body" novalidate>
        <input type="text" onkeyup="common.validateSupportForm()" placeholder="Name" name="user_name">
        <input type="email" onkeyup="common.validateSupportForm()" placeholder="Email" name="user_email">
        <textarea cols="30" rows="5" onkeyup="common.validateSupportForm()" placeholder="What's going on?" name="user_message"></textarea>
        <button class="btn btn-sm btn-default submitter" disabled onclick="common.submitSupportMessage(event)">SEND</button>
    </form>
    <img id="loading-image" src="/images/loader-gif.gif" alt="">

    <div class="support-submitted">
        <h3 class="support_modal_title">Your message has been sent!</h3>
        <p class="support_success_body">
            You will receive an email response within the next 24 hours.
        </p>
        <button class="btn btn-sm btn-default" onclick="common.closeSuccessSupportModal()">Close</button>
    </div>
</div>