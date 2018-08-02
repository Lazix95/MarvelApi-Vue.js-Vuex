<template>
     <div class="heroHolder">
       <app-modal v-if="modalOpend" :modalData="modalData" :closeModal="closeModal" :nextHero="nextHero" :perviusHero="perviusHero"></app-modal>
        <app-hero v-if="!$store.state.searching && index>min && index<max" v-for="(hero, index) in getHeroes" :key="hero.id" :data="hero" :arrayOfIds="arrayOfIds">
        </app-hero>
        <app-search-info v-if="!searching && searchValue && heroes.length == 0">{{ searchValue }}</app-search-info>
        <app-loading-screen v-if="$store.state.searching"></app-loading-screen>
    </div>
</template>

<script>
import { EventBus } from "../main.js";
import hero from "./heroCmp.vue";
import animation from "./shared/loadingScreen";
import modal from "./shared/HeroInfo.vue";
import info from "./shared/searchInfo.vue";

export default {
  data: function() {
    return {
      heroes: "",
      bookmarkedArray: [],
      arrayOfIds: [],
      searching: false,
      searchEmpty: true,
      modalOpend: false,
      modalData: [],
      searchValue: "",
      min: -1,
      max: 20,
      step: 20
    };
  },
  components: {
    appHero: hero,
    appLoadingScreen: animation,
    appModal: modal,
    appSearchInfo: info
  },
  created() {
    EventBus.$on("bookmarked", data => {
      if (!this.$store.state.arrayOfIds.includes(data.id)) {
        this.$store.state.bookmarkedArray.push(data);
        this.$store.state.arrayOfIds.push(data.id);
         this.$store.state.saveToLocalStorage();
      } else {
        var i = this.bookmarkedArray.map(item => item.id).indexOf(data.id);
        this.bookmarkedArray.splice(i, 1);
        i = this.arrayOfIds.indexOf(data.id);
        this.arrayOfIds.splice(i, 1);
        this.saveToLocalStorage();
      }
    });
    EventBus.$on("searching", (searching, searchValue) => {
      this.searching = searching;
      this.searchValue = searchValue;
    });
    EventBus.$on("searchEmpty", data => {
      this.searchEmpty = data;
    });
    EventBus.$on("goForward", data => {
      if (this.searchEmpty && this.bookmarkedArray.length > this.max) {
        this.min += this.step;
        this.max += this.step;
      }
    });
    EventBus.$on("goBack", data => {
      if (this.searchEmpty && this.min > -1) {
        this.min -= this.step;
        this.max -= this.step;
      }
    });
    EventBus.$on("openModal", data => {
      this.modalData = data;
      this.modalOpend = true;
    });
  },
  methods: {
    saveToLocalStorage: function() {
      this.$localStorage.set("arrayOfIds", JSON.stringify(this.arrayOfIds));
      this.$localStorage.set(
        "bookmarkedArray",
        JSON.stringify(this.bookmarkedArray)
      );
    },
    resetRange: function() {
      this.min = -1;
      this.max = this.step;
    },
    nextHero: function() {
      var next = this.heroes.map(item => item.id).indexOf(this.modalData.id);
      if (this.heroes[next + 1]) {
        this.modalData = this.heroes[next + 1];
      }
    },
    perviusHero: function() {
      var next =
        this.heroes.map(item => item.id).indexOf(this.modalData.id) - 1;
      if (next >= 0) {
        this.modalData = this.heroes[next];
      }
    },
    closeModal: function() {
      if (
        event.target.className == "modal" ||
        event.target.className == "close"
      ) {
        this.modalOpend = false;
      }
    }
  },
  computed:{
    getHeroes:function(){
      return this.$store.state.data;
    }
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
