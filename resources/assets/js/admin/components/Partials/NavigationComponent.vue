<template>
    <div class="left-navigation">
        <ul class="admin-navigation">
            <li><router-link to="/journalists"><i class="material-icons">mode_edit</i><span>Journalists</span></router-link></li>
            <li><router-link to="/publicists"><i class="material-icons">mic</i><span>Publicists</span></router-link></li>
            <li><router-link to="/pitches"><i class="material-icons">format_list_bulleted</i><span>Pitches</span></router-link></li>
            <li><router-link to="/inquiries"><i class="material-icons">format_list_bulleted</i><span>Inquiries</span></router-link></li>
            <li><router-link to="/industries"><i class="material-icons">domain</i><span>Industries</span></router-link></li>
            <li class="topics"><router-link to="/topics"><i class="material-icons">message</i><span>Topics</span></router-link></li>
            <li><router-link to="/topics/suggested"><i class="material-icons">new_releases</i><span>Suggested Topics</span></router-link></li>
            <li><router-link to="/blog/post"><i class="material-icons">library_books</i><span>Blog</span></router-link>
            <li><router-link to="/alerts"><i class="material-icons">add_alert</i><span>Alerts</span></router-link></li>
            <li><router-link to="/analytics"><i class="material-icons">insert_chart</i><span>Analytics</span></router-link></li>
            <li><router-link to="/administrators"><i class="material-icons">person</i><span>Administrators</span></router-link></li>
            <li><router-link to="/faq"><i class="material-icons">live_help</i><span>FAQ</span></router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
        components: {

        }
    }
</script>

<style lang="scss">
    .left-navigation {
        display: flex;
        flex-direction: column;

        li.topics {
            .router-link-active {
                background: none;
            }

            .router-link-exact-active.router-link-active {
                background-color: #fff7d6;
            }
        }

        .router-link-active {
            background-color: #fff7d6;
        }

        .logo {
            background: url("../../../../img/admin/one-pitch-logo-medium.png");
            width: 215px;
            height: 40px;
            margin: 24px;
        }
    }

</style>
