<template>
    <div class="wrapper">
        <Banner title="留言板" slogan="来了就是想说，犹豫就是想说"></Banner>
        <div class="load" v-show="!show"><img src="../../assets/loading-svg/loading-bars.svg" alt="Loading icon" /></div>
        <div class="box" v-for="item in list" :key="item.messageId">
            <div class="title">{{item.name}}<span class="time">留言于{{item.time}}</span></div>
            <div class="content">{{item.text}}</div>
        </div>
        <div class="pagination" v-show="show">
            <router-link class="pre" @click.native="page-- && goto(page)" :to="'/message/' + (page > 1 ? (page - 1) : page) + '/' +pageSize">«</router-link>
            <li :class="{'active': page == i}" v-for="i of pages" :key="i">
                <router-link @click.native="goto(i)" :to="'/message/' + i + '/' +pageSize">{{i}}</router-link>
            </li>
            <router-link class="next" @click.native="page++ && goto(page)" :to="'/message/' + (page < allPage ? (page + 1) : page) + '/' +pageSize">»</router-link>
        </div>
        <div class="message" v-show="show">
            <p>添加留言</p>
            <div v-if="showId" class="small">喜欢的ID就好</div>
            <input v-if="showId" type="text" v-model="name"/>
            <div class="small">留言</div>
            <textarea v-model="message"></textarea>
            <button type="submmit" @click="submmit">发表留言</button>
        </div>
        <div class="loadding" v-show="showLoad"><img src="../../assets/loading-svg/loading-spinning-bubbles.svg" alt="Loading icon" /></div>
        <transition leave-active-class="animated flipOutY">
            <div v-if="showTip" class="tip"><i class="iconfont">&#xe982;</i>{{tip}}</div>
        </transition>
        <Footer v-show="show"></Footer>
    </div>
</template>

<script>
import Banner from '../common/Banner'
import Footer from '../common/Footer'
import axios from 'axios'
export default {
    name: "Message",
    components: {
        Banner,
        Footer
    },
    data () {
        return {
            list: [],
            show: false,
            page: 1,
            pageSize: 5,
            showItem: 3,
            allPage: 10,
            showId: true,
            name: '',
            message: '',
            showLoad: false,
            showTip: false,
            tip: ''
        }
    },
    methods: {
        goto (index) {
            if (index <= this.allPage && index >= 1) this.page = index
            else if (index < 1) this.page = 1
            else if (index > this.allPage) this.page = this.allPage
            this.getMessageInfo()
        },
        getMessageInfo () {
            axios.get('/message', {
                params: {
                    page: this.$route.params.page || 1,
                    pageSize: this.$route.params.pageSize || 5
                }
            }).then((res) => {
                res = res.data
                this.show = true
                if (res.status == 0 && res.result) {
                    this.pageSize = this.$route.params.pageSize || 5
                    this.allPage = Math.ceil(res.result.sum / this.pageSize)
                    this.list = res.result.list
                }
            })
        },
        submmit () {
            if (this.name != '' && this.message != '') {
                this.showLoad = true
                axios.post('/message/addMessage', {
                    name: this.name,
                    message: this.message,
                }).then((res) => {
                    this.showLoad = false
                    res = res.data
                    if (res.status == 0 && res.result) {
                        this.tip = '留言成功！'
                        this.showTip = true
                        this.name = ""
                        this.message = ""
                        this.getMessageInfo()
                    } else {
                        this.tip = '请求发送失败..'
                    }
                    let _this = this
                    setTimeout(() => _this.showTip = false, 2000)
                })
            }
        }
    },
    computed: {
        pages: function() {
            let p = []
            let index = 0
            if (this.page < this.showItem) index = Math.min(this.allPage, this.showItem)
            else if (this.page <= this.allPage - this.showItem) {
                index = this.page + Math.floor(this.showItem / 2)
            } else {
                index = this.allPage
            }
            let i = 0
            while (index > 0 && i < this.showItem) {
                p.push(index)
                index--
                i++
            }
            p.sort((a, b) => { return a - b })
            return p
        }
    },
    mounted () {
        this.getMessageInfo()
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
        width 968px
        margin 0 auto
        .load
            margin 0 auto
            position fixed
            z-index 100
            top 50%
            left 50%
            img 
                margin -32px 0 0 -32px
        .box
            width 900px
            margin 10px auto
            padding 20px
            border solid 1px rgb(234,234,234)
            .title
                font-size 20px
                color rgb(51,51,51)
            .time
                color rgb(170,170,170)
                font-size 13px
                padding 5px
            .content
                font-size 20px
                color rgb(51,51,51)
                line-height 30px
                margin-top 20px
        .pagination
            width 400px
            margin 20px 60% 20px
            text-align center
            a
                text-decoration none 
                display inline-block
                border solid 1px rgb(221,221,221)
                padding 7px 16px
                margin 5px
                font-size 15px
                color rgb(14,144,210)
            li
                list-style none
                display inline-block
            li.active
                a
                    color #fff
                    background rgb(14,144,210)
        .message
            width 870px
            margin 20px auto
            p
                font-size 20px
                color rgb(239,109,87)
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
                margin 20px
                background #fff
                cursor pointer
        .loadding
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
