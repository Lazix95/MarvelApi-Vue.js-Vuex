<template>
  <header>
    <h2>Bookmark Your Favorite Heroes!!</h2>
    <app-hamburger class="navBurger" @click.native="mobileNavActive = !mobileNavActive, mobile = !mobileNavActive" :isActive="!mobileActiveCheck"></app-hamburger>
    <div class="navBurger" v-if= false>
        <p v-html="burger" @click="mobile = !mobile"></p>
    </div>
    <transition name="fade">
      <div class="navbarHolder" v-if="!mobile && mobileNavActive">
       <app-nav-links></app-nav-links>
        <nav class="navbar">
          <img src="./../../assets/marvelLogo.png" class="logo" v-if="!viewBookmarked">
            <bookmarked-heroes-button v-if="viewBookmarked" @click.native="$store.commit('setViewBookmarked', false)" ></bookmarked-heroes-button>
            <input type="text" placeholder="Search Heroes!" id="js-search" value="" v-model="name" @input="$store.commit('setOffset',0)">
          </nav>
      </div>
    </transition>
  </header>
</template>

<script>
import allHerosButton from "./buttons/ShowAllHeroes.vue";
import bookmarkedHeroesButton from "./buttons/showBookmarkedHeroes.vue";
import hamburger from "./buttons/hamburger";
import navLinks from './buttons/navLinks'

export default {
  data: function() {
    return {
      name: "",
      mobile: false,
      mobileNavActive: true
    };
  },
  computed: {
    mobileActiveCheck: function() {
      if (!this.mobile && this.mobileNavActive) {
        return true;
      } else {
        return false;
      }
    },
    viewBookmarked: function() {
      return this.$store.getters.getViewBookmarked;
    }
  },
  methods: {
    mobileFnc: function() {
      var numb = window.innerWidth;
      if (numb < 992) {
        this.mobile = true;
        this.mobileNavActive = false;
      } else {
        this.mobile = false;
        this.mobileNavActive = true;
      }
    }
  },
  watch: {
    name() {
      this.$store.commit("nameStartsWith", this.name);
      this.$store.commit("setOffset", 0)
      this.$store.commit("setViewBookmarked", false)
      this.$store.dispatch("search");
    }
  },
  created() {
    window.addEventListener("resize", this.mobileFnc, true);
    this.mobileFnc()
  },
  components: {
    allHeroesButton: allHerosButton,
    bookmarkedHeroesButton: bookmarkedHeroesButton,
    appHamburger: hamburger,
    appNavLinks:navLinks
  }
};
</script>

<!--  Menu Styling  -->
<style lang="less" scoped>
@backgroundColor: #ffe4c4;

.fade-enter-active,
.fade-leave-active {
  max-height: 68px;
  transition: all 0.5s;
  @media (max-width: 480px) {
    max-height: 160px;
    transition: all 0.8s;
  }
}
.fade-enter, .fade-leave-to{
  max-height: 0;
}

header {
  height: 68px;
  background-color: @backgroundColor;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative;
  > h2 {
    position: absolute;
    z-index: 5;
    transform: translateX(-75%) translateY(-50%);
    left: 50%;
    top: 50%;
    margin: 0;
    font-size: 25px;
  }
  > .navBurger {
    position: absolute;
    top: 10px;
    right: 40px;
    display: none;
    padding: 10px 10px 10px 10px;
    -webkit-appearance: unset;
    > p {
      font-size: 25px;
      margin: 0;
    }
  }
  > .navbarHolder > .navbar {
    width: 100%;
    height: 68px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    background-color: @backgroundColor;
    overflow: auto;
    text-align: center;
    position: relative;
    >img{
      width: 155px;
      height: 30px;
    }
    > input {
      padding: 5px 10px;
      border: none;
      border-radius: 10px;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
    > h2 {
      display: inline-block;
    }
  }
}

@media screen and (max-width: 991px) {
  header {
    min-height: 68px;
    text-align: center;
    width: 100%;
    overflow: hidden;
    height: unset;
    > h2 {
      position: unset;
      z-index: unset;
      transform: none;
      left: unset;
      padding: 15px 0;
    }
    > .navBurger {
      display: block;
    }
    .navbarHolder {
      width: 100%;
    }
  }
}

@media (max-width: 599px) {
  header {
    > h2 {
      font-size: 21px;
      padding: 22px 0;
    }
  }
}

@media screen and (max-width: 480px) {
  header {
    > h2 {
      font-size: 15px;
    }
    .navbarHolder {
      > .navbar {
        height: auto;
        > button {
          position: unset;
          display: block;
          margin: 15px auto;
        }
        > input {
          position: unset;
          display: block;
          margin: 15px auto;
        }
      }
    }
    > .navBurger {
      right: 20px;
    }
  }
}

@media screen and (max-width: 399px) {
  header {
    > h2 {
      display: inline-block;
      margin-right: 40px;
    }
    .navbarHolder {
      > .navbar {
        height: auto;
        > button {
          position: unset;
          display: block;
          margin: 15px auto;
        }
        > input {
          position: unset;
          display: block;
          margin: 15px auto;
        }
      }
    }
  }
}
</style>



