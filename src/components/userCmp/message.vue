<template>
<div class="row message" :class="{'justify-content-end': sented, 'justify-content-start': !sented}">
    <div class="col-sm-12 col-md-10 col-lg-8">
        <div class="card" :class="{'bg-primary': sented, 'bg-secondary': !sented}">
            <div class="card-body p-2">
                <p class="mb-0">
                    {{ message }}
                </p>
                <div>
                    <small class="opacity-60">{{ date }}</small>
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<script>
export default {
    props: {
        from: String,
        message: String,
        sented: Boolean,
        time: Number
    },
    computed: {

        // Return message sender
        sender: function () {
            if (this.sented) {
                return "You";
            } else {
                return this.from;
            }
        },

        // Set time of sented message
        date: function () {
            var d = new Date(this.time)
            var time = d.getDate() + "." + d.getMonth() + "." + d.getFullYear() + "  " + d.getHours() + ":" + d.getMinutes() + " h"

            return time
        }
    }
};
</script>

<style lang="less" scoped>
/*
* Message style
*/

.messageWindow {
    margin-top: 15px;
    position: relative;
    >.message {
        background-color: #ecf8f6;
        margin-top: 20px;
    }
    >.you {
        position: absolute;
        left: 0;
        top: -10px
    }
    >.sender {
        position: absolute;
        right: 0;
        top: -10px
    }
}

.message {
    margin-top: 15px;
}
</style>
