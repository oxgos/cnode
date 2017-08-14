<template>
  <div class="edit">
      <!-- bidirectional data binding（双向数据绑定） -->
    <div class="head">
      <div class="title">
        <label for="topicTitle">帖子标题</label>
        <input type="text" placeholder="发表新话题">
      </div>
      <div class="type">
        <h5 @click="showDrop">请选择</h5>
        <ul class="dropdown" v-show="classify" @click.stop.prevent="select($event)">
          <li>分享</li>
          <li>问答</li>
          <li>招聘</li>
          <li>测试</li>
        </ul>
      </div>
    </div>
	  <quill-editor v-model="content"
	                ref="myQuillEditor"
	                :options="editorOption"
	                @blur="onEditorBlur($event)"
	                @focus="onEditorFocus($event)"
	                @ready="onEditorReady($event)">
	  </quill-editor>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        classify: false,
        content: '',
        editorOption: {
          // some quill options
          modules: {
            toolbar: [
              [{size: ['small', false, 'large', 'huge']}],
              [{font: []}],
              ['bold', 'italic'],
              ['blockquote', 'code-block'],
              [{list: 'ordered'}, {list: 'bullet'}],
              [{color: []}, {background: []}],
              ['image']
            ]
          }
        }
      }
    },
    // if you need to manually control the data synchronization, parent component needs to explicitly emit an event instead of relying on implicit binding
    // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
    methods: {
      onEditorBlur (editor) {
        // console.log('editor blur!', editor)
      },
      onEditorFocus (editor) {
        // console.log('editor focus!', editor)
      },
      onEditorReady (editor) {
        // console.log('editor ready!', editor)
      },
      onEditorChange ({ editor, html, text }) {
        // console.log('editor change!', editor, html, text)
        this.content = html
      },
      showDrop () {
        this.classify = !this.classify
      },
      select (e) {
        if (e.target.nodeName === 'LI') {
          let val = e.target.innerHTML
          e.target.parentNode.previousElementSibling.innerHTML = val
          this.classify = !this.classify
        }
      }
    },
    // get the current quill instace object.
    computed: {
      editor () {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted () {
      // you can use current editor object to do something(quill methods)
      // console.log('this is current quill instance object', this.editor)
    }
  }
</script>

<style lang="stylus">
  .edit
    position absolute
    top 40px
    left 0
    bottom 0
    width 100%
    background #fff
    .head
      .title
        text-align left
        label
          padding-left 5px
          font-size 16px
          line-height 30px
        input
          width 100%
          height 20px
          font-size 14px
          margin 0 5px
          border none
          border-bottom 1px solid #80bd01
          outline none
      .type
        position relative
        width 100%
        height 30px
        padding-left 5px
        margin-bottom 5px
        h5
          font-size 16px
          line-height 30px
          font-weight 600
        .dropdown
          position absolute
          top 30px
          left 0
          width 100%
          background #fff
          z-index 1300
          li
            padding-left 5px
            line-height 30px
</style>
