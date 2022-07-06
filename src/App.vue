<template>
  <div id="app">
    <router-view/>
    <FootGuide v-show="$route.meta.show"/>
  </div>
</template>

<script>
import FootGuide from '@/components/FooterGuide'
export default {
  name:'APP',
 components:{
   FootGuide
 },
 mounted()
 {
   this.food(),
   this.userinfo()
 },
 methods: {
    async food()
    {
     await this.$store.dispatch('getAddress')
    },
    async userinfo()
    {
      await this.$store.dispatch('getUserInfo')
    }
 },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 .app
    width 100%
    height 100%
    background #f5f5f5
</style>