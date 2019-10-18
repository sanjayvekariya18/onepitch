<template>
    <div class="left-side-profile">
        <div class="top-side">
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        components: {

        },
        data () {
            return {
            };
        },
        props: {
          user: {
            default: function () {
              return {};
            }
          }
        },
        methods: {
            saveProfile: function () {
                this.$parent.saveProfile();
            }
        }
    }
</script>

<style lang="scss">
    .left-side-profile {
        height: 100%;
        box-sizing: border-box;
        width: 228px;
        min-width: 228px;
        border-right: 4px solid #f4f5f5;
        padding: 16px;
        padding-bottom: 32px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .top-side {
            overflow-y: auto;
        }



        .admin-checker {

            [type="checkbox"] + label {
                position: relative;
                padding-right: 35px;
                padding-left: 0;
                cursor: pointer;
                display: inline-block;
                height: 25px;
                line-height: 25px;
                user-select: none;
                width: 100%;

                font-family: Roboto, sans-serif;
                font-size: 15px;
                text-align: left;
                color: #414745;
            }

            [type="checkbox"].filled-in:not(:checked) + label:before {
                width: 0;
                height: 0;
                border: 2px solid transparent;
                border-radius: 0;
                left: auto;
                right: 11px;
                top: 10px;
                transform: rotateZ(37deg);
                transform-origin: 100% 100%;
            }

            [type="checkbox"].filled-in:not(:checked) + label:after {
                height: 20px;
                width: 20px;
                background-color: transparent;
                border: 2px solid #414745;
                border-radius: 0;
                top: 0;
                left: auto;
                right: 0;
                z-index: 0;
            }

            [type="checkbox"].filled-in:checked + label:after {
                left: auto;
                right: 0;
                background-color: #ffd831;
                border: 2px solid #414745;
                border-radius: 0;
            }

            [type="checkbox"].filled-in:checked + label:before {
                right: 11px;
                border-bottom-color: #414745;
                border-right-color: #414745;
                left: auto;
            }
        }

        .left-side-block {
            h4,
            div.title{
                font-family: Roboto, sans-serif;
                font-size: 16px;
                line-height: 1.5;
                text-align: left;
                color: #414745;
            }

            ul {
                li, a {
                    font-family: Roboto, sans-serif;
                    font-size: 13px;
                    line-height: 1.75;
                    text-align: left;
                    color: #9b9b9b;
                }
            }
        }



        .social-links {
            ul {
                li {

                    padding-left: 24px;

                    &.twitter {
                        background: url('../../../../../../img/admin/icon-twitter-dark.png') 0 no-repeat;
                    }

                    &.linkedin {
                        background: url('../../../../../../img/admin/icon-linkedin-dark.png') 0 no-repeat;
                    }

                    &.email {
                        background: url('../../../../../../img/admin/icon-email-dark.png') 0 no-repeat;
                    }

                    &.phone {
                        background: url('../../../../../../img/admin/icon-phone-dark.png') 0 no-repeat;
                    }

                    &.timezone {
                        background: url('../../../../../../img/admin/icon-timezone-black.svg') 0 no-repeat;
                    }

                    &.time {
                        background: url('../../../../../../img/admin/icon-time-black.svg') 0 no-repeat;
                    }
                }
            }
        }

        .login-information {
            ul {
                li {
                    padding-left: 24px;

                    &.email {
                        background: url('../../../../../../img/admin/icon-email-dark.png') 0 no-repeat;
                    }

                    button:not(.btn) {
                        float: right;
                        background: transparent;
                        border: none;
                        padding: 0;
                        color: #414745;
                    }
                }
            }
        }

        .reset-password {
            a {
                font-family: Roboto, sans-serif;
                font-size: 13px;
                line-height: 1.31;
                text-align: left;
                color: #414745;
                text-decoration: underline;
            }
        }

        .save-button-wrapper {
            text-align: center;

            button.btn {
                background-color: #ffd831;
                color: #414745;
                min-width: 160px;
            }
        }

    }
</style>