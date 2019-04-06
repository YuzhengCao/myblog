<template>
  <div>
    <home-swiper></home-swiper>
    <home-footer></home-footer>
  </div>
</template>

<script>

import HomeSwiper from './components/Swiper'
import HomeFooter from './components/HomeFooter'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    HomeFooter
  }
}
</script>

<style scoped>

</style>
