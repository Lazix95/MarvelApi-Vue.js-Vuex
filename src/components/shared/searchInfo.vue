<template>
<div>
    <h2 class="info"><p>There is no result</p> <br>
        <p>
            for " <slot></slot> "
        </p> 
        <br>
        <p v-if="page>1">On page {{ page }} </p>
    </h2>
</div>
</template>

<script>
export default {
    computed: {
        page: function () {
            return this.$route.params.number;
        }
    }
};
</script>

<style lang="less" scoped>
.info {
    font-family: monospace;
    font-style: inherit;
    transform: translateY(-50%);
    margin: 30vh 0 0 0;
    font-size: 25px;
}

p { font-family: monospace;
    font-style: inherit;
    font-size: 25px;
    display: inline-block;
    }

@media screen and (max-width: 520px) {
    p {
        font-size: 15px;
    }
}
</style>
