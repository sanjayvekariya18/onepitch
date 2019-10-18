<template>
    <div id="modal-post-link" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>Edit Featured Image for Blog Post</h4>
            <div class="row">
                <div v-show="errorUpload">
                    Opps... an error happened while uploading.
                </div>

                <div class="form-group col-sm-12">
                    <label>File
                        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" accept="image/*"/>
                    </label>
                    max: 5mb, ext: jpg, png, gif
                </div>
            </div>
        </div>
        <div class="modal-footer" v-show="!saving">
            <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow" :class="{disabled: errorUpload}">
                SAVE CHANGES
            </button>
        </div>
        <div class="modal-footer" v-show="saving">
            Saving Picture, please wait...
        </div>
    </div>
</template>

<script type="text/babel">
  import $ from 'jquery'

  export default {
    data () {
      return {
        file: '',
        isOpened: false,
        hasError: false,
        saving: false,
        errorUpload: false,
      }
    },
    props: ['featuredPostImage'],
    methods: {
      handleFileUpload: function () {
        this.file = this.$refs.file.files[0]
        if (this.file.type !== 'image/gif' && this.file.type !== 'image/jpeg' &&
          this.file.type !== 'image/jpg' && this.file.type !== 'image/png') {
          alert('Incorrect filetype...')
          this.errorUpload = true
        } else {
          this.errorUpload = false
        }
      },
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
          this.saveFeaturedImage()
        } else {
          this.close()
        }
        this.$emit(value)
      },
      saveFeaturedImage: function () {
        this.saving = true
        let formData = new FormData()
        formData.append('file', this.file)

        this.$http.post(laroute.route('admin.rest.blog.resource.featured-image',
          { blogPost: this.featuredPostImage.id }), formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((response) => {
          this.errorUpload = false
          let responseData = response.data
          this.featuredPostImage.featured_image = responseData.featured_image
          this.close()
        }).catch(error => {
          console.log(error)
          this.errorUpload = true
        }).finally(() => this.saving = false)
      }
    }
  }

</script>

<style lang="scss">
    #modal-post-link {
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
        }

        .form-group {
            margin-bottom: 10px;

            input {
                margin: 0;
            }

            label {
                font-size: 0.9rem;
            }

            .subject-counter {
                float: right;
                font-size: 12px;
            }

            .text-danger {
                color: #A94442;
            }
        }

        &.open {
            display: block;
        }
    }
</style>