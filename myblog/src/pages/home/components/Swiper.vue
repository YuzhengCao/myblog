<template>
    <div class="wrapper">
        <swiper :options="swiperOption">
            <swiper-slide>
                <img src="../../../assets/swiper/1.jpg"/>
                <div class="word">
                    <span><router-link to="/articleList">相信美好的事就要发生</router-link></span>
                </div>
            </swiper-slide>
            <swiper-slide>
                <img src="../../../assets/swiper/2.png"/>
                <div class="word">
                    <span><router-link to="/message/1/5">One or zero, this is a hard way.</router-link></span>
                </div>
            </swiper-slide>
            <swiper-slide>
                <img src="../../../assets/swiper/3.png"/>
                <div class="word">
                    <span><router-link to="/music">不如相忘于江湖</router-link></span>
                </div>
            </swiper-slide>
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
export default {
    name: 'HomeSwiper',
    data () {
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                loop: true,
                autoplay: {
                    delay: 5000,
                    stopOnLastSlide: false,
                    disableOnInteraction: false
                }
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .wrapper >>> .swiper-pagination-bullet-active
        background #fff
    .wrapper
        width 930px
        margin 13px auto
        img
            position relative
            width 100%
            height 560px
        .word 
            background rgba(0,0,0,0.6)
            z-index 100002
            position absolute
            bottom 5px
            padding 15px 0 20px 0
            width 100%
            text-align center
            span 
                font-size 15px
                color #fff
                cursor pointer
                a
                    color #fff
                    text-decoration none
</style>

