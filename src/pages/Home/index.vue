<template>
  <div>
    <TypeNav />
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand/>
  </div>
</template>

<script>
import Mock from 'mockjs';
import floor from '@/mock/floor.json';
import ListContainer from "./ListContainer"
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'
export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    console.log("Asdasda",Mock.mock("/mock/floor",{code:200,data:floor}) )
    this.$store.dispatch('getFloorList')
    this.$store.dispatch('getUserInfo')
  },
  computed:{
    ...mapState({
      floorList:(state) => state.home.floorList,
    }),
  }
};
</script>

<style scoped>
</style>