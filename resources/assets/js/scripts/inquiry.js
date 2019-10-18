var inquiry = {
  $topics: null,
  $inquiry_id: null,

  loadInquiryTopics: function (inquiry_id) {
    return $.ajax({
      type: 'POST',
      url: laroute.route('service_load_inquiry_topics'),
      data: {
        inquiry_id: inquiry_id,
      },
      success: function (data) {
        $('.content-area').addClass('hidden')
        $('.industry-topics').html(data)
        $('.industry-topics').removeClass('hidden')
        if (tour) {
          tour.redraw()
        }
      },
    })
  },

  loadInquiryIndustries: function (inquiry_id) {
    var checkedTopics = $('input:checkbox[name=\'topics\']:checked').length

    if (!checkedTopics) {
      return false
    }

    inquiry.$topics = common.getFormData($('.topics-form'), 'topics')

    $('#industry-tags .tag').each(function () {
      var id = $(this).attr('id').replace('industry', '')
      var title = $(this).find('.tag-title').text()
      var data = inquiry.$topics
      data['industry'] = id
      data = JSON.stringify(data)

      tags.addTag(title, data, id)
    })

    inquiry.bindSearchIndustries($('#search-industry'),
      $('.industries-wrapper .industries'), inquiry_id)

    $('.industry-topics').addClass('hidden')
    $('.switch-type').text('industry')
    $('.content-area').removeClass('hidden')
    if (tour) {
      tour.next()
    }
    if (industryRecommendations.toString()) {
      swal({
        title: 'Based on your inquiry, these are the recommended industries:',
        text: common.listIndustryTopicsName(
          Object.values(industryRecommendations)),
        buttons: {
          cancelIndustry: {
            text: 'Cancel',
            value: 'cancel',
          },
          confirmSelection: {
            text: 'Confirm',
            value: 'confirm',
          },
          select: {
            text: 'Select More',
            value: 'select',
          },
        },
      }).then(function (response) {
        if (response == 'confirm') {
          var selected = $('.tag')
          selected.map(function () {
            $(this).find('.remove')[0].click()
          })
          for (var key in industryRecommendations) {
            if (industryRecommendations.hasOwnProperty(key) &&
              $('.tags-wrapper').find('#industry' + key).length < 1) {
              inquiry.selectIndustry(industryRecommendations[key], key)
            }
          }
          $('button.btn-ylw-done').trigger('click')
        } else if (response == 'select') {
          for (var key in industryRecommendations) {
            if (industryRecommendations.hasOwnProperty(key) &&
              $('.tags-wrapper').find('#industry' + key).length < 1) {
              inquiry.selectIndustry(industryRecommendations[key], key)
            }
          }
        }
      })
    }
  },

  bindSearchIndustries: function (input, wrapper, inquiry_id) {
    inquiry.loadIndustryBlocks(wrapper, input.val(), inquiry_id)

    var timeout = null
    input.keyup(function () {
      if (timeout) {
        clearTimeout(timeout)
      }

      if (input.length) {
        $('input[name="offset"]').val(0)

        timeout = setTimeout(function () {
          inquiry.loadIndustryBlocks(wrapper, input.val(), inquiry_id, true)
        }, 500)
      }
    })
  },

  loadSearchedIndustryBlocks: function (wrapper, term) {
    var offset = 0
    if ($('input[name="offset"]').length) {
      offset = $('input[name="offset"]').val()
    }
    $.ajax({
      type: 'POST',
      url: laroute.route('service_load_searched_industries'),
      data: {
        offset: offset,
        term: term,
      },
      success: function (data) {
        wrapper.html(data)
      },
    })
  },

  loadMoreIndustryBlocks: function (wrapper) {
    var offset = 0
    if ($('input[name="offset"]').length) {
      offset = $('input[name="offset"]').val()
    }

    $.ajax({
      type: 'POST',
      url: laroute.route('service_load_some_industries'),
      data: {
        offset: offset,
      },
      success: function (data) {
        wrapper.append(data)
      },
    })
  },

  loadIndustryBlocks: function (wrapper, term, inquiry_id, search) {
    var offset = 0
    if ($('input[name="offset"]').length) {
      offset = $('input[name="offset"]').val()
    }

    $.ajax({
      type: 'POST',
      url: laroute.route('service_load_inquiry_industries'),
      data: {
        term: term,
        offset: offset,
        inquiry_id: inquiry_id,
      },
      success: function (data) {
        if (search) {
          wrapper.html(data)
        } else {
          wrapper.append(data)
        }
      },
    })
  },

  loadMoreIndustries: function (input, wrapper, inquiry_id) {
    var term = null
    if (input.length) {
      term = input.val()
    }
    var offset = 0
    if ($('input[name="offset"]').length) {
      offset = parseInt($('input[name="offset"]').val())
      offset++
      $('input[name="offset"]').val(offset)
    }

    if (inquiry_id) {
      inquiry.loadIndustryBlocks(wrapper, input.val(), inquiry_id)
    } else {
      inquiry.loadMoreIndustryBlocks(wrapper)
    }

  },

  selectIndustry: function (title, id) {
    if ($('#' + tags.$tag_name + id).length) {
      $('#' + tags.$tag_name + id + ' .remove').trigger('click')
    } else {
      var data = inquiry.$topics
      data['industry'] = id
      data = JSON.stringify(data)
      tags.addTag(title, data, id)
    }

  },

  loadAllIndustries: function (el) {
    if ($(el).is(':checked')) {
      var total = parseInt($('.industries-total')[0].innerText)
      var j = Math.round(total / 12)
      for (var i = 0; i < j; i++) {
        $('.load-more-industries').click()
      }
    }
  },

  selectAllIndustries: function (el) {
    this.loadAllIndustries(el)

    if (!$(el).is(':checked')) {
      setTimeout(function () {
        $('.industry').each(function () {
          $(this).click()
        })

        $('.no-industries').addClass('hidden')

        $('.industries-showing')[0].innerText = parseInt(
          $('.industries-total')[0].innerText)
      }, 1000)
    } else {
      setTimeout(function () {
        $('.industry:not(.checked)').each(function () {
          $(this).click()
        })

        $('.no-industries').addClass('hidden')

        $('.industries-showing')[0].innerText = parseInt(
          $('.industries-total')[0].innerText)
      }, 1000)
    }
  },

  bindTopicsFromTag: function (wrapper) {
    if ($(wrapper + ' .tag').length) {
      var tag = $(wrapper + ' .tag').first()
      var data = tag.find('textarea').val()
      data = $.parseJSON(data)

      if (data.topics) {
        $.each(data.topics, function (key, value) {
          if (key == 'custom') {
            $('.custom-topic .custom-topic-form .form-control').val(value)
            $('#topic-input-custom').trigger('click')
            $('.custom-topic .custom-topic-form .form-control').blur()
          } else {
            $('#topic-input' + value).trigger('click')
          }
        })
      }
    }
  },

  loadInquiries: function (wrapper) {
    var offset = 0
    if (wrapper.find('input[name="offset"]').length) {
      offset = wrapper.find('input[name="offset"]').val()
    }

    $.ajax({
      type: 'GET',
      url: laroute.route('inquiry_load_list'),
      data: {
        offset: offset,
      },
      success: function (data) {
        wrapper.find('table tbody').append(data)
      },
    })
  },

  loadMoreInquiries: function (wrapper) {
    var offset = 0
    if (wrapper.find('input[name="offset"]').length) {
      offset = parseInt(wrapper.find('input[name="offset"]').val())
      offset++
      wrapper.find('input[name="offset"]').val(offset)
    }

    inquiry.loadInquiries(wrapper)
  },

  loadSavedInquiries: function (wrapper) {
    var offset = 0
    if (wrapper.find('input[name="saved_offset"]').length) {
      offset = wrapper.find('input[name="saved_offset"]').val()
    }

    $.ajax({
      type: 'GET',
      url: laroute.route('saved_inquiry_load_list'),
      data: {
        offset: offset,
      },
      success: function (data) {
        wrapper.find('table tbody').append(data)
      },
    })
  },

  loadMoreSavedInquiries: function (wrapper) {
    var offset = 0
    if (wrapper.find('input[name="saved_offset"]').length) {
      offset = parseInt(wrapper.find('input[name="saved_offset"]').val())
      offset = offset + 5
      wrapper.find('input[name="saved_offset"]').val(offset)
    }

    inquiry.loadSavedInquiries(wrapper)
  },

  loadInquiriesHistory: function (wrapper) {
    var offset = 0
    if (wrapper.find('input[name="history_offset"]').length) {
      offset = wrapper.find('input[name="history_offset"]').val()
    }

    $.ajax({
      type: 'GET',
      url: laroute.route('inquiry_history_load_list'),
      data: {
        offset: offset,
      },
      success: function (data) {
        wrapper.find('table tbody').append(data)
      },
    })
  },

  loadMoreHistoryInquiries: function (wrapper) {
    var offset = 0
    if (wrapper.find('input[name="history_offset"]').length) {
      offset = parseInt(wrapper.find('input[name="history_offset"]').val())
      offset = offset + 5
      wrapper.find('input[name="history_offset"]').val(offset)
    }

    inquiry.loadInquiriesHistory(wrapper)
  },

  viewInquiryDetails: function (id) {
    $.ajax({
      type: 'GET',
      url: laroute.route('inquiry_view_modal'),
      data: {
        inquiry_id: id,
      },
      success: function (data) {
        $('#inquiry-view-modal .modal-body').html(data)
        $('#inquiry-view-modal').modal()
      },
    })
  },

  redirectToEdit: function (id) {
    window.location = laroute.route('inquiry_what', { inquiry_id: id })
  },

  resendConfirmation: function (inquiry_id) {
    $.ajax({
      type: 'POST',
      url: laroute.route('service_resend_inquiry_confirmation',
        { inquiry_id: inquiry_id }),
      success: function (data) {
        $('.email-resend').addClass('hidden')
        $('.email-sent').removeClass('hidden')
      },
    })
  },

  openDeleteInquiryModal: function (inquiry_id) {
    if ($('#inquiry-view-modal').length) {
      $('#inquiry-view-modal').modal('hide')
    }

    inquiry.$inquiry_id = inquiry_id

    $('#inquiry-delete-modal').modal()
  },

  inquiryDelete: function () {
    $.ajax({
      type: 'POST',
      url: laroute.route('inquiry_delete', { inquiry_id: inquiry.$inquiry_id }),
      success: function (data) {
        $('#inquiry-row-' + inquiry.$inquiry_id).remove()
        inquiry.$inquiry_id = null
        $('#inquiry-delete-modal').modal('hide')

        $('.inquiries-showing').
          text(parseInt($('.inquiries-showing').text()) - 1)
        $('.inquiries-total').text(parseInt($('.inquiries-total').text()) - 1)
      },
    })
  },

  saveAsDraft: function (inquiry_id, step) {
    if (step === 3) {
      inquiry.$topics = common.getFormData($('.topics-form'), 'topics')

      $('#industry-tags .tag').each(function () {
        var id = $(this).attr('id').replace('industry', '')
        var title = $(this).find('.tag-title').text()
        var data = inquiry.$topics
        data['industry'] = id
        data = JSON.stringify(data)

        tags.addTag(title, data, id)
      })
      $.ajax({
        type: 'POST',
        url: laroute.route('inquiry_save', { inquiry_id: inquiry_id }),
        data: $('form').serialize(),
        success: function (data) {
          window.location = laroute.route('profile')
        },
      })
    } else if (step === 2) {
      $.ajax({
        type: 'POST',
        url: laroute.route('inquiry_save', { inquiry_id: inquiry_id }),
        data: $('form').serialize(),
        success: function (data) {
          window.location = laroute.route('profile')
        },
      })
    } else if (step === 1) {
      $.ajax({
        type: 'POST',
        url: laroute.route('inquiry_save', { inquiry_id: inquiry_id }),
        data: $('form').serialize(),
        success: function (data) {
          window.location = laroute.route('profile')
        },
      })
    }
  },
}