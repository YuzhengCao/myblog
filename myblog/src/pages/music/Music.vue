<template>
    <div class="wrapper">
        <Banner title="音乐" slogan="乱七八糟的个人歌单"></Banner>
        <div class="load" v-show="show"><img src="../../assets/loading-svg/loading-bars.svg" alt="Loading icon" /></div>
        <div class="player"><iframe  ref="player" frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=450 src="//music.163.com/outchain/player?type=0&id=2724562903&auto=1&height=430"></iframe></div>
        <Footer></Footer>
    </div>
</template>

<script>
import Banner from '../common/Banner.vue'
import Footer from '../common/Footer.vue'
export default {
    name: 'Music',
    components: {
        Banner,
        Footer
    },
    data () {
        return {
            show: true
        }
    },
    mounted () {
        let _this = this;
        this.$refs.player.onload = () => {
            _this.show = false
        }
    }
}
</script>

<style lang="stylus" scoped>
    .wrapper
        width 970px
        margin 0 auto
        .load
            margin 0 auto
            position fixed
            z-index 100
            top 50%
            left 50%
            img 
                margin -32px 0 0 -32px
        .player
            width 85%
            margin 0 auto
        iframe 
            width 100%
            height 1000px
</style>

