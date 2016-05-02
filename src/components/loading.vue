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
    top: 2.1rem;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: #fff;
    padding-top: 10rem;
    text-align: center;
  }
</style>