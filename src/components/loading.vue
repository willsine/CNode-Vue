<template>
  <div class="load-page" v-if="showLoading">
    <span>{{'(´・ω・｀) ' + loadMsg}}</span>
  </div>
</template>

<script>
  export default {
    props:["showLoading", "loadMsg"]
  }
</script>

<style lang="sass">
  .load-page {
    position: absolute;
    left: 0;
    top: 2rem;
    right: 0;
    bottom: 0;
    z-index: 100;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #fff;
    padding-top: 10rem;
  }
</style>