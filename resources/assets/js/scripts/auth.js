var auth = {
  selectPublicistToggle: function () {
    $('.select-role-wrap .publicist-value-wrap').toggleClass('open')
    return false
  },

  selectJournalistToggle: function () {
    $('.select-role-wrap .journalist-value-wrap').toggleClass('open')
    return false
  },

  toggleTosAgree: function (el, btn) {
    if ($(el).is(':checked')) {
      $(btn).prop('disabled', false)
      $(btn).removeAttr('disabled')
    } else {
      $(btn).prop('disabled', true)
      $(btn).attr('disabled', 'disabled')
    }
  },

  toggleTosAndGdprAgree: function (btn) {
    if ($('.agree_gdpr').is(':checked') && $('.agree_tos').is(':checked')) {
      $(btn).prop('disabled', false)
      $(btn).removeAttr('disabled')
    } else {
      $(btn).prop('disabled', true)
      $(btn).attr('disabled', 'disabled')
    }
  },

  openTos: function () {
    $('#tos-modal').modal()

    return false
  },

  resendConfirmation: function (user_id) {
    $.ajax({
      type: 'POST',
      url: laroute.route('service_resend_user_confirmation',
        { user_id: user_id }),
      success: function (data) {
        $('.email-resend').addClass('hidden')
        $('.email-sent').removeClass('hidden')
      },
    })
  },
}