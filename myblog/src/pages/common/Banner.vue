<template>
    <div class="banner">
        <div class="title">{{title}}
        <p>{{slogan}}</p></div>
    </div>
</template>

<script>
export default {
    name: 'Banner',
    props: ["title", "slogan"]
}
</script>

<style lang="stylus" scoped>
    .banner
        width 930px
        margin 10px auto 
        .title
            text-align center
            font-size 32px
            color rgb(51,51,51)
            margin 15px 0
            p
                font-size 18px
                margin 20px 0
                color rgb(170,170,170)
</style>

