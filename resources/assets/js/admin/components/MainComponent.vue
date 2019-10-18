<template>
    <div class="wrapper" :class="{list: $route.meta.list}">
        <header>
            <header-component ref="headerComponent"></header-component>
        </header>
        <main>
            <aside>
                <navigation-component></navigation-component>
            </aside>
            <section>
                <div class="page">
                    <transition name="fade">
                        <router-view></router-view>
                    </transition>
                </div>
            </section>
        </main>
        <footer>
        </footer>
    </div>
</template>

<script type="text/babel">
    import HeaderComponent from './Partials/HeaderComponent.vue';
    import NavigationComponent from './Partials/NavigationComponent.vue';

    export default {
        components: {
            HeaderComponent,
            NavigationComponent,
        },
        methods: {
            setPageTitle: function (title) {
                this.$refs.headerComponent.setPageTitle(title);
            }
        }
    }
</script>

<style lang="scss" type="text/scss">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .1s
    }
    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>
