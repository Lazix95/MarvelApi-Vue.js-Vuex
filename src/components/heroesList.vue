<template>
     <div class="heroHolder">
        <app-hero v-if="!getSearching && index>getMin && index<getMax" v-for="(hero, index) in getData" :key="hero.id" :data="hero" :arrayOfIds="getArrayOfIds">
        </app-hero>
        <app-search-info v-if="!getSearching && getNameStartsWith && getData.length == 0">{{ getNameStartsWith }}</app-search-info>
        <app-loading-screen v-if="getSearching"></app-loading-screen>
       
    </div>
</template>

<script>
import hero from "./heroCmp.vue";
import animation from "./shared/loadingScreen";
import info from "./shared/searchInfo.vue";
import { mapGetters } from 'vuex'

export default {
  components: {
    appHero: hero,
    appLoadingScreen: animation,
    appSearchInfo: info
  },
  computed:{
   ...mapGetters(['getData'
   ,'getSearching'
   ,'getMin'
   ,'getMax'
   ,'getArrayOfIds'
   ,'getNameStartsWith'
   ])
  },
  beforeCreate() {
		this.$store.commit('initialiseStore');
  } 
};
</script>




<style lang="less" scoped>
.heroHolder {
  width: 1040px;
  text-align: center;
  margin: auto;
  overflow: auto;
 // position: relative;
}

@media screen and (max-width: 1199px) {
  .heroHolder {
    width: 960px;
  }
}

@media screen and (max-width: 991px) {
  .heroHolder {
    width: 520px;
  }
}

@media screen and (max-width: 599px) {
  .heroHolder {
    width: 460px;
  }
}

@media screen and (max-width: 480px) {
  .heroHolder {
    width: 240px;
    text-align: center;
  }
}
</style>
