<template>
    <div id="modal-add-industry" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>{{(faq.id)? 'Edit':'Add'}} FAQ</h4>
            <div class="row">
                <input type="hidden" v-model="faq.faq_category_id" name="faq_category_id" id="faq_category_id">

                <div class="form-group col-sm-12">
                    <input type="text" class="form-control" name="title" v-model="faq.question"
                           placeholder="Write here the question..." required>
                    <label>Write here the question...</label>
                    <div class="counter"></div>
                </div>

                <div class="form-group col-sm-12">
                    <textarea class="form-control" name="description" v-model="faq.answer"
                              placeholder="Write here the body of the answer..."></textarea>
                    <label>Write here the body of the answer...</label>
                    <div class="for-textarea"></div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div v-if="!this.saving">
                <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
                <button v-on:click="trigger('yes')" v-if="!faq.id" class="btn btn-yellow"
                        :disabled="invalidForm()">ADD FAQ
                </button>
                <button v-on:click="trigger('edit')" v-if="faq.id" class="btn btn-yellow"
                        :disabled="invalidForm()">SAVE CHANGES
                </button>
                <button v-on:click="trigger('del')" v-if="faq.id" class="btn btn-danger">DELETE FAQ</button>

            </div>
            <div v-if="this.saving" class="text-right">
                Processing please wait...
            </div>

        </div>
    </div>
</template>

<script type="text/babel">
  import $ from 'jquery'

  export default {
    mounted () {
    },
    data () {
      return {
        isOpened: false,
        saving: false,
      }
    },
    props: ['faq'],
    methods: {
      open: function () {
        $('.modal-overlay').css({ display: 'block' })
        this.isOpened = true
      },
      close: function () {
        $('.modal-overlay').css({ display: 'none' })
        this.isOpened = false
      },
      trigger: function (value) {
        if (value === 'yes') {
          this.addFaq()
        } else if (value === 'edit') {
          this.editFaq()
        } else if (value === 'del') {
          this.deleteFaq()
        } else {
          this.close()
        }
      },
      addFaq: function () {
        this.saving = true
        this.$http.post(laroute.route('admin.rest.faqs.'), this.faq)
          .then((response) => {

            this.$parent.getFaqs()
            this.close()
          }).catch((e) => {
          this.errors = e.response.data
          alert('Incorrect input')
        }).finally(() => this.saving = false)

      },
      editFaq: function () {
        this.saving = true
        this.$http.put(laroute.route('admin.rest.faqs.resource', { faq: this.faq.id }), this.faq)
          .then((response) => {
            let responseData = response.data

            this.$parent.getFaqs()
            this.close()
          }).catch((e) => {
          this.errors = e.response.data
          alert('Incorrect input')

        }).finally(() => this.saving = false)

      },
      deleteFaq: function () {
        this.saving = true
        this.$http.delete(laroute.route('admin.rest.faqs.resource', { faq: this.faq.id }))
          .then((response) => {
            this.$parent.getFaqs()
            this.close()
          }).catch((e) => {
          this.errors = e.response.data
          alert('Incorrect input')

        }).finally(() => this.saving = false)
      },
      invalidForm: function () {
        return (!this.faq.question || !this.faq.answer)
      }
    }
  }
</script>

<style lang="scss">
    #modal-add-industry {
        z-index: 1003;
        max-width: 968px;
        width: 100%;
        background-color: #fff;
        top: 120px;

        padding: 24px;

        .modal-footer,
        .modal-content {
            background-color: #fff;
            padding: 0;

            .btn {
                margin: 12px;
            }

            .btn-danger {
                background-color: #c9302c;
                float: left;
            }
        }

        .form-group {
            margin-bottom: 10px;

            input {
                padding: 0 15px;
                width: 96%;
                margin: 0;
                border: 1px solid #fff7d6;
                border-bottom-width: 4px;
                overflow: hidden;
                background-color: #fff7d6;
                vertical-align: middle;
                color: #414745;
                font-weight: 400;

                &:focus, &:hover {
                    outline: 0;
                    box-shadow: none;
                    border: 1px solid #414745;
                    border-bottom: 4px solid #414745;
                }
            }

            label {
                font-size: 0.9rem;
            }

            textarea.form-control {
                padding: 15px 15px 12px 15px;
                border: 1px solid #fff7d6;
                border-bottom-width: 4px;
                height: 97px;
                overflow: hidden;
                background-color: #fff7d6;
                vertical-align: middle;
                color: #414745;
                font-weight: 400;

                &:focus, &:hover {
                    outline: 0;
                    box-shadow: none;
                    border: 1px solid #414745;
                    border-bottom: 4px solid #414745;
                }
            }
        }

        &.open {
            display: block;
        }
    }
</style>