<template>
  <div class="edit">
    <div class="head">
      <div class="title">
        <label for="topic-title">帖子标题</label>
        <input id="topic-title" type="text" placeholder="发表新话题" v-model="title">
      </div>
      <div class="tag">帖子标签</div>
      <div class="type">
        <h5 @click="showDrop" v-model='type'>{{ type }}<i class="more"></i></h5>
        <ul class="dropdown" v-show="classify" @click.stop.prevent="select($event)">
          <li data-tab="share">分享</li>
          <li data-tab="ask">问答</li>
          <li data-tab="job">招聘</li>
          <li data-tab="dev">测试</li>
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
    <button class="edit-btn" @click="submitTopic">发表</button>
  </div>
</template>

<script>
  // import fetch from 'common/js/fetch.js'

  export default {
    data () {
      return {
        classify: false,
        content: '',
        title: null,
        type: '请选择',
        tab: '',
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
      // 下拉框显示与否
      showDrop () {
        this.classify = !this.classify
      },
      // 选择文章分类
      select (e) {
        if (e.target.nodeName === 'LI') {
          this.type = e.target.innerHTML
          this.tab = e.target.getAttribute('data-tab')
          this.classify = !this.classify
        }
      },
      // 发表文章
      submitTopic () {
        this.$ajax.post('https://cnodejs.org/api/v1/topics', {
               accesstoken: this.$store.getters.token,
               title: this.title,
               tab: this.tab,
               content: this.content
        }).then(res => {
            if (res.data.success) {
            	this.$router.push(`/topicDetail/:${res.data.topic_id}`)
            }
        }).catch(err => {
        	console.log(err)
        })
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
    .edit-btn
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
