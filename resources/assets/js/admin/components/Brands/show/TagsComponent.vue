<template>
    <div class="tags-component" :class="{editable: editable}">
        <h3 class="tags-component-title"><slot name="title"></slot><button v-on:click="trigger('edit')" class="tags-component-edit"><span class="material-icons">mode_edit</span></button></h3>
        <ul class="tags">
            <li v-for="tag in tags" class="tag" :class="{marked: tag.marked}">
                <div class="tag-wrapper">
                    <span class="label">
                        {{ tag.title }}
                    </span>
                    <div class="asd">
                        <span v-if="tag.marked" class="material-icons marker">new_releases</span>
                        <span class="tooltip" v-if="tag.marked">Added to<br> <router-link to="/topics/suggested">Suggested Topics</router-link></span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/babel">

    export default {
        props: ['tags', 'editable'],
        methods: {
            trigger : function(t) {
                this.$emit(t);
            }
        }
    }
</script>