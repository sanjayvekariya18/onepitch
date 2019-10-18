<template>
    <div class="avatar-component">
        <slot/>
    </div>
</template>

<style lang="scss">
    .avatar-component {
        position: relative;
        background-color: #ffd731;
        color: #fff7d6;
        margin-bottom: 16px;
        border-radius: 50%;
        width: 192px;
        height: 192px;
    }
</style>