<template>
<b-container class="messageWindow" :class="{newMessage : msgStatus == 'New'}">
    <p class="col-sm-12">From: {{ from }}</p>
    <p class="col-sm-12">Status: {{ msgStatus }}</p>
</b-container>
</template>

<script>
export default {
    data: function () {
        return {
            status: "Seen"
        }
    },
    props: {
        to: String,
        from: String,
        title: String,
        msg: Object
    },
    computed: {
        msgStatus: function () {
            var msgStatus = "Seen"
            for (var key in this.msg) {
                if (this.msg[key].status == "New") {
                    msgStatus = "New";
                }
            }
            return msgStatus
        }
    }
}
</script>

<style lang="less" scoped>
.messageWindow {
    background-color: #ecf8f6;
    margin-top: 15px;
}

.newMessage {
    background-color: #befbf1;
}
</style>
