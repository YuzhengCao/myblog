<template>
  <div>
    <img v-if="show" class="bg1" src="./assets/bg1.png">
    <img v-if="show" class="bg2" src="./assets/bg2.png">
    <Header v-if="show"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from './pages/common/Header'
export default {
  name: 'app',
  data () {
    return {
      show: true
    }
  },
  components: {
    Header
  },
  watch: {
    $route(to){
      if (to.path.indexOf('/login') != -1 || to.path.indexOf('/admin') != -1) {
        this.show = false
      }
      if (to.path.indexOf('/admin') != -1) {
        let arr = document.cookie.split(';')
        let admin
        for (let item of arr) {
          if (item.split('=')[0] == 'admin' && item.split('=')[1] != "") {
            admin = item.split('=')[1]
            break
          }
        }
        if (!admin || admin == '' ) {
          this.$router.push('/login')
        }
      }
    }
  }
}
</script>

<style lang="stylus">
  *
    margin 0
    padding 0
  .bg1
    display inline-block
    width 190px
    opacity 0.5
    z-index -1
    position fixed
  .bg2
    display inline-block
    width 190px
    opacity 0.5
    z-index -1
    position fixed
    right 0
</style>
