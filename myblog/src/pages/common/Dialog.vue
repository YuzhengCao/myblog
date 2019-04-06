<template>
    <div class="wrapper">
        <div class="box">
            <p>喜欢的id就行</p>
            <span class="iconfont" @click="cancel">&#xe621;</span>
            <input type="text" v-model="Id">
            <button class="cancel" type="submmit" @click="cancel">取消</button>
            <button class="ok" type="submmit" @click="ok">确定</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Dialog',
    data () {
        return {
            Id: ""
        }
    },
    methods: {
        cancel () {
            this.$emit("cancel")
        },
        ok () {
            this.$emit("ok", this.Id)
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '../../assets/icon/iconfont.css'
    .wrapper
        z-index 10000
        width 100%
        height 100%
        background rgba(0,0,0,0.6)
        position fixed
        .box
            width 260px
            height 160px
            background #fff
            position fixed
            left 50%
            top 50%
            margin-left -130px
            margin-top -80px
            p
                padding 5px 10px
                width 220px
                background rgb(248,248,248)
                float left
                color rgb(51,51,51)
                border-bottom solid 1px rgb(226,226,226)
            span 
                width 20px
                float right
                background rgb(248,248,248)
                padding 7px 0
                cursor pointer
                color rgb(51,51,51)
                border-bottom solid 1px rgb(226,226,226)
            span:hover
                color rgb(106,106,106)
            input 
                width 85%
                height 30px
                margin 20px 0 10px 20px
                border solid 1px rgb(226,226,226)
                box-shadow: 1px 1px 5px rgba(0,0,0,.1) inset;
            button
                float right
                padding 5px 10px
                margin 20px 20px 20px 0
                border solid 1px rgb(226,226,226)
                cursor pointer
            .ok
                background rgb(46,141,237)
                color #fff
            .cancel
                color rgb(51,51,51)
                background rgb(241,241,241)
</style>

