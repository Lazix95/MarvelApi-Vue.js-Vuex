<template>
<div class="controll">
    <button class="btn btn-primary" v-if="backButton && !searching"><router-link to="/page/1">Get Back To Page One</router-link></button>
    <button class="btn btn-primary" v-if="backShown && !searching && !backButton" @click="goBack">Back</button>
    <button class="btn btn-primary" v-if="forwardShown && !searching" @click="goForward">Forward</button>
</div>
</template>

<script>
export default {
    methods: {

        // Show next page
        goForward: function () {
            this.$router.push("/page/" + (parseInt(this.$route.params.number) + 1));
        },

        // Show pervius page if exist
        goBack: function () {
            if (this.$route.params.number > 1) {
                this.$router.push("/page/" + (parseInt(this.$route.params.number) - 1));
            }
        }
    },
    computed: {

        // Show forward button if nex page exist
        forwardShown: function () {
            return this.$store.getters.getForwardButtonShow;
        },

        // Show back button if pervius page exist
        backShown: function () {
            if (this.$store.getters.getOffset > 0) {
                return true;
            } else if (this.$store.getters.getMin > 0) {
                return true;
            } else {
                return false;
            }
        },

        // Get searching flag
        searching: function () {
            return this.$store.getters.getSearching;
        },

        // Show back button if page > 1
        backButton: function () {
            var number = this.$route.params.number;
            var dataLength = this.$store.getters.getData.length;
            if (number > 1 && dataLength == 0) {
                return true;
            } else {
                return false;
            }
        }
    },
    watch: {

        // Watch for router changes
        $route(to, from) {
            if (
                this.$store.getters.getNameStartsWith.length > 0 ||
                this.$store.getters.getViewBookmarked
            ) {
                this.$store.commit("setOffset", 0 + (to.params.number - 1) * 20);
                this.$store.dispatch("search");
            } else {
                var maxNumber =
                    Math.floor((this.$store.getters.getData.length - 1) / 20) + 1;
                var number = parseInt(to.params.number);
                if (number > maxNumber) {
                    this.$router.push("/page/" + maxNumber);
                    return false;
                }
                this.$store.commit("setMin", -1 + (number - 1) * 20);
                this.$store.commit("setMax", 20 + (number - 1) * 20);
            }
        }
    }
};
</script>

<style lang="less" scoped>
/*
* Buttons style
*/

.controll {
    width: 100%;
    text-align: center;
    margin: 10px 0 50px 0;
    >button {
        margin: 10px;
        border-radius: 5px;
        color: #fff;
        >a {
            color: #ffffff;
            text-decoration: none;
        }
    }
    .buttonDisabled {
        background-color: #737579;
        border-color: #737579;
    }
}
</style>
