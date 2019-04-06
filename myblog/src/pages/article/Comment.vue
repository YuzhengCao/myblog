<template>
    <div class="wrapper">
        <p>评论列表</p>
        <div class="comment" v-for="item of list" :key="item.commentId">
            <img src=""/>
            <div class="username">{{item.name}}</div>
            <div class="reply"><router-link to='/comment'>回复</router-link></div>
            <div class="time">{{item.time}}</div>
            <div class="content">{{item.text}}</div>
            <div class="line"></div>
        </div>
        <div class="orange">较早评论</div>
        <p>发表评论</p>
        <div v-if="showId" class="small">喜欢的ID就好</div>
        <input v-if="showId" type="text" v-model="name"/>
        <div class="small" >评论</div>
        <textarea v-model="comment"></textarea>
        <button type="submmit" @click="submmit">发表评论</button>
        <div class="load" v-show="showLoad"><img src="../../assets/loading-svg/loading-spinning-bubbles.svg" alt="Loading icon" /></div>
        <transition leave-active-class="animated flipOutY">
            <div v-if="showTip" class="tip"><i class="iconfont">{{icon}}</i>{{tip}}</div>
        </transition>
    </div>
</template>

<script>
import axios from 'axios'
import { setTimeout } from 'timers';
export default {
    props: {
        articleId: Number
    },
    name: 'Comment',
    data () {
        return {
            list: [],
            name: "",
            comment: "",
            parentId: 0,
            showId: true,
            showLoad: false,
            showTip: false,
            tip: '',
            icon: '&#xe982;'
        }
    },
    methods: {
        submmit () {
            if (this.name != '' && this.comment != '') {
                this.showLoad = true
                axios.post('/comment/addComment', {
                    name: this.name,
                    comment: this.comment,
                    articleId: this.articleId,
                    parentId: this.parentId
                }).then((res) => {
                    this.showLoad = false
                    res = res.data
                    if (res.status == 0 && res.result) {
                        this.tip = '评论成功！'
                        this.showTip = true
                        this.name = ""
                        this.comment = ""
                        this.getCommentInfo()
                    } else {
                        this.tip = '请求发送失败..'
                        this.icon = '&#xe626;'
                        this.showTip = true
                    }
                    let _this = this
                    setTimeout(() => _this.showTip = false, 2000)
                })
            }
        },
        getCommentInfo () {
            axios.get('/comment?articleId=' + this.articleId).then((res) => {
                res = res.data
                if (res.status == 0 && res.result) {
                    this.list = res.result.list
                }
            })
        }
    },
    mounted () {
        this.getCommentInfo()
        let arr = document.cookie.split(';')
        for (let item of arr) {
            if (item.split('=')[0] == 'userName' && item.split('=')[1] != "") {
                this.name = item.split('=')[1]
                this.showId = false
                break
            } else {
                
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '../../assets/icon/iconfont.css'
    @import '../../assets/animate.css'
    .wrapper
        width 870px
        margin 20px auto
        p
            font-size 20px
            color rgb(51,51,51)
            margin 20px 0
        a
            color rgb(239,109,87)
        .username
            color rgb(239,109,87)
            float left
        .reply
            float right 
        .time
            color rgb(102,102,102)
            font-size 10px
            margin 10px 0
        .content 
            font-size 14px
            color rgb(51,51,51)
        .line
            width 95%
            height 1px
            margin 20px auto
            background rgb(238,238,238)
        .orange
            color rgb(239,109,87)
            font-size 15px
            margin 20px 0
        .small
            font-size 15px
            color rgb(68,68,68)
            padding 5px 0
        textarea
            width 850px
            height 150px
            border solid 1px rgb(226,226,226)
            margin 0 auto
        input 
            width 850px
            height 36px
            border solid 1px rgb(226,226,226)
        button 
            color rgb(102,102,102)
            padding 10px 30px
            border solid 1px rgb(226,226,226)
            display block
            margin 20px auto
            background #fff
            cursor pointer
        .load
            position fixed
            z-index 10001
            top 0
            bottom 0
            left 0
            right 0
            background rgba(255,255,255,0.65)
            img 
                position fixed
                left 50%
                margin -32px 0 0 -32px
                top 50%
        .tip
            position fixed
            z-index 10001
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
                color rgb(42,167,154)
</style>
