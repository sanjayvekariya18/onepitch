<template>
    <div id="modal-edit-press-release" class="modal" :class="{open: isOpened}" v-if="pitch.subject">
        <div class="modal-content">
            <h4>Edit Press Release Information of this Pitch</h4>
            <div class="row">
                <div class="form-group col-sm-10">
                    <input type="text" :id="'file-'+pressRelease.id" class="form-control" name="subject" placeholder="Change the name of the file to be displayed to the Journalist"
                           v-model="pressRelease.name" required>
                    <br>
                    <label>Change the name of the file to be displayed to the Journalist</label>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button v-on:click="deleteFile(pressRelease)" class="btn btn-danger">DELETE</button>
            <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow" :disabled="buttonIsDisabled">SAVE CHANGES</button>
        </div>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';
    import _ from 'lodash';
    import collect from 'collect.js';
    // import AWS from 'aws-sdk';

    export default {
        mounted () {
            this.getFiles();
        },
        data () {
            return {
                isOpened: false,
                pressRelease: {},
                deletedPressRelease: {},
                buttonIsDisabled: false
            };
        },
        props: ['pressReleasePitch'],
        computed: {
            pitch: function () {
                return this.pressReleasePitch;
            }
        },
        methods: {
            open: function () {
                $('.modal-overlay').css({display: 'block'});
                this.isOpened = true;
            },
            close: function () {
                $('.modal-overlay').css({display: 'none'});
                this.isOpened = false;
            },
            trigger: function (value) {
                if (value === 'yes') {
                    this.saveFiles();
                } else {
                    this.close();
                }
                this.$emit(value);
            },
            getFiles: function() {
                this.$http.get(laroute.route('admin.rest.pitches.resource', { pitch: this.pitch.id })).then((response) => {
                    this.pressRelease = response.data['press-release'];
                });
            },
            deleteFile: function(file) {
                this.deletedPressRelease = file;
                $('#file-'+file.id).parent().hide();
                this.saveFiles();

                // AWS.config.update({ accessKeyId: '', secretAccessKey: '', region: 'us-west-1' });
                //
                // const s3 = new AWS.S3();
                //
                //
                // var bucketParams = {
                //     Bucket : '',
                //     Key : $key
                // };
                //
                // // Call S3 to create the bucket
                // s3.deleteObject(bucketParams, function(err, data) {
                //     if (err) {
                //         console.log("Error", err);
                //     } else {
                //         console.log("Success", data);
                //     }
                // });
            },
            // saveFile: function() {
            //     AWS.config.update({ accessKeyId: '', secretAccessKey: '', region: 'us-west-1' });
            //
            //     const s3 = new AWS.S3();
            //
            //
            //     var file = $('#test')[0].files[0];
            //
            //     if (file) {
            //         var objKey = 'pitch/' + file.name;
            //         var params = {
            //             Bucket: '',
            //             Key: objKey,
            //             ContentType: file.type,
            //             Body: file,
            //             ACL: 'public-read'
            //         };
            //
            //         s3.putObject(params, function(err, data) {
            //             if (err) {
            //                 console.log("Error", err);
            //             } else {
            //                 console.log("Success", data);
            //             }
            //         });
            //     }
            // },
            saveFiles: function() {
                var pressReleaseCollection = collect(this.pressRelease);
                var deletedPressReleaseCollection = collect(this.deletedPressRelease);
                this.$http.put(laroute.route('admin.rest.pitches.resource.press-release-for-pitch', {pitch: this.pitch.id}), {pressRelease: pressReleaseCollection.all(), deletedPressRelease: deletedPressReleaseCollection.all()}).then((response) => {
                    console.log(response.data);
                    this.$parent.getPitch();
                    this.close();
                });
            }
        }
    }
</script>

<style lang="scss">
    #modal-edit-press-release {
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