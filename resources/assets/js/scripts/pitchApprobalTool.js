var pitchApprobalTool = {
  $topics: [],
  $industries: [],
  $industryDotElm: $(document).find('.industryDot.dot'),
  $industryInsideDotElm: $(document).find('.industryDot.insidedot'),

  setIndustry: function (industry) {
    this.$industries.push(industry)
  },

  setIndustryTags: function () {
    let industryCount = parseInt($('#industry-tags .tag').length)

    if (industryCount >= 3) {
      this.$industryDotElm.removeClass('yellow').
        removeClass('red').
        addClass('green')
      this.$industryInsideDotElm.html(industryCount + '/' + '3<br/>Great work')
    } else if (industryCount === 2) {
      this.$industryDotElm.removeClass('green').
        removeClass('red').
        addClass('yellow')
      this.$industryInsideDotElm.html(
        industryCount + '/' + '3<br/>Approved but could be better')
    } else if (industryCount <= 1) {
      this.$industryDotElm.removeClass('yellow').
        removeClass('green').
        addClass('red')
      this.$industryInsideDotElm.html(industryCount + '/' + '3<br/>Needs work')
    }
  },
}