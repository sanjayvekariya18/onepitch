<template>
    <div id="modal-add-industry" class="modal" :class="{open: isOpened}">
        <div class="modal-content">
            <h4>Add New Industry</h4>
            <div class="row">
                <div class="form-group col-sm-12">
                    <input type="text" class="form-control" name="title" v-model="industry.title" placeholder="What is the name of the Industry, If long, use abbreviation" required>
                    <label>What is the name of the Industry, If long, use abbreviation</label>
                    <div class="counter"></div>
                </div>

                <div class="form-group col-sm-12">
                    <input type="text" class="form-control" name="full_title" v-model="industry.full_title" placeholder="If you added an abbreviation, what is the full name of the Industry">
                    <label>If you added an abbreviation, what is the full name of the Industry</label>
                </div>

                <div class="form-group col-sm-12">
                    <textarea class="form-control" name="description" v-model="industry.description" placeholder="Describe what the industry is"></textarea>
                    <label>Describe what the industry is.</label>
                    <div class="for-textarea"></div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button v-on:click="trigger('no')" class="btn btn-default">CANCEL</button>
            <button v-on:click="trigger('yes')" class="btn btn-yellow">ADD INDUSTRY</button>
        </div>
    </div>
</template>

<script type="text/babel">
    import $ from 'jquery';

    export default {
        data () {
            return {
                industry: {},
                isOpened: false
            };
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
                    this.addIndustry();
                } else {
                    this.close();
                }
            },
            addIndustry: function () {
                this.$http.post(laroute.route('admin.rest.industries.'), this.industry )
                    .then((response) => {
                        this.industry = {};
                        this.$parent.getIndustries();
                        this.close();
                    }).catch((e) => {
                    this.errors = e.response.data;
                });
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