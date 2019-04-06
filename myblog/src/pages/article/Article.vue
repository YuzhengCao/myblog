<template>
    <div class="wrapper">
        <div class="load" v-show="!show"><img src="../../assets/loading-svg/loading-bars.svg" alt="Loading icon" /></div>
        <div v-show="show" class="article">
            <h1 class="title">{{article.title}}</h1>
            <p class="time">作于{{article.time}}--分类:{{article.type}}</p>
            <div class="line"></div>
            <div class="subtitle">{{article.subtitle}}</div>
            <div class="content" v-html="article.text"></div>
        </div>
        <Comment :articleId="article.articleId" v-if="showComment"></Comment>
        <Footer v-show="show"></Footer>
    </div>
</template>

<script>
import Comment from './Comment'
import axios from 'axios'
import Footer from '../common/Footer'
export default {
    name: 'Article',
    components: {
        Comment,
        Footer
    },
    data () {
        return {
            article: {},
            show: false,
            showComment: false
        }
    },
    watch: {
        article () {
            this.showComment = true
        }
    },
    mounted () {
        axios.get('/article?id=' + this.$route.params.id).then((res) => {
            res = res.data
            this.show = true
            if (res.status == 0 && res.result) {
                this.article = res.result.list[0]
            }
        })
    }
}
</script>

<style lang="stylus" scoped>
    .load
        margin 0 auto
        position fixed
        z-index 100
        top 50%
        left 50%
        img 
            margin -32px 0 0 -32px
    .article
        width 870px
        margin 50px auto
        border solid 1px rgb(221,221,221)
        padding 10px 30px
        .title
            font-size 30px
            color rgb(51,51,51)
            margin 10px 0
        .time
            color rgb(102,102,102)
            font-size 14px
        .line
            width 95%
            height 1px
            margin 20px auto
            background rgb(221,221,221)
        .subtitle
            background rgb(249,249,249)
            font-size 14px
            color rgb(102,102,102)
            padding 10px
            line-height 30px
            border 1px solid rgb(222,222,222)
            margin 10px 0
        .content
            font-size 20px
            color rgb(51,51,51)
            line-height 32px
</style>

