<template>
    <div id="modal-edit-summary" class="modal" :class="{open: isOpened}" >
        <div class="modal-content">
            <h4>Edit Summary Information of this Brand</h4>
            <div class="row">
                <div class="form-group col-sm-12">
                    <input type="text" class="form-control" name="subject" placeholder="This is the name of the brand."
                           v-model="summaryBrand.company" required>
                    <label>This is the name of the brand.</label>
                </div>

                <div class="form-group col-sm-6">
                    <input type="url" class="form-control" name="website" placeholder="Add a link here."
                           v-model="summaryBrand.website" required>
                    <label>Add a link here.</label>
                </div>

                <div class="form-group col-sm-12">
                    <input type="text" class="form-control" name="location" placeholder="What location is the brand?"
                           v-model="summaryBrand.location">
                    <label>What location is the brand?</label>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow" :disabled="buttonIsDisabled">SAVE CHANGES</button>
        </div>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';
    import collect from 'collect.js';

    export default {
        data () {
            return {
                isOpened: false,
                remainingCount: '',
                hasError: false,
                buttonIsDisabled: false
            };
        },
        props: ['summaryBrand'],
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
                    this.saveSummary();
                } else {
                    this.close();
                }
                this.$emit(value);
            },
            saveSummary : function() {
                var summariesCollection = collect([this.summaryBrand.company, this.summaryBrand.website, this.summaryBrand.location]);
                this.$http.put(laroute.route('admin.rest.brands.resource.summary-for-brand', {brand: this.summaryBrand.id}), {summaries: summariesCollection.all()}).then((response) => {
                    this.$parent.getBrand();
                    this.close();
                });
            }
        }
    }
</script>

<style lang="scss">
    #modal-edit-summary {
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