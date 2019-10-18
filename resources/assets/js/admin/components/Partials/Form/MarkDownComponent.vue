<!--<template>-->
    <!--<textarea ref="area"></textarea>-->
<!--</template>-->

<!--<script>-->
    <!--import simplemde from 'simplemde'; // import from npm package-->
    <!--import 'simplemde/dist/simplemde.min.css';-->

    <!--export default {-->
        <!--props: ['value'],-->
        <!--mounted() {-->
            <!--this.mde = new simplemde({element: this.$refs.area });-->
            <!--this.mde.value(this.value);-->
            <!--var self = this;-->
            <!--this.mde.codemirror.on('change', function() {-->
                <!--self.mde.codemirror.setCursor(self.mde.codemirror.lineCount(), 1);-->
                <!--self.$emit('input', self.mde.value());-->
            <!--})-->
        <!--},-->
        <!--watch: {-->
            <!--// this would update on every keystroke, so maybe you have to remove it.-->
            <!--// component should work nonetheless, but if an external source changed the value, it would not reflect in this component.-->
            <!--value(newVal) { this.mde.value(newVal) }-->
        <!--},-->
        <!--beforeDestroy() {-->
            <!--this.mde.toTextArea() // clean up when component gets destroyed.-->
        <!--}-->
    <!--}-->
<!--</script>-->

<template>
    <div class="markdown-editor">
        <textarea></textarea>
    </div>
</template>

<script>
    import SimpleMDE from 'simplemde';
    import marked from 'marked';
    import 'simplemde/dist/simplemde.min.css';

    export default {
        name: 'markdown-editor',
        props: {
            value: String,
            previewClass: String,
            autoinit: {
                type: Boolean,
                default() {
                    return true;
                },
            },
            highlight: {
                type: Boolean,
                default() {
                    return false;
                },
            },
            sanitize: {
                type: Boolean,
                default() {
                    return false;
                },
            },
            configs: {
                type: Object,
                default() {
                    return {};
                },
            },
        },
        mounted() {
            if (this.autoinit) this.initialize();
        },
        activated() {
            const editor = this.simplemde;
            if (!editor) return;
            const isActive = editor.isSideBySideActive() || editor.isPreviewActive();
            if (isActive) editor.toggleFullScreen();
        },
        methods: {
            initialize() {
                const configs = Object.assign({
                    element: this.$el.firstElementChild,
                    initialValue: this.value,
                    renderingConfig: {},
                }, this.configs);
                // 同步 value 和 initialValue 的值
                if (configs.initialValue) {
                    this.$emit('input', configs.initialValue);
                }
                // 判断是否开启代码高亮
                if (this.highlight) {
                    configs.renderingConfig.codeSyntaxHighlighting = true;
                }
                // 设置是否渲染输入的html
                marked.setOptions({ sanitize: this.sanitize });
                // 实例化编辑器
                this.simplemde = new SimpleMDE(configs);
                // 添加自定义 previewClass
                const className = this.previewClass || '';
                this.addPreviewClass(className);
                // 绑定事件
                this.bindingEvents();
            },
            bindingEvents() {
                this.simplemde.codemirror.on('change', () => {
                    this.$emit('input', this.simplemde.value());
            });
            },
            addPreviewClass(className) {
                const wrapper = this.simplemde.codemirror.getWrapperElement();
                const preview = document.createElement('div');
                wrapper.nextSibling.className += ` ${className}`;
                preview.className = `editor-preview ${className}`;
                wrapper.appendChild(preview);
            },
        },
        destroyed() {
            this.simplemde = null;
        },
        watch: {
            value(val) {
                if (val === this.simplemde.value()) return;
                this.simplemde.value(val);
            },
        },
    };
</script>

<style>
    .markdown-editor .markdown-body {
        padding: 0.5em
    }
    .markdown-editor .editor-preview-active, .markdown-editor .editor-preview-active-side {
        display: block;
    }
</style>