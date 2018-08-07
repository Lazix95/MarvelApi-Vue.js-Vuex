<template>
  <div id="app">
   <app-menu></app-menu>
   <app-modal v-if="modalOpend"></app-modal>
   <app-hero ></app-hero>
   <app-buttons></app-buttons>
  </div>
</template>

<script>
import menu from "./components/shared/menu.vue";
import hero from "./components/heroesList.vue";
import buttons from "./components/shared/controllButtons.vue";
import modal from "./components/shared/HeroInfo";

export default {
  name: "app",
  data: function() {
    return {
      searching: false
    };
  },
  components: {
    appMenu: menu,
    appHero: hero,
    appButtons: buttons,
    appModal: modal
  },
  computed: {
    modalOpend: function() {
      return this.$store.getters.modalState;
    }
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
}
div {
  text-align: center;
  overscroll-behavior-y: initial;
}
</style>
