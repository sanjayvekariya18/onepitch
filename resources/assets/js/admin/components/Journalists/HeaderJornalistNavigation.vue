<template>
    <div class="nav-content left-margin">
        <ul class="tabs tabs-transparent">
            <li class="tab"><router-link to="/journalists/new">NEW</router-link></li>
            <li class="tab"><router-link to="/journalists/approved">APPROVED</router-link></li>
            <li class="tab"><router-link to="/journalists/denied">DENIED</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
        methods : {
            setView: function (componentName) {
                this.$root.openJournalistComponent(componentName);
            }
        },
        computed: {
            hash : function () {
                return window.location.hash;
            }
        }
    }
</script>

<style lang="scss">
    .nav-content {
        position: relative;

        &.left-margin {
            margin-left: 320px;
        }

        ul.tabs.tabs-transparent {
            margin: 0;
            max-width: 640px;
            display: flex;
            justify-content: space-between;

            li.tab {

                width: 33%;
                a {
                    font-family: Roboto, sans-serif;
                    font-size: 15px;
                    letter-spacing: 0;
                    text-align: center;

                    &.router-link-active {
                        position: relative;
                        color: #414745;
                        background-color: #fff;
                        /*border-bottom: 2px solid #ffd831;*/

                        &:before {
                            display: block;
                            content: '';
                            height: 4px;
                            width: 50px;
                            position: absolute;
                            left: 50%;
                            background-color: #ffd831;
                            transform: translateX(-50%);
                            bottom: 0;
                        }
                    }
                }
            }

            .indicator {
                display: none;
            }
        }
    }
</style>