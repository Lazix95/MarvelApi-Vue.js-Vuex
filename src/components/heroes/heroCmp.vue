<template>
<div>
    <div class="thumbnaill" @mousemove="mouseCrd()">
        <img :src="src" :class="data.class" @click="$store.commit('setModalData',data)">
        <div class="bookmark"><img :src="starSrc" @click="$store.dispatch('saveToLocalStorge',data)" @mouseover="activeTooltip(true)" @mouseout="activeTooltip(false)"></div>
        <p> {{ data.name }}</p>
    </div>
    <app-tooltip v-if="toolTipActive" :x="tooltipX" :y="tooltipY">{{ tooltipStr }}</app-tooltip>
</div>
</template>

 <script>
import tooltip from "./../shared/tooltip.vue";
export default {
    data: function () {
        return {
            unbookmarked: require("../../assets/img/empty star.png"),
            bookmarked: require("../../assets/img/full star.png"),
            toolTipActive: false,
            bookmarkedString: "Bookmark",
            unbookmarkedStrung: "Unbookmark",
            tooltipX: "",
            tooltipY: ""
        };
    },
    props: {
        data: Object,
        arrayOfIds: Array
    },
    computed: {

        // Compose url to hero picture
        src: function () {
            return this.data.thumbnail.path + "." + this.data.thumbnail.extension;
        },

        // Choose star, full or empty
        starSrc: function () {
            var isBkm = this.arrayOfIds.includes(this.data.id);
            var starSrc = isBkm ? this.bookmarked : this.unbookmarked;
            return starSrc;
        },

        // Compose tooltip text
        tooltipStr: function () {
            var str = this.bookmarkedString;
            if (this.arrayOfIds.includes(this.data.id)) {
                str = this.unbookmarkedStrung;
            }
            return str + "\n" + " " + this.data.name.split("(")[0];
        }
    },
    methods: {

        // Activate tooltip
        activeTooltip: function (state) {
            this.toolTipActive = state;
        },

        // Get mouse coordinates
        mouseCrd: function () {
            this.tooltipX = parseInt(event.pageX);
            this.tooltipY = parseInt(event.pageY);
        },

        // Set class "imageNotFound" for heroes whitout images
        setClass: function () {
            var str = this.src.split("/");
            if (str[str.length - 1] == "image_not_available.jpg") {
                this.data.class = "imageNotFound";
            } else {
                this.data.class = "";
            }
        },
    },
    components: {
        appTooltip: tooltip
    },
    created() {
        this.setClass();
    }
};
</script>

 <style lang="less" scoped>
/*
 * Variables
 */

@topAndBottomMargin: 30px;
@marginBetweenThumbnails: 20px;
@thumbnaillBackgroundColor: #7fffd4;
@heroNamesColor: #000000;
@backgroundColor: #ffe4c4;
/*
 * Hero Component Style
 */

.thumbnaill {
    width: 220px;
    height: 275px;
    box-shadow: 10px 10px 29px -5px rgba(0, 0, 0, 0.75);
    margin: @topAndBottomMargin @marginBetweenThumbnails;
    background-color: @thumbnaillBackgroundColor;
    position: relative;
    float: left;
    transition: box-shadow 0.5s;
    >img {
        width: 220px;
        height: 220px;
        object-fit: cover;
        cursor: pointer;
    }
    >.imageNotFound {
        object-fit: unset;
    }
    div {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 10;
        >img {
            height: 30px;
            width: 30px;
            cursor: pointer;
        }
    }
    >.imageNotFound {
        object-fit: unset;
    }
    >p {
        transform: translateX(-50%);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin: 0;
        padding: 12px 10px;
        position: absolute;
        left: 50%;
        width: 200px;
        >a {
            color: @heroNamesColor;
            position: relative;
        }
    }
    >.bookmark {
        position: absolute;
        z-index: 10;
        >img {
            height: 30px;
            width: 30px;
            cursor: pointer;
        }
    }
}

.thumbnaill:hover {
    box-shadow: 10px 10px 29px -5px rgba(59, 225, 237, 1);
}

@media screen and (max-width: 1199px) {
    .thumbnaill {
        margin: @topAndBottomMargin 10px;
    }
}

@media screen and (max-width: 991px) {
    .thumbnaill {
        margin: @topAndBottomMargin @marginBetweenThumbnails;
    }
}

@media screen and (max-width: 599px) {
    .thumbnaill {
        margin: @topAndBottomMargin 5px;
        box-shadow: 1px 10px 29px -5px rgba(0, 0, 0, 0.75);
    }
}

@media screen and (max-width: 480px) {
    .thumbnaill {
        margin: @topAndBottomMargin auto;
        float: none;
        display: inline-block;
        box-shadow: 1px 10px 29px -5px rgba(0, 0, 0, 0.75);
    }
}
</style>
