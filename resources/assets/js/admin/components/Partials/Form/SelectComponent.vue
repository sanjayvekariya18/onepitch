<template>
    <div class="select-component">
        <div class="select-wrapper">
            <input v-on:click="toggle" type="text" class="select-dropdown" readonly="true" :value="prefix + valueTitle + postfix">
            <ul :class="{'active': opened}" class="dropdown-content select-dropdown">
                <li v-for="element in elements" v-on:click="selectValue(element.value)" :disabled="element.disabled"><span>{{ element.title }}</span></li>
            </ul>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
      data () {
        return {
          opened: false,
          inValue: this.value
        };
      },
      props: {
        elements : {
          type: Array
        },
        value: {
          default: ''
        },
        prefix: {
          type: String,
          default: ''
        },
        postfix: {
          type: String,
          default: ''
        }
      },
      computed: {
        valueTitle: function () {
          return this.elements.find(function (el) {
            return el.value === this.inValue;
          }, this).title;
        }
      },
      methods: {
        open: function () {
          this.$emit('opening');
          this.opened = true;
          this.$emit('opened');
        },
        close: function () {
          this.$emit('closing');
          this.opened = false;
          this.$emit('closed');
        },
        toggle: function () {
          this.opened ? this.close() : this.open();
        },
        selectValue: function (value) {
          this.inValue = value;
          this.close();
          this.$emit('change', this);
        },
        val: function () {
          return this.inValue;
        }
      }
    }
</script>

<style lang="scss" type="text/scss">
    .select-component {
        .select-wrapper {
            input[type=text]:not(.browser-default) {
                height: 100%;
                width: 180px;
                padding: 0 5px;
                border-bottom: 2px solid #414745;
                font-family: Roboto, sans-serif;
                font-size: 13px;
                text-align: left;
                color: #414745;
                background: #cbcbcb url('../../../../../img/admin/icon-downarrow-dark.png') right no-repeat;
            }
            ul.select-dropdown {
                &.active {
                    display: block;
                    width: 100%;
                    position: absolute;
                    top: 46px;
                    left: 0;
                    opacity: 1;
                }

                li {
                    min-height: 47px;
                    span {
                        line-height: 17px;
                        padding: 17px 16px 13px 16px;
                        font-family: Roboto, sans-serif;
                        font-size: 13px;
                        text-align: left;
                        color: #414745;
                    }
                }

            }
        }
    }
</style>