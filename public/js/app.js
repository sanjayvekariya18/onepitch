var auth = {
  selectPublicistToggle: function selectPublicistToggle() {
    $('.select-role-wrap .publicist-value-wrap').toggleClass('open');
    return false;
  },

  selectJournalistToggle: function selectJournalistToggle() {
    $('.select-role-wrap .journalist-value-wrap').toggleClass('open');
    return false;
  },

  toggleTosAgree: function toggleTosAgree(el, btn) {
    if ($(el).is(':checked')) {
      $(btn).prop('disabled', false);
      $(btn).removeAttr('disabled');
    } else {
      $(btn).prop('disabled', true);
      $(btn).attr('disabled', 'disabled');
    }
  },

  toggleTosAndGdprAgree: function toggleTosAndGdprAgree(btn) {
    if ($('.agree_gdpr').is(':checked') && $('.agree_tos').is(':checked')) {
      $(btn).prop('disabled', false);
      $(btn).removeAttr('disabled');
    } else {
      $(btn).prop('disabled', true);
      $(btn).attr('disabled', 'disabled');
    }
  },

  openTos: function openTos() {
    $('#tos-modal').modal();

    return false;
  },

  resendConfirmation: function resendConfirmation(user_id) {
    $.ajax({
      type: 'POST',
      url: laroute.route('service_resend_user_confirmation', { user_id: user_id }),
      success: function success(data) {
        $('.email-resend').addClass('hidden');
        $('.email-sent').removeClass('hidden');
      }
    });
  }
  /* eslint-disable */

};$(function () {
  $('body').addClass(common.getCurrentBrowser());
});
var common = {
  $brand_id: null,
  validateFieldCountAndShowColor: function validateFieldCountAndShowColor(area_to_count, fieldname) {
    if (area_to_count != null) var areaLength = $(area_to_count).val().length;

    if (fieldname == "what") {
      if (areaLength <= 30) {
        $(area_to_count).closest('.row').find('.dot').removeClass('yellow').removeClass('green').addClass('red');
        $(area_to_count).closest('.row').find('.insidedot').html(areaLength + '/' + '40<br/>Not approved');
      } else if (areaLength > 30 && areaLength <= 40) {
        $(area_to_count).closest('.row').find('.dot').removeClass('yellow').removeClass('red').addClass('green');
        $(area_to_count).closest('.row').find('.insidedot').html(areaLength + '/' + '40<br/>Great work');
      } else if (areaLength >= 41 && areaLength <= 50) {
        $(area_to_count).closest('.row').find('.dot').removeClass('green').removeClass('red').addClass('yellow');
        $(area_to_count).closest('.row').find('.insidedot').html(areaLength + '/' + '40<br/>Approved but could be better');
      } else if (areaLength >= 51) {
        $(area_to_count).closest('.row').find('.dot').removeClass('yellow').removeClass('green').addClass('red');
        $(area_to_count).closest('.row').find('.insidedot').html(areaLength + '/' + '40<br/>Needs work');
      }
    } else if (fieldname == "why") {
      if (areaLength <= 60) {
        $(area_to_count).closest('.row').find('.dot').removeClass('yellow').removeClass('green').addClass('red');
        $(area_to_count).closest('.row').find('.insidedot').html(areaLength + '/' + '80<br/>Not approved');
      } else if (areaLength > 60 && areaLength <= 80) {
        $(area_to_count).closest('.row').find('.dot').removeClass('yellow').removeClass('red').addClass('green');
        $(area_to_count).closest('.row').find('.insidedot').html(areaLength + '/' + '80<br/>Great work');
      } else if (areaLength >= 81 && areaLength <= 100) {
        $(area_to_count).closest('.row').find('.dot').removeClass('green').removeClass('red').addClass('yellow');
        $(area_to_count).closest('.row').find('.insidedot').html(areaLength + '/' + '80<br/>Approved but could be better');
      } else if (areaLength >= 100) {
        $(area_to_count).closest('.row').find('.dot').removeClass('yellow').removeClass('green').addClass('red');
        $(area_to_count).closest('.row').find('.insidedot').html(areaLength + '/' + '80<br/>Needs work');
      }
      var noofwhyCount = 0;
      if ($('#why1').val().length > 0) {
        noofwhyCount = noofwhyCount + 1;
      }
      if ($('#why2').val().length > 0) {
        noofwhyCount = noofwhyCount + 1;
      }
      if ($('#why3').val().length > 0) {
        noofwhyCount = noofwhyCount + 1;
      }
      if (noofwhyCount == 1) {
        $('#why_general').find('.dot').removeClass('yellow').removeClass('green').addClass('red');
        $('#why_general').find('.insidedot').html(noofwhyCount + '/' + '3<br/>Needs work');
      } else if (noofwhyCount == 2) {
        $('#why_general').find('.dot').removeClass('green').removeClass('red').addClass('yellow');
        $('#why_general').find('.insidedot').html(noofwhyCount + '/' + '3<br/>Approved but could be better');
      } else if (noofwhyCount == 3) {
        $('#why_general').find('.dot').removeClass('yellow').removeClass('red').addClass('green');
        $('#why_general').find('.insidedot').html(noofwhyCount + '/' + '3<br/>Great work');
      }
    } else if (fieldname == "subject") {
      if (areaLength >= 33) {
        $(area_to_count).closest('.row').find('.dot').removeClass('yellow').removeClass('red').addClass('green');
        $(area_to_count).closest('.row').find('.insidedot').html(areaLength + '/' + '33<br/>Great work');
      } else if (areaLength >= 25 && areaLength < 33) {
        $(area_to_count).closest('.row').find('.dot').removeClass('green').removeClass('red').addClass('yellow');
        $(area_to_count).closest('.row').find('.insidedot').html(areaLength + '/' + '33<br/>Approved but could be better');
      } else if (areaLength < 20) {
        $(area_to_count).closest('.row').find('.dot').removeClass('yellow').removeClass('green').addClass('red');
        $(area_to_count).closest('.row').find('.insidedot').html(areaLength + '/' + '33<br/>Needs work');
      }
    } else if (fieldname == "topics") {
      var areaLength = document.querySelectorAll('input.topic-input[name="topics"]:checked').length;
      if (areaLength >= 3) {
        $(document).find('.topicsDot.dot').removeClass('yellow').removeClass('red').addClass('green');
        $(document).find('.topicsDot.insidedot').html(areaLength + '/' + '3<br/>Great work');
      } else if (areaLength == 2) {
        $(document).find('.topicsDot.dot').removeClass('green').removeClass('red').addClass('yellow');
        $(document).find('.topicsDot.insidedot').html(areaLength + '/' + '3<br/>Approved but could be better');
      } else if (areaLength <= 1) {
        $(document).find('.topicsDot.dot').removeClass('yellow').removeClass('green').addClass('red');
        $(document).find('.topicsDot.insidedot').html(areaLength + '/' + '3<br/>Needs work');
      }
    }
  },

  fitScreen: function fitScreen() {
    if ($(window).width() > 1199) {
      var max_height = $(window).height() - 100;

      var wrapper_height = 694;
      if (max_height > wrapper_height) {
        var margin_top = (max_height - wrapper_height) / 2;
        $('.select-role-wrap .role-wrap').css('padding-top', margin_top);
      }

      $('.select-role-wrap .role-wrap').css('min-height', max_height);
    } else if ($(window).width() > 991) {
      var max_height = $(window).height() - 80;

      var wrapper_height = 577;
      if (max_height > wrapper_height) {
        var margin_top = (max_height - wrapper_height) / 2;
        $('.select-role-wrap .role-wrap').css('padding-top', margin_top);
      }

      $('.select-role-wrap .role-wrap').css('min-height', max_height);
    } else if ($(window).width() > 767) {
      var max_height = $(window).height() - 156;
      var wrapper_height = 618;
      if (max_height > wrapper_height) {
        var margin_top = (max_height - wrapper_height) / 2;
        $('.select-role-wrap .role-wrap').css('padding-top', margin_top);
      }
      $('.select-role-wrap .role-wrap').css('min-height', max_height);
    }
  },

  fitFooter: function fitFooter() {
    if ($('footer.page-footer').length && $(window).width() > 767) {
      var height = $('footer.page-footer').outerHeight();

      $('main').css('margin-bottom', height);
    }
  },

  fitModals: function fitModals() {
    var max_height = $(window).height() - 120;
    $('.modal .modal-body').css('max-height', max_height);
  },

  openSinglePhotoUploader: function openSinglePhotoUploader(el) {
    $(el).closest('.single-photo-upload').find('input[type="file"]').click();
    return false;
  },

  removeSingleFile: function removeSingleFile(file_input_id, file_text_id) {
    var fileInput = $('#' + file_input_id);
    var fileText = $('#' + file_text_id);
    var deletedFiles = $('#deleted-files')[0];
    deletedFiles.value += fileText[0].value + ',';
    var filePreview = fileInput.closest('.file_input_div').siblings('.photo-rnd').find('.photo-preview');
    var closeButton = fileInput.closest('.file_input_div').siblings('.close-button');
    if (closeButton.hasClass('show')) {
      closeButton.toggleClass('show');
    }
    closeButton.css('display', 'none');
    filePreview.attr('src', '');
    fileInput[0].value = '';
    fileText[0].value = '';
  },

  removePressRelease: function removePressRelease(file_input_id, file_text_id) {
    var fileInput = $('#' + file_input_id);
    var fileText = $('#' + file_text_id);
    var deletedFiles = $('#deleted-press-release')[0];
    deletedFiles.value += fileText[0].value + ',';
    var filePreview = fileInput.closest('.file_input_div').siblings('.photo-rnd').find('.photo-preview');
    var closeButton = fileInput.closest('.file_input_div').siblings('.close-button');
    if (closeButton.hasClass('show')) {
      closeButton.toggleClass('show');
    }
    closeButton.css('display', 'none');
    filePreview.attr('src', '');
    fileInput[0].value = '';
    fileText[0].value = '';
  },

  onSinglePhotoSelected: function onSinglePhotoSelected(event) {
    var selectedFile = event.target.files[0];
    var reader = new FileReader();

    var imgtag = $(event.target).closest('.single-photo-upload').find('.photo-preview');
    imgtag.title = selectedFile.name;

    switch (selectedFile.type) {
      case 'application/pdf':
        imgtag.attr('src', '/img/icons/icon-pdf.png');
        break;
      case 'application/msword':
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/x-iwork-pages-sffpages':
        imgtag.attr('src', '/img/icons/icon-doc.png');
        break;
      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      case 'application/x-iwork-keynote-sffkey':
        imgtag.attr('src', '/img/icons/icon-ppt.png');
        break;
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        imgtag.attr('src', '/img/icons/icon-xls.png');
        break;
      case 'image/gif':
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
      case 'image/bmp':
        reader.onload = function (event) {
          imgtag.removeClass('hide');
          imgtag.attr('data-uploaded', 'false');
          imgtag.closest('.single-photo-upload').find('.delete-photo').removeClass('hide');
          imgtag.closest('.single-photo-upload').find('.photo-selector').text('Change Photo');

          imgtag.attr('src', event.target.result);
        };
        break;
      default:
        imgtag.attr('src', '/img/icons/icon-default.png');
        break;
    }
    reader.readAsDataURL(selectedFile);
  },

  onFileSelected: function onFileSelected(event) {
    console.log($(event.target).closest('.file_input_div').siblings('.close-button'));
    var closeButton = $(event.target).closest('.file_input_div').siblings('.close-button');
    closeButton.css('display', 'inherit');
    var fileInput = $(event.target).closest('.single-photo-upload').find('.file_input_file')[0];
    var fileInputText = $(event.target).closest('.single-photo-upload').find('.file_input_text')[0];
    var str = fileInput.value;
    var i;
    if (str.lastIndexOf('\\')) {
      i = str.lastIndexOf('\\') + 1;
    } else if (str.lastIndexOf('/')) {
      i = str.lastIndexOf('/') + 1;
    }
    fileInputText.value = str.slice(i, str.length);
    this.onSinglePhotoSelected(event);
  },

  togglePasswordField: function togglePasswordField(el) {
    var input = $('input', $(el).parents('.password-input'));
    var icon = $('.show-pass', $(el).parents('.password-input'));
    if (input.attr('type') == 'text') {
      input.attr('type', 'password');
      icon.toggleClass('visible');
      icon.text('visibility_off');
    } else {
      icon.text('visibility');
      input.attr('type', 'text');
      icon.toggleClass('visible');
    }
  },

  bindLoginFormValidation: function bindLoginFormValidation() {
    $('form').parsley({
      successClass: 'validate-success',
      errorClass: 'validate-error',
      classHandler: function classHandler(el) {
        return el.$element.closest('.form-group');
      },
      errorsWrapper: '<div class="invalid-message"></div>',
      errorTemplate: '<span></span>'
    });

    // $('form input.form-control').each(function(){
    //     if ($(this).val().length) {
    //         $(this).parsley().validate();
    //     }
    // });

    //PRELOAD SUBMIT ACTIVE
    // setTimeout(function(){
    //     var form = $('.submitter').closest('form')
    //     if (form.length && form.parsley()[0].isValid()) {
    //         $('form').find('.submitter').prop('disabled', false);
    //         $('form').find('.submitter').removeAttr('disabled');
    //     }
    // }, 500);

    $('form .form-control.email').blur(function () {
      var form = $(this).closest('form');

      $(this).parsley().validate();

      // if (form.parsley().isValid()) {
      //     form.find('.submitter').each(function(){
      //         $(this).prop('disabled', false);
      //         $(this).removeAttr('disabled');
      //     });
      // } else {
      //     form.find('.submitter').each(function(){
      //         $(this).prop('disabled', true);
      //         $(this).attr('disabled', 'disabled');
      //     });
      // }
    });

    $('form .form-control.password').keyup(function () {
      var form = $(this).closest('form');

      $(this).parsley().validate();

      // if (form.parsley().isValid()) {
      //     form.find('.submitter').each(function(){
      //         $(this).prop('disabled', false);
      //         $(this).removeAttr('disabled');
      //     });
      // } else {
      //     form.find('.submitter').each(function(){
      //         $(this).prop('disabled', true);
      //         $(this).attr('disabled', 'disabled');
      //     });
      // }
    });
  },

  bindBrandFormValidation: function bindBrandFormValidation() {
    $('form').parsley({
      successClass: 'validate-success',
      errorClass: 'validate-error',
      classHandler: function classHandler(el) {
        return el.$element.closest('.form-group');
      },
      errorsWrapper: '<div class="invalid-message"></div>',
      errorTemplate: '<span></span>'
    });

    $('form input.form-control').each(function () {
      if ($(this).val().length) {
        $(this).parsley().validate();
      }
    });

    //PRELOAD SUBMIT ACTIVE
    setTimeout(function () {
      var form = $('.submitter').closest('form');
      if (form.length && form.parsley()[0].isValid()) {
        $('form').find('.submitter').prop('disabled', false);
        $('form').find('.submitter').removeAttr('disabled');
      }
    }, 500);

    $('form .form-control').blur(function () {
      var form = $(this).closest('form');

      $(this).parsley().validate();

      if (form.parsley().isValid()) {
        form.find('.submitter').each(function () {
          $(this).prop('disabled', false);
          $(this).removeAttr('disabled');
        });
      } else {
        form.find('.submitter').each(function () {
          $(this).prop('disabled', true);
          $(this).attr('disabled', 'disabled');
        });
      }
    });

    $('form select').change(function () {
      var form = $(this).closest('form');

      $(this).parsley().validate();

      if (form.parsley().isValid()) {
        form.find('.submitter').each(function () {
          $(this).prop('disabled', false);
          $(this).removeAttr('disabled');
        });
      } else {
        form.find('.submitter').each(function () {
          $(this).prop('disabled', true);
          $(this).attr('disabled', 'disabled');
        });
      }
    });
  },

  bindFormValidation: function bindFormValidation() {
    $('form').parsley({
      successClass: 'validate-success',
      errorClass: 'validate-error',
      classHandler: function classHandler(el) {
        return el.$element.closest('.form-group');
      },
      errorsWrapper: '<div class="invalid-message"></div>',
      errorTemplate: '<span></span>'
    });

    $('form input.form-control').each(function () {
      if ($(this).val().length) {
        $(this).parsley().validate();
      }
    });

    //PRELOAD SUBMIT ACTIVE
    setTimeout(function () {
      var form = $('.submitter').closest('form');
      if (form.length && form.parsley()[0].isValid()) {
        $('form').find('.submitter').prop('disabled', false);
        $('form').find('.submitter').removeAttr('disabled');
      }
    }, 500);

    $('form .form-control').blur(function () {
      var form = $(this).closest('form');
      $(this).parsley().validate();

      var qValidate = form.parsley().whenValid();

      form.find('.submitter').each(function () {
        $(this).prop('disabled', true);
        $(this).attr('disabled', 'disabled');
      });

      qValidate.done(function () {
        form.find('.submitter').each(function () {
          $(this).prop('disabled', false);
          $(this).removeAttr('disabled');
        });
      });
    });
  },

  bindCustomFormValidation: function bindCustomFormValidation(el) {
    $(el).parsley({
      successClass: 'validate-success',
      errorClass: 'validate-error',
      classHandler: function classHandler(el) {
        return el.$element.closest('.form-group');
      },
      errorsWrapper: '<div class="invalid-message"></div>',
      errorTemplate: '<span></span>'
    });

    $(el + ' .form-control').blur(function () {
      var form = $(this).closest(el);

      var valid = true;
      form.find('input.form-control').each(function () {
        if ($(this).parsley().validate() !== true) {
          valid = false;
        }
      });

      if (valid) {
        form.find('.submitter').each(function () {
          $(this).prop('disabled', false);
          $(this).removeAttr('disabled');
        });
      } else {
        form.find('.submitter').each(function () {
          $(this).prop('disabled', true);
          $(this).attr('disabled', 'disabled');
        });
      }
    });
  },

  charsCount: function charsCount(area_to_count) {
    var areaLength = $(area_to_count).val().length;
    var max = $(area_to_count).attr('maxlength');

    if (areaLength) {
      $(area_to_count).closest('.form-group').find('.counter').text(areaLength + '/' + max);
    } else {
      $(area_to_count).closest('.form-group').find('.counter').text('');
    }
  },

  preventEnterKey: function preventEnterKey(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
    }
  },

  loadIndustryBlocks: function loadIndustryBlocks(wrapper, term, user_id, search) {
    var offset = 0;
    if ($('input[name="offset"]').length) {
      offset = $('input[name="offset"]').val();
    }

    $.ajax({
      type: 'POST',
      url: laroute.route('service_load_industries'),
      data: {
        term: term,
        offset: offset,
        user_id: user_id
      },
      success: function success(data) {
        if (search) {
          wrapper.html(data);
        } else {
          wrapper.append(data);
        }
      }
    });
  },

  bindSearchIndustries: function bindSearchIndustries(input, wrapper, user_id) {
    common.loadIndustryBlocks(wrapper, input.val(), user_id);

    var timeout = null;
    input.keyup(function () {
      if (timeout) {
        clearTimeout(timeout);
      }

      if (input.length) {
        $('input[name="offset"]').val(0);

        timeout = setTimeout(function () {
          common.loadIndustryBlocks(wrapper, input.val(), user_id, true);
        }, 500);
      }
    });
  },

  loadMoreIndustries: function loadMoreIndustries(input, wrapper, user_id) {
    var term = null;
    if (input.length) {
      term = input.val();
    }
    var offset = 0;
    if ($('input[name="offset"]').length) {
      offset = parseInt($('input[name="offset"]').val());
      offset++;
      $('input[name="offset"]').val(offset);
    }

    common.loadIndustryBlocks(wrapper, input.val(), user_id);
  },

  loadAllIndustries: function loadAllIndustries(el) {
    if ($(el).is(':checked')) {
      var total = parseInt($('.industries-total')[0].innerText);
      var j = Math.round(total / 12);
      for (var i = 0; i < j; i++) {
        $('.load-more-industries').click();
      }
    }
  },

  selectAllIndustries: function selectAllIndustries(el) {
    this.loadAllIndustries(el);

    if (!$(el).is(':checked')) {
      $('.industry').each(function () {
        $('#industry' + $(this).data('id') + ' .remove').trigger('click');
      });
    } else {
      this.loadAllIndustryTopics();
    }
  },

  selectIndustry: function selectIndustry(industry_id, industry_title) {
    var _this = this;

    var suggested_industry = $.ajax({
      type: 'GET',
      async: false,
      url: laroute.route('service_get_suggested_industry_topics'),
      success: function success(data) {
        return data;
      }
    });

    if (suggested_industry.responseJSON[0]) {
      swal({
        title: 'Do you want to use the topics from ' + suggested_industry.responseJSON[1],
        text: this.listIndustryTopicsName(suggested_industry.responseJSON[2]),
        buttons: {
          cancelIndustry: {
            text: 'Cancel',
            value: 'cancel'
          },
          confirmSelection: {
            text: 'Confirm',
            value: 'confirm'
          },
          select: {
            text: 'Select New',
            value: 'select'
          }
        }
      }).then(function (response) {
        if (response == 'confirm') {
          var suggested_industry_title = JSON.parse(suggested_industry.responseJSON[0]);
          suggested_industry_title['industry'] = industry_id;
          _this.addIndustryTopics(industry_title, industry_id, JSON.stringify(suggested_industry_title));
          if (tour) {
            tour.next();
          }
        } else if (response == 'select') {
          _this.loadIndustryTopics(industry_id);
        }
      });
    } else {
      this.loadIndustryTopics(industry_id);
    }
  },

  listIndustryTopicsName: function listIndustryTopicsName(suggested_topic_name) {
    var newDiv = '';
    for (var i = 0; i < suggested_topic_name.length; i++) {
      newDiv += suggested_topic_name[i];
      if (i < suggested_topic_name.length - 1) {
        newDiv += '  |  ';
      }
    }
    return newDiv;
  },

  loadAllIndustryTopics: function loadAllIndustryTopics() {
    setTimeout(function () {
      $.ajax({
        type: 'GET',
        url: laroute.route('service_load_all_industry_topics'),
        success: function success(data) {
          $('.content-area').addClass('hidden');
          $('.industry-topics').html(data);
          $('.industry-topics').removeClass('hidden');

          window.scrollTo(0, 0);
          if (tour) {
            tour.goTo(3);
          }
        }
      });
    }, 1000);
  },

  loadOutlets: function loadOutlets() {
    setTimeout(function () {
      $.ajax({
        type: 'POST',
        url: laroute.route('service_load_all_outlets'),
        data: {
          industry_id: industry_id
        },
        success: function success(data) {
          console.log(data);
          // $('.content-area').addClass('hidden')
          // $('.industry-topics').html(data)
          // $('.industry-topics').removeClass('hidden')

          // window.scrollTo(0, 0)
          // if (tour) {
          //   tour.goTo(3)
          // }
        }
      });
    }, 1000);
  },

  loadIndustryTopics: function loadIndustryTopics(industry_id) {
    common.selectIndustryBlock(industry_id);

    setTimeout(function () {
      $.ajax({
        type: 'POST',
        url: laroute.route('service_load_industry_topics'),
        data: {
          industry_id: industry_id
        },
        success: function success(data) {
          $('.content-area').addClass('hidden');
          $('.industry-topics').html(data);
          $('.industry-topics').removeClass('hidden');

          window.scrollTo(0, 0);
          if (tour) {
            tour.goTo(3);
          }
        }
      });
    }, 1000);
  },

  loadSearchedOutlets: function loadSearchedOutlets(term) {
    return $.ajax({
      type: 'POST',
      url: laroute.route('service_load_searched_outlets'),
      async: true,
      data: {
        term: term
      }
    });
  },

  unselectIndustryBlocks: function unselectIndustryBlocks() {
    $('.industries .industry').removeClass('checked');
    $('.industries .industry .industry-container-inner.hover input[type="radio"]').prop('checked', false);
  },

  selectIndustryBlock: function selectIndustryBlock(industry_id) {
    $('#industry-block' + industry_id).addClass('checked');
    $('#industry-block' + industry_id + ' .industry-container-inner.hover input[type="radio"]').prop('checked', true);

    if (tour) {
      $('.select-industry-continue').prop('disabled', false);
    }
  },

  selectIndustryTopic: function selectIndustryTopic(el) {
    $(el).closest('.topic-inner').toggleClass('checked');
    var checkboxes = $(el).closest('.topics-form').find('.topic-input:checked');
    if (checkboxes.length > 5 && role[0] === 2) {
      $(el).find('.topic-input:checked').attr('checked', false).prop("checked", false);
      $(el).closest('.topic-inner').toggleClass('checked');
      swal({
        title: 'You cannot select more than 5 topics',
        text: 'A maximum of 5 topic selections is allowed. If you want to add more, please contact support.',
        buttons: {
          hiddenButton: {
            text: 'Cancel',
            value: null
          },
          select: {
            text: 'OK',
            value: 'confirm'
          }
        }
      });
    } else {
      if (checkboxes.length) {
        $('#add-topics').prop('disabled', false);
        $('#add-topics').removeAttr('disabled');
      } else {
        $('#add-topics').prop('disabled', true);
        $('#add-topics').attr('disabled', 'disabled');
      }
    }

    $('.topic-select').prop('disabled', false);

    if (tour) {
      $('.allow-continue').prop('disabled', false);
    }
  },

  selectCustomTopic: function selectCustomTopic(el) {
    if ($(el).val()) {
      $(el).closest('.topic-inner').addClass('checked');
      $(el).closest('.topic-inner').find('.topic-input').prop('checked', true);
      $(el).closest('.topic-inner').find('.topic-input').val($(el).val());
    } else {
      $(el).closest('.topic-inner').removeClass('checked');
      $(el).closest('.topic-inner').find('.topic-input').prop('checked', false);
      $(el).closest('.topic-inner').find('.topic-input').val('');
    }

    var checkboxes = $(el).closest('.topics-form').find('.topic-input:checked');

    if (checkboxes.length) {
      $('#add-topics').prop('disabled', false);
      $('#add-topics').removeAttr('disabled');
    } else {
      $('#add-topics').prop('disabled', true);
      $('#add-topics').attr('disabled', 'disabled');
    }

    $(el).closest('.topic-inner').removeClass('focused');
  },

  selectEventTopic: function selectEventTopic(el) {
    var valid = true;
    $(el).closest('.topic-inner').find('.main.form-control[required]').each(function () {
      if (!$(this).val()) {
        valid = false;
      }
    });

    if (valid) {
      $(el).closest('.topic-inner').addClass('checked');
      $(el).closest('.topic-inner').find('.topic-input').prop('checked', true);
      $(el).closest('.topic-inner').find('.topic-input').val(1);
    } else {
      $(el).closest('.topic-inner').removeClass('checked');
      $(el).closest('.topic-inner').find('.topic-input').prop('checked', false);
      $(el).closest('.topic-inner').find('.topic-input').val(0);
    }

    var checkboxes = $(el).closest('.topics-form').find('.topic-input:checked');

    if (checkboxes.length) {
      $('#add-topics').prop('disabled', false);
      $('#add-topics').removeAttr('disabled');
    } else {
      $('#add-topics').prop('disabled', true);
      $('#add-topics').attr('disabled', 'disabled');
    }

    $(el).closest('.topic-inner').removeClass('focused');
  },

  selectIndustryTopicCustom: function selectIndustryTopicCustom(el) {
    $(el).closest('.topic-inner').toggleClass('checked');

    if ($(el).closest('.topic-inner').hasClass('checked')) {
      $(el).closest('.topic-inner').find('.form-control').first().focus();
    } else {
      $(el).closest('.topic-inner').find('.form-control').val('');
      $(el).closest('.topic-inner').find('#single-range-date-switch').prop('checked', false);
      $(el).closest('.topic-inner').find('select[name="event_timezone"] option:selected').removeAttr('selected');
      $('select').select2({
        minimumResultsForSearch: Infinity
      });

      // $(el).closest('.topic-inner').removeClass('checked');
      // $(el).closest('.topic-inner').find('.topic-input').prop('checked', false);
      $(el).closest('.topic-inner').find('.topic-input').val(0);
    }
  },

  selectCutomTopicInput: function selectCutomTopicInput(el) {
    $(el).closest('.topic-inner').addClass('focused');
  },

  addAllIndustryTopics: function addAllIndustryTopics() {
    var dataTopics = common.getFormData($('.topics-form'), 'topics');
    var data = [];

    $('.industry:not(.checked)').each(function () {
      var id = $(this).data('id');
      var title = $(this).data('title');
      data = dataTopics;
      data['industry'] = id;
      data = JSON.stringify(data);

      common.selectIndustryBlock(id);
      tags.addTag(title, data, id);
    });

    $('.no-industries').addClass('hidden');
    $('.industries-showing')[0].innerText = parseInt($('.industries-total')[0].innerText);

    $('.industry-topics').addClass('hidden');
    $('.content-area').removeClass('hidden');
    $('.industry-topics').html('');

    setTimeout(function () {
      $.ajax({
        type: 'POST',
        url: laroute.route('service_set_suggested_industry_topics'),
        data: {
          suggested_industry: data
        },
        success: function success(data) {
          if (tour) {
            tour.next();
          }
        }
      });
    }, 1000);
  },

  addIndustryTopics: function addIndustryTopics(title, id, topics) {
    var data;
    if (topics) {
      data = topics;
    } else {
      data = JSON.stringify(common.getFormData($('.topics-form'), 'topics'));
    }
    setTimeout(function () {
      $.ajax({
        type: 'POST',
        url: laroute.route('service_set_suggested_industry_topics'),
        data: {
          suggested_industry: data
        },
        success: function success(data) {
          if (tour) {
            tour.next();
          }
        }
      });
    }, 1000);
    tags.addTag(title, data, id);
    $('.industry-topics').addClass('hidden');
    $('.content-area').removeClass('hidden');
    $('.industry-topics').html('');
  },

  bindTopicsFromTag: function bindTopicsFromTag(wrapper, industry_id) {
    if ($(wrapper + industry_id + '.tag').length) {
      var data = $(wrapper + industry_id + '.tag textarea').val();
      data = $.parseJSON(data);

      if (data.topics) {
        $.each(data.topics, function (key, value) {
          $('#topic-input' + value).trigger('click');
        });
      }
    }
  },

  selectAll: function selectAll(el, group, submitter) {
    if ($(el).is(':checked')) {
      $('.' + group + '[type="checkbox"]').prop('checked', true);
      $('.' + group + '[type="checkbox"]').closest('.checkbox-wrapper').addClass('checked');

      if (submitter && $(submitter).length) {
        $(submitter).prop('disabled', false);
        $(submitter).removeAttr('disabled');
      }
    } else {
      $('.' + group + '[type="checkbox"]').prop('checked', false);
      $('.' + group + '[type="checkbox"]').closest('.checkbox-wrapper').removeClass('checked');

      if (submitter && $(submitter).length) {
        $(submitter).prop('disabled', true);
        $(submitter).attr('disabled', 'disabled');
      }
    }

    $('.' + group + '[type="checkbox"]').change(function () {
      $(el).prop('checked', false);
    });
  },

  getFormData: function getFormData($form, as_array) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
      if (indexed_array[n['name']]) {
        if ($.type(indexed_array[n['name']]) == 'string') {
          var temp = indexed_array[n['name']];
          var temp_array = new Array(temp);
          indexed_array[n['name']] = temp_array;
        }

        indexed_array[n['name']].push(n['value']);
      } else {
        if (as_array == n['name']) {
          indexed_array[n['name']] = new Array(n['value']);
        } else {
          indexed_array[n['name']] = n['value'];
        }
      }
    });

    return indexed_array;
  },

  bindDateRangePicker: function bindDateRangePicker(selector, single) {
    $(selector).daterangepicker({
      singleDatePicker: single,
      locale: {
        format: 'MMM DD, YYYY'
      },
      minDate: new Date(),
      opens: 'center',
      drops: 'up',
      autoApply: true,
      linkedCalendars: false
    });
  },

  switchSingleRangeDate: function switchSingleRangeDate(selector, datepicker) {
    if ($(selector).is(':checked')) {
      common.bindDateRangePicker(datepicker, false);
    } else {
      common.bindDateRangePicker(datepicker, true);
    }
  },

  submitTime: function submitTime($this, el) {
    var form = $($this).closest('.custom-timepicker-form');

    var time = form.find('input[name="event_from_hours"]').val() + ':' + form.find('input[name="event_from_minutes"]').val() + ' ' + form.find('input[name="event_time_from_am_pm"]:checked').val();

    if (form.find('input[name="event_to_hours"]').val()) {
      var to_time = ' - ' + form.find('input[name="event_to_hours"]').val();

      if (form.find('input[name="event_to_minutes"]').val()) {
        to_time += ':' + form.find('input[name="event_to_minutes"]').val();
      } else {
        to_time += ':00';
      }

      to_time += ' ' + form.find('input[name="event_time_from_am_pm"]:checked').val();

      time += to_time;
    }

    $(el).val(time);
  },
  scrollTo: function scrollTo(id, duration) {
    var selector = 'body';
    if (id) {
      selector = '#' + id;
    }
    var time = 600;
    if (duration) {
      time = duration;
    }
    $('html, body').animate({
      scrollTop: $(selector).offset().top
    }, time);
  },

  copyToClipboard: function copyToClipboard(el, copy_text) {
    var $temp = $('<input>');
    $('body').append($temp);
    $temp.val($(el).data('link')).select();
    document.execCommand('copy');
    $temp.remove();
    $(el).text(copy_text);
  },
  getCurrentBrowser: function getCurrentBrowser() {
    var browsers = {
      Android: /Android/.test(navigator.userAgent),
      Cordova: !!window.cordova,
      Edge: /Edge/.test(navigator.userAgent),
      Firefox: /Firefox/.test(navigator.userAgent),
      Chrome: !!window.chrome && !/OPR/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
      ChromeIOS: /CriOS/.test(navigator.userAgent),
      ChromiumBased: !!window.chrome && !/Edge/.test(navigator.userAgent),
      IE: /Trident/.test(navigator.userAgent),
      IOS: /(iPhone|iPad|iPod)/.test(navigator.platform),
      Opera: /OPR/.test(navigator.userAgent),
      Safari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
      TouchScreen: 'ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch
    };
    var current_browser = false;
    for (i in browsers) {
      if (browsers[i]) {
        current_browser = i;
        break;
      }
    }

    return current_browser;
  },
  validateSocialLinks: function validateSocialLinks(el) {
    var val = '';
    $('.social-link-input').each(function () {
      val += $(this).val();
    });
    $('#social_links').val(val);
    $('#social_links').parsley({
      successClass: 'validate-success',
      errorClass: 'validate-error',
      classHandler: function classHandler(el) {
        return el.$element.closest('.form-group');
      },
      errorsWrapper: '<div class="invalid-message"></div>',
      errorTemplate: '<span></span>'
    }).validate();
  },
  validateSocialLinksClear: function validateSocialLinksClear() {
    $('#social_links').val('tmp');
    $('#social_links').parsley({
      successClass: 'validate-success',
      errorClass: 'validate-error',
      classHandler: function classHandler(el) {
        return el.$element.closest('.form-group');
      },
      errorsWrapper: '<div class="invalid-message"></div>',
      errorTemplate: '<span></span>'
    }).validate();
  },
  showSpecifyAboutUsField: function showSpecifyAboutUsField(el) {
    var elem = $(el);
    var elemVal = elem.val();
    if (elemVal === 'Other' || elemVal === 'Referral' || elemVal === 'Podcast' || elemVal === 'Event' || elemVal === 'Email' || elemVal === 'Article') {
      elem.parent().siblings('div.hear-about-input').children('.hear_about_other').show();
    } else {
      elem.parent().siblings('div.hear-about-input').children('.hear_about_other').hide();
    }
  },
  validateWalkthroughEnd: function validateWalkthroughEnd(type) {
    if ($('#no-more-tour').is(':checked')) {
      common.endWalkthrough(type, 2);
    } else {
      common.endWalkthrough(type, 1);
    }
  },
  endWalkthrough: function endWalkthrough(type, increment) {
    setTimeout(function () {
      $.ajax({
        type: 'POST',
        url: laroute.route('service_update_user_tour'),
        data: {
          type: type,
          increment: increment
        },
        success: function success(data) {
          console.log(data);
        }
      });
    }, 1000);
  },
  brandTrackClicks: function brandTrackClicks(brand_user_id, clicked) {
    $.ajax({
      type: 'POST',
      url: laroute.route('brand_track_clicks'),
      data: {
        brand_user_id: brand_user_id,
        clicked: clicked
      },
      success: function success(data) {
        console.log(data);
      }
    });
  },
  toggleSupportModal: function toggleSupportModal() {
    $('.support_modal').toggle().css('transition', '0.3s ease all');
    $('.support_icon > span')[0].innerHTML = $('.support_icon > span')[0].innerHTML == '?' ? 'X' : '?';
  },
  closeSuccessSupportModal: function closeSuccessSupportModal() {
    $('#support-form')[0].reset();
    this.toggleSupportModal();
    $('.support-submitted').toggleClass('open');
    return false; // show response from the php script.
  },
  validateSupportForm: function validateSupportForm() {
    var form = $('#support-form');
    var fields = [];

    form.find('input').each(function () {
      if (this.value) {
        fields.push(this.value);
      }
    });
    form.find('textarea').each(function () {
      if (this.value) {
        fields.push(this.value);
      }
    });

    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (fields.length === 3 && re.test(String(fields[1]).toLowerCase())) {
      form.find('.submitter').each(function () {
        $(this).prop('disabled', false);
        $(this).removeAttr('disabled');
      });
    } else {
      form.find('.submitter').each(function () {
        $(this).prop('disabled', true);
        $(this).attr('disabled', 'disabled');
      });
    }
  },
  submitSupportMessage: function submitSupportMessage(e) {
    e.preventDefault();
    $('#loading-image').show();
    $.ajax({
      type: 'POST',
      url: '/support',
      cache: false,
      data: $('#support-form').serialize(), // serializes the form's elements.
      success: function success(data) {
        $('.support-submitted').toggleClass('open');
        return false; // show response from the php script.
      },
      complete: function complete() {
        $('#loading-image').hide();
      }
    });
  },
  openNav: function openNav() {
    document.getElementById('sideNav').style.width = '250px';
  },
  closeNav: function closeNav() {
    document.getElementById('sideNav').style.width = '0';
  },
  changeTimeZoneTime: function changeTimeZoneTime(el) {
    var timezone = el.closest('select').value;
    var timeSelect = $(el).closest('.timezone').siblings('.time').find('select')[0];
    var timeSelectValue = timeSelect.value;

    if (timezone === '' || timezone === 'PST') {
      timeSelect.innerHTML = '<option value="">Select Time</option>\n' + '                                <option value="05:00:00">5:00 AM</option>\n' + '                                <option value="08:00:00">8:00 AM</option>\n' + '                                <option value="11:00:00">11:00 AM</option>\n' + '                                <option value="14:00:00">2:00 PM</option>';
      timeSelect.value = timeSelectValue;
    } else if (timezone === 'EST') {
      timeSelect.innerHTML = '<option value="">Select Time</option>\n' + '                                <option value="05:00:00">8:00 AM</option>\n' + '                                <option value="08:00:00">11:00 AM</option>\n' + '                                <option value="11:00:00">2:00 PM</option>\n' + '                                <option value="14:00:00">5:00 PM</option>';
      timeSelect.value = timeSelectValue;
    } else if (timezone === 'CST') {
      timeSelect.innerHTML = '<option value="">Select Time</option>\n' + '                                <option value="05:00:00">7:00 AM</option>\n' + '                                <option value="08:00:00">10:00 AM</option>\n' + '                                <option value="11:00:00">1:00 PM</option>\n' + '                                <option value="14:00:00">4:00 PM</option>';
      timeSelect.value = timeSelectValue;
    } else if (timezone === 'MST') {
      timeSelect.innerHTML = '<option value="">Select Time</option>\n' + '                                <option value="05:00:00">6:00 AM</option>\n' + '                                <option value="08:00:00">9:00 AM</option>\n' + '                                <option value="11:00:00">12:00 PM</option>\n' + '                                <option value="14:00:00">3:00 PM</option>';
      timeSelect.value = timeSelectValue;
    }
  },

  openBrandModal: function openBrandModal(id) {
    $.ajax({
      type: 'GET',
      url: laroute.route('brand_view_modal'),
      data: {
        brand_id: id
      },
      success: function success(data) {
        $('#add-brand-modal .modal-body').html(data);
        $('#add-brand-modal').modal();
      }
    });
  },

  openDeleteBrandModal: function openDeleteBrandModal(brand_id) {
    if ($('#add-brand-modal').length) {
      $('#add-brand-modal').modal('hide');
    }

    common.$brand_id = brand_id;

    $('#brand-delete-modal').modal();
  },

  brandDelete: function brandDelete() {
    $.ajax({
      type: 'POST',
      url: laroute.route('brand_delete', { brand_id: common.$brand_id }),
      success: function success(data) {
        common.$brand_id = null;
        $('#brand-delete-modal').modal('hide');
        window.location = laroute.route('profile');
      }
    });
  },

  loadMoreBrands: function loadMoreBrands(input, wrapper, industryInput, topicInput) {
    var term = null;
    var industry = null;
    var topic = null;
    if (input.length) {
      term = input.val();
    }
    if (industryInput.length) {
      industry = industryInput.val();
    }
    if (topicInput.length) {
      topic = topicInput.val();
    }
    var offset = 0;
    if ($('input[name="offset"]').length) {
      offset = parseInt($('input[name="offset"]').val());
      offset = offset + 12;
      $('input[name="offset"]').val(offset);
    }
    common.loadMoreBrandsBlocks(wrapper, term, industry, topic);
  },

  loadMoreBrandsBlocks: function loadMoreBrandsBlocks(wrapper, term, industry, topic) {
    var offset = 0;
    if ($('input[name="offset"]').length) {
      offset = $('input[name="offset"]').val();
    }

    $.ajax({
      type: 'POST',
      url: laroute.route('service_load_some_brands'),
      data: {
        offset: offset,
        term: term,
        industry: industry,
        topic: topic
      },
      success: function success(data) {
        wrapper.append(data);
      }
    });
  },

  openBrandList: function openBrandList(el) {
    $(el).parent().toggleClass('closed');
    $(el).parent().siblings('.inner-hover').toggleClass('opened');
  },

  closeBrandList: function closeBrandList(el) {
    $(el).parent().toggleClass('opened');
    $(el).parent().siblings('.inner').toggleClass('closed');
  },

  showPhoneNumber: function showPhoneNumber(id) {
    this.brandTrackClicks(id, 'phone_number');
    $.ajax({
      type: 'GET',
      url: laroute.route('brand_view_phone_number'),
      data: {
        user_id: id
      },
      success: function success(data) {
        $('#view-phone-number .modal-body').html(data);
        $('#view-phone-number').modal();
      }
    });
  }
};
InputEffects = {
  init: function init() {
    [].slice.call(document.querySelectorAll('.field input, .field textarea')).forEach(function (inputEl) {
      if (inputEl.value.trim() !== '' && $(inputEl).attr('type') != 'hidden') {
        $(inputEl).closest('.field').addClass('input-filled');
      }
      inputEl.addEventListener('focus', onInputFocus);

      inputEl.addEventListener('blur', onInputBlur);

      //HACK to not jump inputs with value on page load
      setTimeout(function () {
        $(inputEl).closest('.field').find('.floating-label').css('transition', '0.3s ease all');
      }, 100);
    });

    function onInputFocus(ev) {
      $(ev.target).closest('.field').addClass('input-filled');
    }

    function onInputBlur(ev) {
      if (ev.target.value.trim() === '') {
        $(ev.target).closest('.field').removeClass('input-filled');
      }
    }
  }
};
form = {
  checkFields: function checkFields(page) {
    var is_check = false;
    var selector = false;
    switch (page) {
      case 'contact':
        selector = ['name', 'email', 'message'];
        break;
      case 'admin':
        selector = ['email', 'password'];
        break;
    }
    if (selector) {
      is_check = true;
      $('[name="' + selector.join('"], [name="') + '"]').each(function () {
        if (!$(this).val()) {
          is_check = false;
          return;
        }
      });
    }

    return is_check;
  }
};
menu = {
  toggle: function toggle(obj) {
    var menu = $(obj).parents('.side_bar_menu');
    if ($(menu).hasClass('closed')) {
      $(menu).removeClass('closed');
    } else {
      $(menu).addClass('closed');
    }
    console.log(menu);
  }
};

