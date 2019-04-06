<template>
    <div class="bg">
        <div class="wrapper">
            <p>系统登录</p>
            <div><span class="iconfont">&#xe639;</span><input v-model="userName" type="text"></div>
            <div><span class="iconfont">&#xe62e;</span><input v-model="password" type="password"><span></span></div>
            <button type="submit" @click="submit">登录</button>
        </div>
        <transition leave-active-class="animated flipOutY">
            <div v-if="showTip" class="tip"><i class="iconfont">&#xe626;</i>{{tip}}</div>
        </transition>
    </div>
</template>

<script>
import axios from 'axios'
import { setTimeout } from 'timers';
export default {
    name: 'Login',
    data() {
      return {
          userName: '',
          password: '',
          showTip: false,
          tip: ''
      }
    },
    methods: {
        submit () {
            axios.post('/admin/login', {
                'userName': this.userName,
                'password': this.password
            }).then((res) => {
                res = res.data
                if (res.status == 0 && res.result) {
                    if (res.msg == 'success') {
                        this.$router.push("/admin/create")
                    } else {
                        this.tip = '登录失败'
                        this.showTip = true
                        let _this = this
                        setTimeout(() => _this.showTip = false, 1000)
                    }
                }
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '../../assets/icon/iconfont.css'
    @import '../../assets/animate.css'
    .bg
        z-index 100000
        position fixed
        width 100%
        height 100%
        top 0
        background rgb(45,58,75)
    .wrapper
        z-index 100001
        width 450px
        margin 150px auto 0
        p
            width 100%
            text-align center
            font-size 28px
            color rgb(238,238,238)
            margin-bottom 50px
        div
            width 100%
            margin 20px 0
            background rgb(40,52,67)
            border rgb(62,73,87) solid 1px
            border-radius 5px
            span 
                width 40px
                padding 0 10px
                color rgb(136,154,164)
            input 
                border 0
                outline medium
                width 75%
                height 50px
                margin 0 5px
                line-height 50px
                color #fff
                background rgb(40,52,67)
        button 
            background rgb(24,144,255)
            width 100%
            height 35px
            line-height 35px
            color #fff
            border none
            border-radius 5px
            cursor pointer
            font-size 15px
            outline medium
        button:hover
            background rgb(70,166,255)
    .tip
        position fixed
        z-index 200001
        left 50%
        top 50%
        width 180px
        height 66px
        margin -33px 0 0 -90px
        background #fff
        i 
            display inline-block
            margin 16px
            font-size 30px
            color rgb(250,84,85)
</style>

