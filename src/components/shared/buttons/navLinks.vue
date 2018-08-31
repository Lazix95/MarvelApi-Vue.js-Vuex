<template>
<ul class="nav">
    <li class="nav-item">
        <router-link v-if="isSingedIn" class="nav-link" to="/userpage" active-class="active">{{ userName }}</router-link>
    </li>
    <li class="nav-item">
        <router-link v-if="!isSingedIn" class="nav-link" to="/singup" active-class="active">Sing Up</router-link>
    </li>
    <li class="nav-item">
        <router-link v-if="!isSingedIn" class="nav-link" to="/login" active-class="active">LogIn</router-link>
    </li>
    <li class="nav-item">
        <router-link v-if="isSingedIn" class="nav-link" @click.native="$store.dispatch('logOut')" to="/">LogOut</router-link>
    </li>
</ul>
</template>

<script>
export default {
    computed: {

        // Check if logged in
        isSingedIn: function () {
            if (this.$store.getters.getIdToken != null) {
                return true;
            } else {
                return false;
            }
        },

        // Get user name
        userName: function () {
            if (this.$store.getters.getUser) {
                return this.$store.getters.getUser.username;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.nav {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    right: 250px;
    z-index: 1;
}

.active {
    color: #28a745;
}
</style>
