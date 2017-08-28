<template>
  <div class="login">
    <div class="container">
      <form action="#" method="post">
        <div class="form-group">
          <label for="token" visible="false"></label>
          <input type="text" id="token" placeholder="Access Token"  v-model="accesstoken">
        </div>
        <button class="btn" type="button" @click="signIn">登录</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      accesstoken: null
    }
  },
  methods: {
    signIn () {
      this.$store.dispatch('SET_TOKEN', this.accesstoken)
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .login
    position absolute
    top 40px
    left 0
    bottom 0
    width 100%
    background #eee
    .container
      padding-top 150px
      form
        width 90%
        margin 0 auto
        height 120px
        padding-top 20px
        text-align center
        border-radius 10px
        background #fff
        input
          width 80%
          margin-bottom 15px
          font-size 16px
          border none
          border-bottom 2px solid #80bd01
          padding 10px 0 10px 7px
          outline none
        .btn
          width 82%
          font-size 16px
          color #fff
          font-weight 600
          line-height 30px
          border none
          outline none
          border-radius 6px
          background #80bd01
</style>