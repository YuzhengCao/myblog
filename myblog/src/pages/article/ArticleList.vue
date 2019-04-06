<template>
    <div class="wrapper">
        <Banner title="随笔" slogan="文采，不存在的"></Banner>
        <h3>分类</h3>
        <el-select v-model="selectType" placeholder="请选择">
            <el-option
            v-for="item in type"
            :key="item"
            :label="item"
            :value="item"
            :change="change">
            </el-option>
        </el-select>
        <div class="load" v-show="!show"><img src="../../assets/loading-svg/loading-bars.svg" alt="Loading icon" /></div>
        <div v-for="item of list" :key="item.articleId">
            <div class="border">
                <img class="pic1" v-show="item.articleId%2 == 1 ? true : false" src="../../assets/article/a1.jpg"/>
                <img class="pic2" v-show="item.articleId%2 == 1 ? false : true" src="../../assets/article/a2.jpg"/>
                <div class="item">
                    <p class="time">{{item.time}}</p>
                    <p class="title"><router-link :to="'/article/' + item.articleId">{{item.title}}</router-link></p>
                    <p class="desc" v-html="item.text"></p>
                    <ul>
                        <li class="comment"><span class="iconfont">&#xe678;</span>{{comment}}</li>
                        <li class="look"><span class="iconfont">&#xe61a;</span>{{look}}</li>
                        <li class="like"><span class="iconfont">&#xe62b;</span>{{like}}</li>
                    </ul>
                </div>
            </div>
            <div class="line" v-if="line"></div>
        </div>
        <Footer v-show="show"></Footer>
    </div>
</template>

<script>
import Banner from '../common/Banner'
import Footer from '../common/Footer'
import axios from 'axios'
export default {
    name: 'Article',
    components: {
        Banner,
        Footer
    },
    data() {
        return {
            line: true,
            list: [],
            show: false,
            type: ['全部'],
            selectType: '全部',
            look: 0,
            like: 0,
            comment: 0
        }
    },
    methods: {
        change () {
            let tmp = []
            for (let item of this.list) {
                if (item.type.contains(selectType)) {
                    tmp.push(item)
                }
            }
            this.list = tmp
        }
    },
    mounted () {
        axios.get('/article').then((res) => {
            res = res.data
            this.show = true
            if (res.status == 0 && res.result) {
                axios.get('/comment').then((res) => {
                    res = res.data
                    if (res.status == 0 && res.result) {
                        this.comment = res.result.length()
                    }
                })
                this.list = res.result.list.sort((a, b) => { return b.articleId - a.articleId })
                for (let item of this.list) {
                    for (let t of item.type) {
                        if (this.type.indexOf(t) == -1) this.type.push(t)
                    }
                }
            }
        })
    }
}
</script>

<style lang="stylus" scoped>
    @import '../../assets/icon/iconfont.css'
    .wrapper
        width 968px
        margin 0 auto
        h3
            float left
            margin 1px 15px
            font-size 16px
        .load
            margin 0 auto
            position fixed
            z-index 100
            top 50%
            left 50%
            img 
                margin -32px 0 0 -32px
    .border
        width 950px
        margin 30px auto 
        border solid 1px rgb(234,234,234)
        .pic1 
            width 500px
            margin -20px
            float left
        .pic2 
            width 500px
            margin -20px
            float right
        .clear
            clear both
        .item
            display flex
            flex-direction column
            padding 30px 30px 30px 40px
            .time
                font-size 8px
                color rgb(153,153,153)
                margin 20px 0 10px 20px
            .title
                font-size 30px
            .desc
                font-size 14px
                color rgb(85,85,85)
                margin 10px 0
                line-height 25px
                display -webkit-box;
                text-overflow ellipsis
                -webkit-line-clamp 4
                -webkit-box-orient vertical
                word-break break-all
                overflow hidden
            li
                span 
                    padding-right 5px
                float left
                list-style none
                font-size 13px
                color rgb(153,153,153)
                padding 30px 20px 10px 20px
    a
        color rgb(51,51,51)
        text-decoration none
    .line
        width 1px
        height 80px
        margin -30px auto
        background rgb(234,234,234)
</style>

