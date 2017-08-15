<template>
  <div class="edit">
      <!-- bidirectional data binding（双向数据绑定） -->
    <div class="back">
      <i @click="back"></i>
      <div class="logo"><img src="static/img/cnodejs_light.svg" alt="" width="120" height="28"></div>
    </div>  
    <div class="head">
      <div class="title">
        <label for="topicTitle">帖子标题</label>
        <input type="text" placeholder="发表新话题">
      </div>
      <div class="tag">帖子标签</div>
      <div class="type">
        <h5 @click="showDrop" v-model='type'>{{ type }}<i class="more"></i></h5>
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
    <button class="btn" @click="submitTopic">发表</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        classify: false,
        content: '',
        type: '请选择',
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
          this.type = val
          this.classify = !this.classify
        }
      },
      back () {
        this.$router.go(-1)
        this.$store.dispatch('UPDATA_HEADER')
      },
      submitTopic () {
        
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
    top 0
    left 0
    bottom 0
    width 100%
    background #fff
    .back
      position relative
      width 100%
      height 40px
      padding-top 5px
      text-align center
      background #444
      box-sizing border-box
      i
      	position absolute
      	left 0
      	top 0
      	width 40px
      	height 40px
      	background url('../../../static/img/back.svg') no-repeat 0 5px
      	background-size 35px 35px
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
          font-size 16px
          margin 0 5px
          border none
          border-bottom 1px solid #80bd01
          outline none
      .tag
      	  width 100%
      	  line-height 30px
      	  padding-left 5px
      	  font-size 16px
      	  font-weight 600
      .type
        position relative
        width 100%
        height 30px
        padding-left 5px
        margin-bottom 5px
        h5
          position relative
          font-size 16px
          line-height 30px
          font-weight 500
          border-bottom 1px solid #e4393c
          margin-top 0
          .more
          	position absolute
          	right 5px
          	top 0
          	width 30px
          	height 30px
          	background url('../../../static/img/more.png') no-repeat 0 2px
          	background-size 30px 30px
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
    .btn
    	display block
    	width 100%
    	border none
    	color #fff
    	background-color #5cb85c
    	border-color #4cae4c
    	padding 6px 12px
    	font-size 16px
    	font-weight 400
</style>
