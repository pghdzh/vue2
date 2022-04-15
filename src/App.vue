<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
import Header from './components/header/Header.vue'
import Footer from './components/footer/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  mounted(){
    this.$store.dispatch("categoryList");
  }
}
</script>

<style>

</style>
