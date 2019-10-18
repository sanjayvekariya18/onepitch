var tags = {

  $tag_html: '<div class="tag"><span class="tag-title">{tag_title}</span><i class="material-icons remove">close</i></div>',
  $tag_name: 'tag',
  $wrapper: '.tags',
  $update_callback: '',

  bind: function (wrapper, tag_name, update_callback) {
    tags.$wrapper = wrapper ? wrapper : '.tags'
    tags.$tag_name = tag_name ? tag_name : 'tag'
    tags.$update_callback = update_callback ? update_callback : ''

    tags.bindRemoveTag()
  },

  bindRemoveTag: function () {
    $(tags.$wrapper + ' .remove').unbind('click').bind('click', tags.removeTag)
  },

  bindCallbackFunction: function () {
    if (tags.$update_callback) {
      window[tags.$update_callback](tags.$wrapper)
    }
  },

  removeTag: function () {
    $(this).closest('.tag').remove()

    tags.bindCallbackFunction()
    pitchApprobalTool.setIndustryTags();
  },

  addTag: function (title, data, tag_id) {
    var html = tags.$tag_html
    html = html.replace('{tag_title}', title)
    var input = '<textarea name="' + tags.$tag_name + '[]">' + data +
      '</textarea>'
    html = $(html).append(input)
    if (tag_id) {
      html = $(html).attr('id', tags.$tag_name + tag_id)
    }

    if (tag_id && $('#' + tags.$tag_name + tag_id).length) {
      $('#' + tags.$tag_name + tag_id).replaceWith(html)
    } else {
      $(tags.$wrapper).append(html)
    }

    tags.bindRemoveTag()
    tags.bindCallbackFunction()
    pitchApprobalTool.setIndustryTags();
  },
}