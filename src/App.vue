<template>
<div id="app">
    <app-menu></app-menu>
    <app-modal v-if="modalOpend"></app-modal>
    <router-view></router-view>
</div>
</template>

<script>
import menu from "./components/shared/menu.vue";
import modal from "./components/heroes/HeroInfo";
import table from "./components/table"
export default {
    name: "app",
    data: function () {
        return {
            searching: false
        };
    },
    components: {
        appMenu: menu,
        appModal: modal,
        appTable: table
    },
    computed: {
        modalOpend: function () {
            return this.$store.getters.modalState;
        }
    },
    created(){
        this.$store.dispatch("tryAutoLogin")
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
