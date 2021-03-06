<template>
<div class="modal" ref="modal" @click="$store.commit('closeModal')">
    <div class="modalContent" :class="modalData.class" :style="{backgroundImage:'url('+src+')' }">
        <span class="close" aria-hidden="true">&times;</span>
        <div v-touch:swipe.left="nextHero" v-touch:swipe.right="perviusHero" class="textContent" ref="hero">
            <h2>{{ modalData.name }}</h2>
            <p>{{ description }}</p>
            <p>List of events where {{ name }} showed up:</p>
            <ul>
                <li v-for="event in modalData.events.items" :key="event.id">{{ event.name }}</li>
            </ul>
            <p v-if="isEmpty">List not available!!</p>
        </div>
        <img v-if="!mobile" @click="perviusHero()" class="arrow arrowLeft" src="./../../assets/img/arrowLeft.png">
        <img v-if="!mobile" @click="nextHero()" class="arrow arrowRight" src="./../../assets/img/arrowRight.png">
    </div>
</div>
</template>

<script>
import {
    EventBus
} from "./../../main.js";

export default {
    data: function () {
        return {
            mobile: false
        };
    },

    computed: {

        // Get modal data
        modalData: function () {
            return this.$store.getters.getModalData;
        },

        // Compose url to image
        src: function () {
            return (
                this.modalData.thumbnail.path + "." + this.modalData.thumbnail.extension
            );
        },

        // Set heroe desctiption
        description: function () {
            if (this.modalData.description.length < 1) {
                return "Description not available!!";
            } else {
                return this.modalData.description;
            }
        },

        // Set heroe name
        name: function () {
            return this.modalData.name.split("(")[0];
        },

        // Check for heroe events
        isEmpty: function () {
            if (!this.modalData.events.items) {
                return true;
            }
            if (this.modalData.events.items.length > 0) {
                return false;
            } else {
                return true;
            }
        }
    },
    mounted() {

        // Set key listeners
        document.addEventListener("keyup", this.keyPress, true);
        this.mobileFnc();
    },
    destroyed() {

        // Remove key listeners when component is destroyed
        document.removeEventListener("keyup", this.keyPress, true);
    },
    methods: {

        // Function on arrow press
        keyPress: function (event) {
            if (event.keyCode == 37) {
                this.perviusHero();
            } else if (event.keyCode == 39) {
                this.nextHero();
            }
        },

        // Check if it is mobile device
        mobileFnc: function () {
            var numb = window.innerWidth;
            if (numb < 768) {
                this.mobile = true;
            } else {
                this.mobile = false;
            }
        },

        // Go to next hero
        nextHero: function () {
            this.$store.dispatch("nextHero");
        },

        // Go to pervius hero
        perviusHero: function () {
            this.$store.dispatch("perviusHero");
        }
    }
};
</script>

<style lang="less" scoped>

/*
* Modal style
*/

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 15;
    display: block;
    >.modalContent {
        box-shadow: 10px 10px 69px -2px rgba(0, 0, 0, 0.75);
        border-radius: 20px;
        position: absolute;
        transform: translateX(-50%) translateY(-50%);
        width: 500px;
        height: 500px;
        max-width: 100%;
        max-height: 100%;
        top: 50%;
        left: 50%;
        background-color: aqua;
        text-align: center;
        background-position-x: center;
        background-size: cover;
        >.close {
            margin: 17px 30px 0 0;
            font-size: 25px;
            color: #9b9494;
            cursor: pointer;
            z-index: 999;
            position: absolute;
            right: 0;
        }
        >.textContent {
            width: 100%;
            height: 100%;
            border-radius: 20px;
            box-sizing: border-box;
            padding: 40px 15% 15px 15%;
            background: rgba(0, 0, 0, 0.4);
            color: white;
            position: absolute;
            top: 0;
            font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
            overflow: auto;
            >p {
                padding: 0 25px;
            }
            >ul {
                width: 155px;
                margin: auto;
                padding: 0 40px;
            }
        }
        .textContent::-webkit-scrollbar {
            width: 5px;
        }
        /* Track */
        .textContent::-webkit-scrollbar-track {
            // box-shadow: inset 0 0 5px rgb(128, 128, 128);
            border-radius: 10px;
            margin: 12px 0;
        }
        /* Handle */
        .textContent::-webkit-scrollbar-thumb {
            background: rgba(128, 128, 128, 0.75);
            border-radius: 15px;
        }
        /* Handle on hover */
        .textContent::-webkit-scrollbar-thumb:hover {
            background: rgb(128, 128, 128);
        }
        >.arrow {
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            cursor: pointer;
            width: 45px;
            transition: width 0.5s;
        }
        >.arrowLeft {
            left: 10px;
        }
        >.arrowRight {
            right: 10px;
        }
        >.arrow:hover {
            width: 50px;
        }
    }
    .imageNotFound {
        background-size: 100% 100%;
    }
}
</style>