alerts = {
  openHeaderNav: function openHeaderNav(alink) {
    var notifiables = $(alink).find('.badge').html();

    if (notifiables) {
      $.ajax({
        type: 'GET',
        url: laroute.route('service_update_notifiable_alerts'),
        success: function success(data) {
          $(alink).find('.badge').html('');
        }
      });
    }
  }
};

window.Parsley.addValidator('matchto', {
  requirementType: 'string',
  validateString: function validateString(value, requirement) {
    return value.toLowerCase() == $(requirement).val().toLowerCase();
  },
  messages: {
    en: 'Values must match'
  }
});
var inquiry = {
  $topics: null,
  $inquiry_id: null,

  loadInquiryTopics: function loadInquiryTopics(inquiry_id) {
    return $.ajax({
      type: 'POST',
      url: laroute.route('service_load_inquiry_topics'),
      data: {
        inquiry_id: inquiry_id
      },
      success: function success(data) {
        $('.content-area').addClass('hidden');
        $('.industry-topics').html(data);
        $('.industry-topics').removeClass('hidden');
        if (tour) {
          tour.redraw();
        }
      }
    });
  },

  loadInquiryIndustries: function loadInquiryIndustries(inquiry_id) {
    var checkedTopics = $('input:checkbox[name=\'topics\']:checked').length;

    if (!checkedTopics) {
      return false;
    }

    inquiry.$topics = common.getFormData($('.topics-form'), 'topics');

    $('#industry-tags .tag').each(function () {
      var id = $(this).attr('id').replace('industry', '');
      var title = $(this).find('.tag-title').text();
      var data = inquiry.$topics;
      data['industry'] = id;
      data = JSON.stringify(data);

      tags.addTag(title, data, id);
    });

    inquiry.bindSearchIndustries($('#search-industry'), $('.industries-wrapper .industries'), inquiry_id);

    $('.industry-topics').addClass('hidden');
    $('.switch-type').text('industry');
    $('.content-area').removeClass('hidden');
    if (tour) {
      tour.next();
    }
    if (industryRecommendations.toString()) {
      swal({
        title: 'Based on your inquiry, these are the recommended industries:',
        text: common.listIndustryTopicsName(Object.values(industryRecommendations)),
        buttons: {
          cancelIndustry: {
            text: 'Cancel',
            value: 'cancel'
          },
          confirmSelection: {
            text: 'Confirm',
            value: 'confirm'
          },
          select: {
            text: 'Select More',
            value: 'select'
          }
        }
      }).then(function (response) {
        if (response == 'confirm') {
          var selected = $('.tag');
          selected.map(function () {
            $(this).find('.remove')[0].click();
          });
          for (var key in industryRecommendations) {
            if (industryRecommendations.hasOwnProperty(key) && $('.tags-wrapper').find('#industry' + key).length < 1) {
              inquiry.selectIndustry(industryRecommendations[key], key);
            }
          }
          $('button.btn-ylw-done').trigger('click');
        } else if (response == 'select') {
          for (var key in industryRecommendations) {
            if (industryRecommendations.hasOwnProperty(key) && $('.tags-wrapper').find('#industry' + key).length < 1) {
              inquiry.selectIndustry(industryRecommendations[key], key);
            }
          }
        }
      });
    }
  },

  bindSearchIndustries: function bindSearchIndustries(input, wrapper, inquiry_id) {
    inquiry.loadIndustryBlocks(wrapper, input.val(), inquiry_id);

    var timeout = null;
    input.keyup(function () {
      if (timeout) {
        clearTimeout(timeout);
      }

      if (input.length) {
        $('input[name="offset"]').val(0);

        timeout = setTimeout(function () {
          inquiry.loadIndustryBlocks(wrapper, input.val(), inquiry_id, true);
        }, 500);
      }
    });
  },

  loadSearchedIndustryBlocks: function loadSearchedIndustryBlocks(wrapper, term) {
    var offset = 0;
    if ($('input[name="offset"]').length) {
      offset = $('input[name="offset"]').val();
    }
    $.ajax({
      type: 'POST',
      url: laroute.route('service_load_searched_industries'),
      data: {
        offset: offset,
        term: term
      },
      success: function success(data) {
        wrapper.html(data);
      }
    });
  },

  loadMoreIndustryBlocks: function loadMoreIndustryBlocks(wrapper) {
    var offset = 0;
    if ($('input[name="offset"]').length) {
      offset = $('input[name="offset"]').val();
    }

    $.ajax({
      type: 'POST',
      url: laroute.route('service_load_some_industries'),
      data: {
        offset: offset
      },
      success: function success(data) {
        wrapper.append(data);
      }
    });
  },

  loadIndustryBlocks: function loadIndustryBlocks(wrapper, term, inquiry_id, search) {
    var offset = 0;
    if ($('input[name="offset"]').length) {
      offset = $('input[name="offset"]').val();
    }

    $.ajax({
      type: 'POST',
      url: laroute.route('service_load_inquiry_industries'),
      data: {
        term: term,
        offset: offset,
        inquiry_id: inquiry_id
      },
      success: function success(data) {
        if (search) {
          wrapper.html(data);
        } else {
          wrapper.append(data);
        }
      }
    });
  },

  loadMoreIndustries: function loadMoreIndustries(input, wrapper, inquiry_id) {
    var term = null;
    if (input.length) {
      term = input.val();
    }
    var offset = 0;
    if ($('input[name="offset"]').length) {
      offset = parseInt($('input[name="offset"]').val());
      offset++;
      $('input[name="offset"]').val(offset);
    }

    if (inquiry_id) {
      inquiry.loadIndustryBlocks(wrapper, input.val(), inquiry_id);
    } else {
      inquiry.loadMoreIndustryBlocks(wrapper);
    }
  },

  selectIndustry: function selectIndustry(title, id) {
    if ($('#' + tags.$tag_name + id).length) {
      $('#' + tags.$tag_name + id + ' .remove').trigger('click');
    } else {
      var data = inquiry.$topics;
      data['industry'] = id;
      data = JSON.stringify(data);
      tags.addTag(title, data, id);
    }
  },

  loadAllIndustries: function loadAllIndustries(el) {
    if ($(el).is(':checked')) {
      var total = parseInt($('.industries-total')[0].innerText);
      var j = Math.round(total / 12);
      for (var i = 0; i < j; i++) {
        $('.load-more-industries').click();
      }
    }
  },

  selectAllIndustries: function selectAllIndustries(el) {
    this.loadAllIndustries(el);

    if (!$(el).is(':checked')) {
      setTimeout(function () {
        $('.industry').each(function () {
          $(this).click();
        });

        $('.no-industries').addClass('hidden');

        $('.industries-showing')[0].innerText = parseInt($('.industries-total')[0].innerText);
      }, 1000);
    } else {
      setTimeout(function () {
        $('.industry:not(.checked)').each(function () {
          $(this).click();
        });

        $('.no-industries').addClass('hidden');

        $('.industries-showing')[0].innerText = parseInt($('.industries-total')[0].innerText);
      }, 1000);
    }
  },

  bindTopicsFromTag: function bindTopicsFromTag(wrapper) {
    if ($(wrapper + ' .tag').length) {
      var tag = $(wrapper + ' .tag').first();
      var data = tag.find('textarea').val();
      data = $.parseJSON(data);

      if (data.topics) {
        $.each(data.topics, function (key, value) {
          if (key == 'custom') {
            $('.custom-topic .custom-topic-form .form-control').val(value);
            $('#topic-input-custom').trigger('click');
            $('.custom-topic .custom-topic-form .form-control').blur();
          } else {
            $('#topic-input' + value).trigger('click');
          }
        });
      }
    }
  },

  loadInquiries: function loadInquiries(wrapper) {
    var offset = 0;
    if (wrapper.find('input[name="offset"]').length) {
      offset = wrapper.find('input[name="offset"]').val();
    }

    $.ajax({
      type: 'GET',
      url: laroute.route('inquiry_load_list'),
      data: {
        offset: offset
      },
      success: function success(data) {
        wrapper.find('table tbody').append(data);
      }
    });
  },

  loadMoreInquiries: function loadMoreInquiries(wrapper) {
    var offset = 0;
    if (wrapper.find('input[name="offset"]').length) {
      offset = parseInt(wrapper.find('input[name="offset"]').val());
      offset++;
      wrapper.find('input[name="offset"]').val(offset);
    }

    inquiry.loadInquiries(wrapper);
  },

  loadSavedInquiries: function loadSavedInquiries(wrapper) {
    var offset = 0;
    if (wrapper.find('input[name="saved_offset"]').length) {
      offset = wrapper.find('input[name="saved_offset"]').val();
    }

    $.ajax({
      type: 'GET',
      url: laroute.route('saved_inquiry_load_list'),
      data: {
        offset: offset
      },
      success: function success(data) {
        wrapper.find('table tbody').append(data);
      }
    });
  },

  loadMoreSavedInquiries: function loadMoreSavedInquiries(wrapper) {
    var offset = 0;
    if (wrapper.find('input[name="saved_offset"]').length) {
      offset = parseInt(wrapper.find('input[name="saved_offset"]').val());
      offset = offset + 5;
      wrapper.find('input[name="saved_offset"]').val(offset);
    }

    inquiry.loadSavedInquiries(wrapper);
  },

  loadInquiriesHistory: function loadInquiriesHistory(wrapper) {
    var offset = 0;
    if (wrapper.find('input[name="history_offset"]').length) {
      offset = wrapper.find('input[name="history_offset"]').val();
    }

    $.ajax({
      type: 'GET',
      url: laroute.route('inquiry_history_load_list'),
      data: {
        offset: offset
      },
      success: function success(data) {
        wrapper.find('table tbody').append(data);
      }
    });
  },

  loadMoreHistoryInquiries: function loadMoreHistoryInquiries(wrapper) {
    var offset = 0;
    if (wrapper.find('input[name="history_offset"]').length) {
      offset = parseInt(wrapper.find('input[name="history_offset"]').val());
      offset = offset + 5;
      wrapper.find('input[name="history_offset"]').val(offset);
    }

    inquiry.loadInquiriesHistory(wrapper);
  },

  viewInquiryDetails: function viewInquiryDetails(id) {
    $.ajax({
      type: 'GET',
      url: laroute.route('inquiry_view_modal'),
      data: {
        inquiry_id: id
      },
      success: function success(data) {
        $('#inquiry-view-modal .modal-body').html(data);
        $('#inquiry-view-modal').modal();
      }
    });
  },

  redirectToEdit: function redirectToEdit(id) {
    window.location = laroute.route('inquiry_what', { inquiry_id: id });
  },

  resendConfirmation: function resendConfirmation(inquiry_id) {
    $.ajax({
      type: 'POST',
      url: laroute.route('service_resend_inquiry_confirmation', { inquiry_id: inquiry_id }),
      success: function success(data) {
        $('.email-resend').addClass('hidden');
        $('.email-sent').removeClass('hidden');
      }
    });
  },

  openDeleteInquiryModal: function openDeleteInquiryModal(inquiry_id) {
    if ($('#inquiry-view-modal').length) {
      $('#inquiry-view-modal').modal('hide');
    }

    inquiry.$inquiry_id = inquiry_id;

    $('#inquiry-delete-modal').modal();
  },

  inquiryDelete: function inquiryDelete() {
    $.ajax({
      type: 'POST',
      url: laroute.route('inquiry_delete', { inquiry_id: inquiry.$inquiry_id }),
      success: function success(data) {
        $('#inquiry-row-' + inquiry.$inquiry_id).remove();
        inquiry.$inquiry_id = null;
        $('#inquiry-delete-modal').modal('hide');

        $('.inquiries-showing').text(parseInt($('.inquiries-showing').text()) - 1);
        $('.inquiries-total').text(parseInt($('.inquiries-total').text()) - 1);
      }
    });
  },

  saveAsDraft: function saveAsDraft(inquiry_id, step) {
    if (step === 3) {
      inquiry.$topics = common.getFormData($('.topics-form'), 'topics');

      $('#industry-tags .tag').each(function () {
        var id = $(this).attr('id').replace('industry', '');
        var title = $(this).find('.tag-title').text();
        var data = inquiry.$topics;
        data['industry'] = id;
        data = JSON.stringify(data);

        tags.addTag(title, data, id);
      });
      $.ajax({
        type: 'POST',
        url: laroute.route('inquiry_save', { inquiry_id: inquiry_id }),
        data: $('form').serialize(),
        success: function success(data) {
          window.location = laroute.route('profile');
        }
      });
    } else if (step === 2) {
      $.ajax({
        type: 'POST',
        url: laroute.route('inquiry_save', { inquiry_id: inquiry_id }),
        data: $('form').serialize(),
        success: function success(data) {
          window.location = laroute.route('profile');
        }
      });
    } else if (step === 1) {
      $.ajax({
        type: 'POST',
        url: laroute.route('inquiry_save', { inquiry_id: inquiry_id }),
        data: $('form').serialize(),
        success: function success(data) {
          window.location = laroute.route('profile');
        }
      });
    }
  }
};
var pitch = {
  $topics: null,
  $pitch_id: null,

  loadPitchTopics: function loadPitchTopics(pitch_id) {
    return $.ajax({
      type: 'POST',
      url: laroute.route('service_load_pitch_topics'),
      data: {
        pitch_id: pitch_id
      },
      success: function success(data) {
        $('.content-area').addClass('hidden');
        $('.industry-topics').html(data);
        $('.industry-topics').removeClass('hidden');
        if (tour) {
          tour.redraw();
        }
      }
    });
  },

  loadPitchIndustries: function loadPitchIndustries(pitch_id) {
    pitch.$topics = common.getFormData($('.topics-form'), 'topics');

    $('#industry-tags .tag').each(function () {
      var id = $(this).attr('id').replace('industry', '');
      var title = $(this).find('.tag-title').text();
      var data = pitch.$topics;
      data['industry'] = id;
      data = JSON.stringify(data);

      tags.addTag(title, data, id);
    });

    pitch.bindSearchIndustries($('#search-industry'), $('.industries-wrapper .industries'), pitch_id);

    $('.industry-topics').addClass('hidden');
    $('.switch-type').text('industry');
    $('.content-area').removeClass('hidden');
    if (tour) {
      tour.next();
    }
    if (industryRecommendations.toString()) {
      swal({
        title: 'Based on your pitch, these are the recommended industries:',
        text: common.listIndustryTopicsName(Object.values(industryRecommendations)),
        buttons: {
          cancelIndustry: {
            text: 'Cancel',
            value: 'cancel'
          },
          confirmSelection: {
            text: 'Confirm',
            value: 'confirm'
          },
          select: {
            text: 'Select More',
            value: 'select'
          }
        }
      }).then(function (response) {
        if (response == 'confirm') {
          var selected = $('.tag');
          selected.map(function () {
            $(this).find('.remove')[0].click();
          });
          for (var key in industryRecommendations) {
            if (industryRecommendations.hasOwnProperty(key) && $('.tags-wrapper').find('#industry' + key).length < 1) {
              pitch.selectIndustry(industryRecommendations[key], key);
            }
          }
          $('button.btn-ylw-done').trigger('click');
        } else if (response == 'select') {
          for (var key in industryRecommendations) {
            if (industryRecommendations.hasOwnProperty(key) && $('.tags-wrapper').find('#industry' + key).length < 1) {
              pitch.selectIndustry(industryRecommendations[key], key);
            }
          }
        }
      });
    }
  },

  bindSearchIndustries: function bindSearchIndustries(input, wrapper, pitch_id) {
    pitch.loadIndustryBlocks(wrapper, input.val(), pitch_id);

    var timeout = null;
    input.keyup(function () {
      if (timeout) {
        clearTimeout(timeout);
      }

      if (input.length) {
        $('input[name="offset"]').val(0);

        timeout = setTimeout(function () {
          pitch.loadIndustryBlocks(wrapper, input.val(), pitch_id, true);
        }, 500);
      }
    });
  },

  loadSearchedIndustryBlocks: function loadSearchedIndustryBlocks(wrapper, term) {
    var offset = 0;
    if ($('input[name="offset"]').length) {
      offset = $('input[name="offset"]').val();
    }
    $.ajax({
      type: 'POST',
      url: laroute.route('service_load_searched_industries'),
      data: {
        offset: offset,
        term: term
      },
      success: function success(data) {
        wrapper.html(data);
      }
    });
  },

  loadMoreIndustryBlocks: function loadMoreIndustryBlocks(wrapper) {
    var offset = 0;
    if ($('input[name="offset"]').length) {
      offset = $('input[name="offset"]').val();
    }

    $.ajax({
      type: 'POST',
      url: laroute.route('service_load_some_industries'),
      data: {
        offset: offset
      },
      success: function success(data) {
        wrapper.append(data);
      }
    });
  },

  loadIndustryBlocks: function loadIndustryBlocks(wrapper, term, pitch_id, search) {
    var offset = 0;
    if ($('input[name="offset"]').length) {
      offset = $('input[name="offset"]').val();
    }

    $.ajax({
      type: 'POST',
      url: laroute.route('service_load_pitch_industries'),
      data: {
        term: term,
        offset: offset,
        pitch_id: pitch_id
      },
      success: function success(data) {
        if (search) {
          wrapper.html(data);
        } else {
          wrapper.append(data);
        }
      }
    });
  },

  loadMoreIndustries: function loadMoreIndustries(input, wrapper, pitch_id) {
    var term = null;
    if (input.length) {
      term = input.val();
    }
    var offset = 0;
    if ($('input[name="offset"]').length) {
      offset = parseInt($('input[name="offset"]').val());
      offset++;
      $('input[name="offset"]').val(offset);
    }

    if (pitch_id) {
      pitch.loadIndustryBlocks(wrapper, input.val(), pitch_id);
    } else {
      pitch.loadMoreIndustryBlocks(wrapper);
    }
  },

  selectIndustry: function selectIndustry(title, id) {
    if ($('.tag').length < 5) {
      if ($('#' + tags.$tag_name + id).length) {
        $('#' + tags.$tag_name + id + ' .remove').trigger('click');
      } else {
        var data = pitch.$topics;
        data['industry'] = id;
        data = JSON.stringify(data);
        tags.addTag(title, data, id);
      }
    } else {
      $('#industry-block' + id).find('.check-circle > input[type="checkbox"]:checked + .check-mark, .check-circle > input[type="radio"]:checked').prop('checked', false);
      if ($('#' + tags.$tag_name + id).length) {
        $('#' + tags.$tag_name + id + ' .remove').trigger('click');
      } else {
        swal({
          title: 'You cannot select more than 5 industries',
          text: 'A maximum of 5 industry selections is allowed. If you want to add more, please contact support.',
          buttons: {
            hiddenButton: {
              text: 'Cancel',
              value: null
            },
            select: {
              text: 'OK',
              value: 'confirm'
            }
          }
        });
      }
    }
  },

  bindTopicsFromTag: function bindTopicsFromTag(wrapper) {
    if ($(wrapper + ' .tag').length) {
      var tag = $(wrapper + ' .tag').first();
      var data = tag.find('textarea').val();
      data = $.parseJSON(data);

      if (data.topics) {
        $.each(data.topics, function (key, value) {
          if (key == 'custom') {
            $('.custom-topic .custom-topic-form .form-control').val(value);
            $('#topic-input-custom').trigger('click');
            $('.custom-topic .custom-topic-form .form-control').blur();
          } else {
            $('#topic-input' + value).trigger('click');
          }
        });
      }
    }
  },

  loadPitches: function loadPitches(wrapper) {
    var offset = 0;
    if (wrapper.find('input[name="offset"]').length) {
      offset = wrapper.find('input[name="offset"]').val();
    }

    $.ajax({
      type: 'GET',
      url: laroute.route('pitch_load_list'),
      data: {
        offset: offset
      },
      success: function success(data) {
        wrapper.find('table tbody').append(data);
      }
    });
  },

  loadMorePitches: function loadMorePitches(wrapper) {
    var offset = 0;
    if (wrapper.find('input[name="offset"]').length) {
      offset = parseInt(wrapper.find('input[name="offset"]').val());
      offset++;
      wrapper.find('input[name="offset"]').val(offset);
    }

    pitch.loadPitches(wrapper);
  },

  loadSavedPitches: function loadSavedPitches(wrapper) {
    var offset = 0;
    if (wrapper.find('input[name="saved_offset"]').length) {
      offset = wrapper.find('input[name="saved_offset"]').val();
    }

    $.ajax({
      type: 'GET',
      url: laroute.route('saved_pitch_load_list'),
      data: {
        offset: offset
      },
      success: function success(data) {
        wrapper.find('table tbody').append(data);
      }
    });
  },

  loadMoreSavedPitches: function loadMoreSavedPitches(wrapper) {
    var offset = 0;
    if (wrapper.find('input[name="saved_offset"]').length) {
      offset = parseInt(wrapper.find('input[name="saved_offset"]').val());
      offset = offset + 5;
      wrapper.find('input[name="saved_offset"]').val(offset);
    }

    pitch.loadSavedPitches(wrapper);
  },

  loadPitchesHistory: function loadPitchesHistory(wrapper) {
    var offset = 0;
    if (wrapper.find('input[name="history_offset"]').length) {
      offset = wrapper.find('input[name="history_offset"]').val();
    }

    $.ajax({
      type: 'GET',
      url: laroute.route('pitch_history_load_list'),
      data: {
        offset: offset
      },
      success: function success(data) {
        wrapper.find('table tbody').append(data);
      }
    });
  },

  loadMoreHistoryPitches: function loadMoreHistoryPitches(wrapper) {
    var offset = 0;
    if (wrapper.find('input[name="history_offset"]').length) {
      offset = parseInt(wrapper.find('input[name="history_offset"]').val());
      offset = offset + 5;
      wrapper.find('input[name="history_offset"]').val(offset);
    }

    pitch.loadPitchesHistory(wrapper);
  },

  viewPitchDetails: function viewPitchDetails(id) {
    $.ajax({
      type: 'GET',
      url: laroute.route('pitch_view_modal'),
      data: {
        pitch_id: id
      },
      success: function success(data) {
        $('#pitch-view-modal .modal-body').html(data);
        $('#pitch-view-modal').modal();
      }
    });
  },

  viewSavedPitchDetails: function viewSavedPitchDetails(id) {
    $.ajax({
      type: 'GET',
      url: laroute.route('saved_pitch_view_modal'),
      data: {
        pitch_id: id
      },
      success: function success(data) {
        $('#pitch-view-modal .modal-body').html(data);
        $('#pitch-view-modal').modal();
      }
    });
  },

  redirectToEdit: function redirectToEdit(id) {
    window.location = laroute.route('pitch_what', { pitch_id: id });
  },

  resendConfirmation: function resendConfirmation(pitch_id) {
    $.ajax({
      type: 'POST',
      url: laroute.route('service_resend_pitch_confirmation', { pitch_id: pitch_id }),
      success: function success(data) {
        $('.email-resend').addClass('hidden');
        $('.email-sent').removeClass('hidden');
      }
    });
  },

  openDeletePitchModal: function openDeletePitchModal(pitch_id) {
    if ($('#pitch-view-modal').length) {
      $('#pitch-view-modal').modal('hide');
    }

    pitch.$pitch_id = pitch_id;

    $('#pitch-delete-modal').modal();
  },

  pitchDelete: function pitchDelete() {
    $.ajax({
      type: 'POST',
      url: laroute.route('pitch_delete', { pitch_id: pitch.$pitch_id }),
      success: function success(data) {
        $('#pitch-row-' + pitch.$pitch_id).remove();
        pitch.$pitch_id = null;
        $('#pitch-delete-modal').modal('hide');

        $('.pitches-showing').text(parseInt($('.pitches-showing').text()) - 1);
        $('.pitches-total').text(parseInt($('.pitches-total').text()) - 1);
      }
    });
  },

  saveAsDraft: function saveAsDraft(pitch_id, step) {
    if (step === 3) {
      pitch.$topics = common.getFormData($('.topics-form'), 'topics');

      $('#industry-tags .tag').each(function () {
        var id = $(this).attr('id').replace('industry', '');
        var title = $(this).find('.tag-title').text();
        var data = pitch.$topics;
        data['industry'] = id;
        data = JSON.stringify(data);

        tags.addTag(title, data, id);
      });
      $.ajax({
        type: 'POST',
        url: laroute.route('pitch_save', { pitch_id: pitch_id }),
        data: $('form').serialize(),
        success: function success(data) {
          window.location = laroute.route('profile');
        }
      });
    } else if (step === 2) {
      $.ajax({
        type: 'POST',
        url: laroute.route('pitch_save', { pitch_id: pitch_id }),
        data: $('form').serialize(),
        success: function success(data) {
          window.location = laroute.route('profile');
        }
      });
    } else if (step === 1) {
      $.ajax({
        type: 'POST',
        url: laroute.route('pitch_save', { pitch_id: pitch_id }),
        data: $('form').serialize(),
        success: function success(data) {
          window.location = laroute.route('profile');
        }
      });
    }
  }
};
var pitchApprobalTool = {
  $topics: [],
  $industries: [],
  $industryDotElm: $(document).find('.industryDot.dot'),
  $industryInsideDotElm: $(document).find('.industryDot.insidedot'),

  setIndustry: function setIndustry(industry) {
    this.$industries.push(industry);
  },

  setIndustryTags: function setIndustryTags() {
    var industryCount = parseInt($('#industry-tags .tag').length);

    if (industryCount >= 3) {
      this.$industryDotElm.removeClass('yellow').removeClass('red').addClass('green');
      this.$industryInsideDotElm.html(industryCount + '/' + '3<br/>Great work');
    } else if (industryCount === 2) {
      this.$industryDotElm.removeClass('green').removeClass('red').addClass('yellow');
      this.$industryInsideDotElm.html(industryCount + '/' + '3<br/>Approved but could be better');
    } else if (industryCount <= 1) {
      this.$industryDotElm.removeClass('yellow').removeClass('green').addClass('red');
      this.$industryInsideDotElm.html(industryCount + '/' + '3<br/>Needs work');
    }
  }
};
var tags = {

  $tag_html: '<div class="tag"><span class="tag-title">{tag_title}</span><i class="material-icons remove">close</i></div>',
  $tag_name: 'tag',
  $wrapper: '.tags',
  $update_callback: '',

  bind: function bind(wrapper, tag_name, update_callback) {
    tags.$wrapper = wrapper ? wrapper : '.tags';
    tags.$tag_name = tag_name ? tag_name : 'tag';
    tags.$update_callback = update_callback ? update_callback : '';

    tags.bindRemoveTag();
  },

  bindRemoveTag: function bindRemoveTag() {
    $(tags.$wrapper + ' .remove').unbind('click').bind('click', tags.removeTag);
  },

  bindCallbackFunction: function bindCallbackFunction() {
    if (tags.$update_callback) {
      window[tags.$update_callback](tags.$wrapper);
    }
  },

  removeTag: function removeTag() {
    $(this).closest('.tag').remove();

    tags.bindCallbackFunction();
    pitchApprobalTool.setIndustryTags();
  },

  addTag: function addTag(title, data, tag_id) {
    var html = tags.$tag_html;
    html = html.replace('{tag_title}', title);
    var input = '<textarea name="' + tags.$tag_name + '[]">' + data + '</textarea>';
    html = $(html).append(input);
    if (tag_id) {
      html = $(html).attr('id', tags.$tag_name + tag_id);
    }

    if (tag_id && $('#' + tags.$tag_name + tag_id).length) {
      $('#' + tags.$tag_name + tag_id).replaceWith(html);
    } else {
      $(tags.$wrapper).append(html);
    }

    tags.bindRemoveTag();
    tags.bindCallbackFunction();
    pitchApprobalTool.setIndustryTags();
  }
};