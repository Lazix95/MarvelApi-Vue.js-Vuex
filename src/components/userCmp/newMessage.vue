<template>
<div class="container">
    <div class="row">
        <form role="form" id="contact-form" class="contact-form col-md-12" @submit.prevent="sentMessage($event)">
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <label for="exampleSelect1">Compose New Message:</label>
                        <select class="form-control col-sm-12" id="exampleSelect1" :required="true" @change="setTo($event)">
                            <option value="" disabled :selected="true">Select User Name!!</option>
                            <option v-for="userName in userNames" :key="userName" :value="userName">{{ userName }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <textarea class="form-control textarea" rows="3" name="Message" id="Message" placeholder="Message"></textarea>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <button type="submit" class="btn main-btn pull-right">Send a message</button>
                </div>
            </div>
        </form>
    </div>
</div>
</template>

<script>
export default {
    data: function () {
        return {
            to: null
        }
    },
    computed: {
        userNames: function () {
            return this.$store.getters.getUserNames;
        }
    },
    methods: {
        sentMessage: function ($event) {
            var d = new Date();
            var newMessage = {
                from: this.$store.getters.getUser.username,
                to: this.to,
                status: "New",
                time: d.getTime(),
                messsage: $event.target.Message.value
            };
            this.$store.dispatch("postMessage", newMessage);
            this.$store.dispatch("postSentedMessage", newMessage);
            this.$router.push("/userpage/messages")
        },
        setTo: function (e) {
            this.to = e.target.value;
            console.log(this.to)
        }
    },
    created() {
        this.$store.dispatch("fetchAllUserNames")
    },
};
</script>

<style>

</style>
