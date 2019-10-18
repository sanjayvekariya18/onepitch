<template>
    <tr>
        <td width="20%" v-if="!editing">{{ editedUser.full_name }}</td>
        <td width="30%" v-if="!editing">{{ editedUser.email }}</td>
        <td v-if="!editing">
            <span v-for="n in 6">&bull;</span>
        </td>
        <td v-if="!editing" class="buttons">
            <button v-on:click="editing = true" class="btn btn-material-icon"><i class="material-icons">mode_edit</i></button>
            <button v-on:click="deletingUser" class="btn btn-material-icon"><i class="material-icons">delete</i></button>
        </td>

        <td width="20%" v-if="editing">
            <div class="input-field">
                <input :id="'user-'+editedUser.id+'-full_name'" type="text" v-model="editedUser.full_name" class="custom-validate" :class="{ invalid: errors.full_name }" placeholder="Full Name">
                <label :for="'user-'+editedUser.id+'-full_name'" :data-error="errors.full_name"></label>
            </div>
        </td>
        <td width="30%" v-if="editing">
            <div class="input-field">
                <input :id="'user'+editedUser.id+'-email'" type="email" v-model="editedUser.email" class="custom-validate" :class="{ invalid: errors.email }" placeholder="Email Address">
                <label :for="'user-'+editedUser.id+'-email'" :data-error="errors.email"></label>
            </div>
        </td>
        <td v-if="editing" class="password-col">
            <div class="input-field">
                <input :id="'user-'+editedUser.id+'-password'" type="password" ref='inputPassword' v-model="editedUser.password" class="custom-validate" :class="{ invalid: errors.password }" placeholder="Password">
                <label :for="'user-'+editedUser.id+'-password'" :data-error="errors.password"></label>
                <button class="btn btn-material-icon" v-on:click="switchPasswordVisibility">
                    <i v-show="typePasswordField === 'text'" class="material-icons">visibility</i>
                    <i v-show="typePasswordField === 'password'" class="material-icons">visibility_off</i>
                </button>
            </div>
        </td>
        <td class="buttons" v-if="editing" colspan="2">
            <button v-on:click="saveUser" class="btn btn-yellow btn-large btn-width-72">SAVE</button>
        </td>
    </tr>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                typePasswordField: 'password',
                editing: this.modeEditing,
                editedUser: this.user,
                errors: {}
            };
        },
        props: {
            user: {
                default: function() {
                    return {};
                }
            },
            modeEditing : {
                default: function() {
                    return false;
                }
            }
        },
        methods: {
            saveUser: function() {
                if (this.editedUser.id) {
                    this.$http.put(laroute.route('admin.rest.administrators.resource', {user: this.editedUser.id}), this.editedUser )
                    .then((response) => {
                        this.$emit('administrator-updated', response.data);
                        this.editing = false;
                        this.editedUser = response.data;
                        this.errors = [];
                    }).catch((e) => {
                        this.errors = e.response.data;
                    });
                } else {
                    this.$http.post(laroute.route('admin.rest.administrators.'), this.editedUser )
                    .then((response) => {
                        this.$emit('administrator-added', response.data);
                        this.editing = false;
                        this.errors = [];
                    }).catch((e) => {
                        this.errors = e.response.data;
                    });
              }

            },
            switchPasswordVisibility: function() {
                this.typePasswordField = this.typePasswordField === 'password' ? 'text' : 'password';
                this.$refs.inputPassword.setAttribute('type', this.typePasswordField);
            },
            deletingUser: function() {
                this.$emit('administrator-deleting', this.editedUser);
            }
        }
    }
</script>

<style lang="scss">

    td {

        font-family: Roboto, sans-serif;
        font-size: 15px;
        line-height: 1.2;
        text-align: left;
        color: #414745;

        .input-field {
            margin-top: 15px!important;

            input {
                height: 30px!important;
                margin-bottom: 13px!important;

                font-family: Roboto, sans-serif;
                font-size: 16px;
                letter-spacing: 0;
                text-align: left;
                color: #414745;
            }

        }

        &.buttons {
            button {
                margin-right: 28px;

                &:last-child {
                    margin: 0;
                }
            }
        }
    }

    .password-col {
        input:not(.browser-default) {
            width: 122px;
        }
    }
</style>