<template>
<div class="container">
    <hr>
    <div class="row">
        <div class="col-sm-3 offset-sm-6">
            <h1>{{ user.username }}</h1>
        </div>
    </div>
    <div class="row">
        <div class="col-md-3">
            <div class="avatarSection">
                <img class="avatar rounded-circle img-thumbnail" alt="avatar" :src="userPic">
                <h6>Upload a different photo...</h6>
                <input type="file" class="text-center center-block file-upload" @change="uploadPic($event)">
            </div><br><br>

            <ul class="list-group">
                <li class="list-group-item text-muted">Activity <i class="fa fa-dashboard fa-1x"></i></li>
                <li class="list-group-item"><span class="align-self-center"><strong>Bookmarked: </strong></span> {{ countBookmarked }}</li>
                <li class="list-group-item"><span class="align-self-center"><strong>Likes</strong></span> {{ innerWidth }}</li>
                <li class="list-group-item"><span class="align-self-center"><strong>Posts</strong></span> 37</li>
                <li class="list-group-item"><span class="align-self-center"><strong>Followers</strong></span> 78</li>
            </ul>
            <br>

        </div>
        <div class="col-md-9">
            <ul class="nav nav-tabs  ">
                <router-link tag="li" class="nav-link" active-class="active" to="/userpage" exact><a>User Info</a></router-link>

                <router-link tag="li" class="nav-link " active-class="active" to="/userpage/messages" exact><a>Messages</a></router-link>

                <router-link tag="li" class="nav-link" active-class="active" to="/userpage/settings" exact><a>Settings</a></router-link>

                <router-link tag="li" class="nav-link" :class="{'ml-auto': !mobile}" active-class="active" to="/userpage/newMessage" exact><a>New Message</a></router-link>

            </ul>
            <br>
            <router-view></router-view>
        </div>

    </div>
</div>
</template>

<script>
export default {
    data: function () {
        return {
            mobile: false
        };
    },
    methods: {
        uploadPic: function (input) {
            input = input.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = e => this.$store.commit("setUserPic", e.target.result);
                reader.readAsDataURL(input.files[0]);
            }
        }
    },
    computed: {
        user: function () {
            return this.$store.getters.getUser;
        },
        userPic: function () {
            return this.$store.getters.getUserPic ?
                this.$store.getters.getUserPic :
                "http://ssl.gstatic.com/accounts/ui/avatar_2x.png";
        },
        countBookmarked: function () {
            return this.$store.getters.getArrayOfIds.length;
        },
        innerWidth: function () {
            return window.innerWidth;
        }
    },
    methods: {
        mobileFnc: function () {
            var numb = window.innerWidth;
            if (numb < 460) {
                this.mobile = true
            } else {
                this.mobile = false
            }
        }
    },
    created() {
        window.addEventListener("resize", this.mobileFnc, true);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.mobileFnc, true)
    }
};
</script>

<style lang="less" scoped>
.avatarSection {
    text-align: center;
    >.avatar {
        margin-bottom: 30px;
        max-width: 192px;
        width: 100%;
    }
    >input {
        width: 92px;
    }
}
</style>
