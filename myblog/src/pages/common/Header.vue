<template>
  <div class="wrapper">
    <Dialog v-if="showDialog" @cancel="handleCancel" @ok="handleOk" ></Dialog>
    <nav class="header">
      <div class="logo"><router-link to='/'>joker</router-link></div>
      <ul>
        <li class="item"><router-link to='/articleList'>随笔</router-link></li>
        <li class="item"><router-link to='/message/1/5'>留言板</router-link></li>
        <li class="item">
          <div ref="like">爱好<span class="iconfont icon">&#xe644;</span></div>
          <transition enter-active-class="animated flipInY">
            <ul class="subnav" v-if="show">
              <li><router-link to='/music'>音乐</router-link></li>
              <li><router-link to='/pic'>图片</router-link></li>
            </ul>
          </transition>
        </li>
      </ul>
      <p v-if="showWelcome">欢迎{{userName}}<span @click="handleLogout">logout</span></p>
      <input v-if="!showWelcome" type="button" @click="handleId" value="IDを入りなさい">
    </nav>
  </div>
</template>

<script>
import Dialog from './Dialog'
import axios from 'axios'
export default {
  name: 'Header',
  components: {
    Dialog
  },
  data () {
    return {
      show: false,
      showDialog: false,
      userName: "",
      showWelcome: false
    }
  },
  methods: {
    handleId () {
      this.showDialog = true
    },
    handleCancel () {
      this.showDialog = false
    },
    handleOk (Id) {
      if (Id != "") {
        axios.post('/user/login',{Id}).then((res) => {
          res = res.data
          if (res.status == "0" && res.result) {
            this.showDialog = false
            this.userName = res.result.userName
            this.showWelcome = true
            this.$store.commit('changeUser', {'userName': this.userName, 'userPwd': '', 'userRole': ''})
          } else {
            // todo
          }
        })
      }
    },
    handleLogout () {
      axios.post('/user/logout').then((res) => {
        res = res.data
        if (res.status == '0' && res.result) {
          this.userName = ''
          this.showWelcome = false
          this.$store.commit('changeUser', {'userName': '', 'userPwd': '', 'userRole': ''})
        }
      })
    }
  },
  mounted () {
    let _this = this;
    document.addEventListener('click', (e) => {
      if (_this.$refs.like != undefined) {
        if (!_this.$refs.like.contains(e.target)) _this.show = false;
        else _this.show = true;
      }
    })
    let arr = document.cookie.split(';')
    for (let item of arr) {
      if (item.split('=')[0] == 'userName' && item.split('=')[1] != "") {
        this.userName = item.split('=')[1]
        this.showWelcome = true
        break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../assets/animate.css'
  @import '../../assets/icon/iconfont.css'
  .wrapper
    min-height 50px
  .header
    position fixed
    top 0
    z-index 999
    width 967px
    left 50%
    margin-left -485px
    height 50px
    background rgb(248,248,248)
    border solid 1px rgb(221,221,221)
    .logo
      font-size 22px
      float left 
      padding 10px 15px
    .item
      float left 
      list-style none
      height 50px
      line-height 50px
      width 100px
      text-align center
      color rgb(102,102,102)
      cursor pointer
      .subnav
        width 100%
        position relative
        z-index 99
        text-align center
        background rgb(248,248,248)
        li
          list-style none
    li:hover 
      background rgb(238,238,238)
    p
      font-size 15px
      float right
      height 50px
      line-height 50px
      color rgb(102,102,102)
      span 
        width 80px
        text-align center
        cursor pointer
        display inline-block
        margin 0 15px 0 5px
      span:hover 
        background rgb(238,238,238)
    input 
      width 150px
      float right
      padding 5px 10px
      margin 8px 20px
      background rgb(230,230,230)
      border solid 1px rgb(226,226,226)
      color rgb(68,68,68)
      cursor pointer
    input:hover
      background rgb(212,212,212)
  a
    text-decoration none
    color rgb(102,102,102)
</style>
