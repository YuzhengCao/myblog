<template>
    <div class="wrapper">
        <router-link class="beian" to="http://www.miitbeian.gov.cn">辽ICP备17020425号</router-link>
        <p><router-link class="contact" to="mailto:2846291929@qq.com">Contact me</router-link>©2019 Joker. All rights reserved.</p>
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style lang="stylus" scoped>
   .wrapper
        width 968px
        margin 0 auto 
        background rgb(238,238,238)
        padding 15px 0
        text-align center
        .beian
            text-decoration none
            color rgb(14,144,210)
            font-size 14px
            padding 5px 0
        p
            color rgb(102,102,102)
            font-size 13px
            padding 5px 0
            .contact
                text-decoration none
                color rgb(14,144,210)
</style>

