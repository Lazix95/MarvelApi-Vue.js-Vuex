<template>
    <button class="btn btn-success">
      <img src="./../../../assets/img/full star.png">
      <p>Veiw your heroes!!</p>
      </button>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
button {
  position: absolute;
  left: 10px;
  top: 5px;
  border-radius: 10px;
  cursor: pointer;
  > img {
    height: 35px;
    width: 35px;
    float: left;
  }
  > p {
    float: left;
    margin: 10px 0;
  }
}
</style>
