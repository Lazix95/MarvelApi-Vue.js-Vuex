<template>
    <div>
        <h1>There is no result for " <slot></slot> "</h1>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
h1 {
 font-family: monospace;
    font-style: inherit;
    transform: translateY(-50%);
    margin: 30vh 0 10vh 0;
}

@media screen and (max-height: 600px){
    h1{
        transform: translateY(-50%);
    }
}
@media screen and (max-width: 520px){
    h1{
       font-size: 15px
    }
}
</style>
