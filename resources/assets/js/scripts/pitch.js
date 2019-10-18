var pitch = {
  $topics: null,
  $pitch_id: null,

  loadPitchTopics: function (pitch_id) {
    return $.ajax({
      type: 'POST',
      url: laroute.route('service_load_pitch_topics'),
      data: {
        pitch_id: pitch_id,
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

  loadPitchIndustries: function (pitch_id) {
    pitch.$topics = common.getFormData($('.topics-form'), 'topics')

    $('#industry-tags .tag').each(function () {
      var id = $(this).attr('id').replace('industry', '')
      var title = $(this).find('.tag-title').text()
      var data = pitch.$topics
      data['industry'] = id
      data = JSON.stringify(data)

      tags.addTag(title, data, id)
    })

    pitch.bindSearchIndustries($('#search-industry'),
      $('.industries-wrapper .industries'), pitch_id)

    $('.industry-topics').addClass('hidden')
    $('.switch-type').text('industry')
    $('.content-area').removeClass('hidden')
    if (tour) {
      tour.next()
    }
    if (industryRecommendations.toString()) {
      swal({
        title: 'Based on your pitch, these are the recommended industries:',
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
              pitch.selectIndustry(industryRecommendations[key], key)
            }
          }
          $('button.btn-ylw-done').trigger('click')
        } else if (response == 'select') {
          for (var key in industryRecommendations) {
            if (industryRecommendations.hasOwnProperty(key) &&
              $('.tags-wrapper').find('#industry' + key).length < 1) {
              pitch.selectIndustry(industryRecommendations[key], key)
            }
          }
        }
      })
    }
  },

  bindSearchIndustries: function (input, wrapper, pitch_id) {
    pitch.loadIndustryBlocks(wrapper, input.val(), pitch_id)

    var timeout = null
    input.keyup(function () {
      if (timeout) {
        clearTimeout(timeout)
      }

      if (input.length) {
        $('input[name="offset"]').val(0)

        timeout = setTimeout(function () {
          pitch.loadIndustryBlocks(wrapper, input.val(), pitch_id, true)
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

  loadIndustryBlocks: function (wrapper, term, pitch_id, search) {
    var offset = 0
    if ($('input[name="offset"]').length) {
      offset = $('input[name="offset"]').val()
    }

    $.ajax({
      type: 'POST',
      url: laroute.route('service_load_pitch_industries'),
      data: {
        term: term,
        offset: offset,
        pitch_id: pitch_id,
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

  loadMoreIndustries: function (input, wrapper, pitch_id) {
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

    if (pitch_id) {
      pitch.loadIndustryBlocks(wrapper, input.val(), pitch_id)
    } else {
      pitch.loadMoreIndustryBlocks(wrapper)
    }

  },

  selectIndustry: function (title, id) {
    if ($('.tag').length < 5) {
      if ($('#' + tags.$tag_name + id).length) {
        $('#' + tags.$tag_name + id + ' .remove').trigger('click')
      } else {
        var data = pitch.$topics
        data['industry'] = id
        data = JSON.stringify(data)
        tags.addTag(title, data, id)
      }
    } else {
      $('#industry-block' + id).
        find(
          '.check-circle > input[type="checkbox"]:checked + .check-mark, .check-circle > input[type="radio"]:checked').
        prop('checked', false)
      if ($('#' + tags.$tag_name + id).length) {
        $('#' + tags.$tag_name + id + ' .remove').trigger('click')
      } else {
        swal({
          title: 'You cannot select more than 5 industries',
          text: 'A maximum of 5 industry selections is allowed. If you want to add more, please contact support.',
          buttons: {
            hiddenButton: {
              text: 'Cancel',
              value: null,
            },
            select: {
              text: 'OK',
              value: 'confirm',
            },
          },
        })
      }
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

  loadPitches: function (wrapper) {
    var offset = 0
    if (wrapper.find('input[name="offset"]').length) {
      offset = wrapper.find('input[name="offset"]').val()
    }

    $.ajax({
      type: 'GET',
      url: laroute.route('pitch_load_list'),
      data: {
        offset: offset,
      },
      success: function (data) {
        wrapper.find('table tbody').append(data)
      },
    })
  },

  loadMorePitches: function (wrapper) {
    var offset = 0
    if (wrapper.find('input[name="offset"]').length) {
      offset = parseInt(wrapper.find('input[name="offset"]').val())
      offset++
      wrapper.find('input[name="offset"]').val(offset)
    }

    pitch.loadPitches(wrapper)
  },

  loadSavedPitches: function (wrapper) {
    var offset = 0
    if (wrapper.find('input[name="saved_offset"]').length) {
      offset = wrapper.find('input[name="saved_offset"]').val()
    }

    $.ajax({
      type: 'GET',
      url: laroute.route('saved_pitch_load_list'),
      data: {
        offset: offset,
      },
      success: function (data) {
        wrapper.find('table tbody').append(data)
      },
    })
  },

  loadMoreSavedPitches: function (wrapper) {
    var offset = 0
    if (wrapper.find('input[name="saved_offset"]').length) {
      offset = parseInt(wrapper.find('input[name="saved_offset"]').val())
      offset = offset + 5
      wrapper.find('input[name="saved_offset"]').val(offset)
    }

    pitch.loadSavedPitches(wrapper)
  },

  loadPitchesHistory: function (wrapper) {
    var offset = 0
    if (wrapper.find('input[name="history_offset"]').length) {
      offset = wrapper.find('input[name="history_offset"]').val()
    }

    $.ajax({
      type: 'GET',
      url: laroute.route('pitch_history_load_list'),
      data: {
        offset: offset,
      },
      success: function (data) {
        wrapper.find('table tbody').append(data)
      },
    })
  },

  loadMoreHistoryPitches: function (wrapper) {
    var offset = 0
    if (wrapper.find('input[name="history_offset"]').length) {
      offset = parseInt(wrapper.find('input[name="history_offset"]').val())
      offset = offset + 5
      wrapper.find('input[name="history_offset"]').val(offset)
    }

    pitch.loadPitchesHistory(wrapper)
  },

  viewPitchDetails: function (id) {
    $.ajax({
      type: 'GET',
      url: laroute.route('pitch_view_modal'),
      data: {
        pitch_id: id,
      },
      success: function (data) {
        $('#pitch-view-modal .modal-body').html(data)
        $('#pitch-view-modal').modal()
      },
    })
  },

  viewSavedPitchDetails: function (id) {
    $.ajax({
      type: 'GET',
      url: laroute.route('saved_pitch_view_modal'),
      data: {
        pitch_id: id,
      },
      success: function (data) {
        $('#pitch-view-modal .modal-body').html(data)
        $('#pitch-view-modal').modal()
      },
    })
  },

  redirectToEdit: function (id) {
    window.location = laroute.route('pitch_what', { pitch_id: id })
  },

  resendConfirmation: function (pitch_id) {
    $.ajax({
      type: 'POST',
      url: laroute.route('service_resend_pitch_confirmation',
        { pitch_id: pitch_id }),
      success: function (data) {
        $('.email-resend').addClass('hidden')
        $('.email-sent').removeClass('hidden')
      },
    })
  },

  openDeletePitchModal: function (pitch_id) {
    if ($('#pitch-view-modal').length) {
      $('#pitch-view-modal').modal('hide')
    }

    pitch.$pitch_id = pitch_id

    $('#pitch-delete-modal').modal()
  },

  pitchDelete: function () {
    $.ajax({
      type: 'POST',
      url: laroute.route('pitch_delete', { pitch_id: pitch.$pitch_id }),
      success: function (data) {
        $('#pitch-row-' + pitch.$pitch_id).remove()
        pitch.$pitch_id = null
        $('#pitch-delete-modal').modal('hide')

        $('.pitches-showing').text(parseInt($('.pitches-showing').text()) - 1)
        $('.pitches-total').text(parseInt($('.pitches-total').text()) - 1)
      },
    })
  },

  saveAsDraft: function (pitch_id, step) {
    if (step === 3) {
      pitch.$topics = common.getFormData($('.topics-form'), 'topics')

      $('#industry-tags .tag').each(function () {
        var id = $(this).attr('id').replace('industry', '')
        var title = $(this).find('.tag-title').text()
        var data = pitch.$topics
        data['industry'] = id
        data = JSON.stringify(data)

        tags.addTag(title, data, id)
      })
      $.ajax({
        type: 'POST',
        url: laroute.route('pitch_save', { pitch_id: pitch_id }),
        data: $('form').serialize(),
        success: function (data) {
          window.location = laroute.route('profile')
        },
      })
    } else if (step === 2) {
      $.ajax({
        type: 'POST',
        url: laroute.route('pitch_save', { pitch_id: pitch_id }),
        data: $('form').serialize(),
        success: function (data) {
          window.location = laroute.route('profile')
        },
      })

    } else if (step === 1) {
      $.ajax({
        type: 'POST',
        url: laroute.route('pitch_save', { pitch_id: pitch_id }),
        data: $('form').serialize(),
        success: function (data) {
          window.location = laroute.route('profile')
        },
      })
    }
  },  
}