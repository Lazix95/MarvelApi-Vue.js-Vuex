<template>
<div class="container">
    <div class="row">
        <div class="col-sm-4 threads">
            <app-threed v-for="(sender,index) in senders" :key="index" :from="sender" :msg="messages['from_'+ sender]" @click.native="openThred(sender)"></app-threed>
        </div>
        <div class="col-sm-8 msgContainer">
            <div class="messages card-body" ref='messageDisplay'>
                <app-message v-for="(msg,index) in thredOfMessages" :key="index" :message="msg.messsage" :sented="msg.sented" :from="msg.from" :time="msg.time"></app-message>
            </div>

            <form class="sentMessage" v-on:submit.prevent="sentMessage($event)" v-if="thredOfMessages" autocomplete="off">
                <input name="message" class="form-control sentMessage" type="text" placeholder="Your message here!!">
            </form>

        </div>
    </div>
</div>
</template>

<script>
import threed from "./thred.vue";
import message from "./message.vue";
export default {
    data: function () {
        return {
            longPull: null,
            from: null,
            msgStatus: "Seen",
            checkNew: null
        };
    },
    computed: {
        messages: function () {
            if (this.currentSender) {
                this.$store.dispatch('openThred', this.currentSender)
                if (this.$store.getters.getNewMessage) {
                    this.scrollToBottom();
                }
            }
            return this.$store.getters.getMessages;

        },
        senders: function () {
            var senders = [];
            for (var key in this.messages) {
                senders.push(key.split("_")[1]);
            }
            return senders;
        },
        currentSender: function () {
            return this.$store.getters.getCurrentSender;
        },
        thredOfMessages: function () {
            return this.$store.getters.getThredOfMessages;
        }
    },
    methods: {
        sentMessage: function ($event) {
            var d = new Date();
            var newMessage = {
                from: this.$store.getters.getUser.username,
                to: this.currentSender,
                status: "New",
                time: d.getTime(),
                messsage: $event.target.message.value
            };
            this.$store.dispatch("postMessage", newMessage);
            this.$store.dispatch("postSentedMessage", newMessage);

            $event.target.message.value = "";
        },
        openThred: function (sender) {
            this.checkNew = this.$refs.messageDisplay.childNodes;
            this.$store.dispatch('openThred', sender)
            this.scrollToBottom();
        },
        scrollToBottom: function () {
            var vm = this;
            setTimeout(() => {
                var messageDisplay = vm.$refs.messageDisplay;
                messageDisplay.scrollTop = messageDisplay.scrollHeight;
            }, 0, vm)
        }
    },
    created() {
        var d = new Date();
        //  this.$store.dispatch("postMessage", {
        //     from: "Niko Bitan",
        //     to: "Lazix",
        //     status: "new",
        //     time: d.getTime(),
        //     messsage: "Another Test, Another Test"
        //  });
        this.$store.dispatch("fetchMessages");
        var vm = this;
        this.longPull = setInterval(
            function () {
                vm.$store.dispatch("fetchMessages");
            },
            3000,
            vm
        );
        this.scrollToBottom();
    },
    beforeDestroy() {
        this.$store.commit("setCurrentSender", null),
            this.$store.commit("setThredOfMessages", null)
        clearInterval(this.longPull);
    },
    components: {
        appThreed: threed,
        appMessage: message
    }
};
</script>

<style lang="less" scoped>
.threads {
    border: 1px solid #e7ebea;
    box-sizing: border-box;
    cursor: pointer;
}

.messages {
    border: 1px solid #e7ebea;
    box-sizing: border-box;
    overflow: auto;
    >.message:last-of-type {
        margin-bottom: 70px;
    }
}

.threads,
.messages {
    height: 700px;
    margin-bottom: 15px;
    position: relative;
}

.sentMessage {
    position: absolute;
    bottom: 10px;
    left: 0;
    box-sizing: border-box;
    width: 90%;
    margin: 0 5%;
    width: -moz-available;
    width: -webkit-fill-available;
}

.reverseScroll {
    overflow: auto;
    display: flex;
    flex-direction: column-reverse;
}
.msgContainer{
    padding: 0;
}
</style>
