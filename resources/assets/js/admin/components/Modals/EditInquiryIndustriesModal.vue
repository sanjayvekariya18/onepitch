<template>
    <div id="modal-edit-industries" class="modal" :class="{open: isOpened}" v-if="inquiry.industries">
        <div class="modal-content">
            <h4>Edit Industries Assigned to this Inquiry</h4>
            <div class="checkboxes-list">
                <ul>
                    <li v-for="(industry, key) in industries">
                        <input class="filled-in" :id="'industry-' + key" type="checkbox" :value="industry.id" v-model="ids.items">
                        <label :for="'industry-' + key">{{ industry.title }}</label>
                    </li>
                </ul>
            </div>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow">SAVE CHANGES</button>
        </div>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';
    import collect from 'collect.js';

    export default {
        mounted () {
            this.getIndustries();
            let ind = collect(this.inquiry.industries);
            this.ids = ind.pluck('id');
        },
        data () {
            return {
                isOpened: false,
                industries: [],
                ids: []
            };
        },
        props: ['inquiry'],
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
                    this.saveIndustries();
                } else {
                    this.close();
                }
                this.$emit(value);
            },
            getIndustries: function() {
                this.$http.get(laroute.route('admin.rest.industries.')).then((response) => {
                    this.industries = response.data;
                });
            },
            saveIndustries : function() {
                this.$http.put(laroute.route('admin.rest.inquiries.resource.industries', {inquiry: this.inquiry.id}), {ids: this.ids.all()}).then((response) => {
                    this.$parent.getInquiry();
                    this.close();
                });
            }
        }
    }
</script>

<style lang="scss">
    #modal-edit-industries {
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

            .checkboxes-list {
                ul {
                    column-count: 3;

                    li {
                        height: 48px;
                        padding: 12px 0;

                        input {

                        }
                    }
                }
            }

        }

        &.open {
            display: block;
        }
    }
</style>