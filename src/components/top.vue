<template>
   <div class="back-to-top" v-if="isPageTooLong" v-on:click="backToTop">
    <img src="../assets/images/top.svg">
  </div>
</template>

<script>
  export default {
    props: ['isPageTooLong'],

    methods: {
      backToTop() {
        document.body.scrollTop = 0;
      }
    }
  }
</script>

<style lang="sass">
  .back-to-top {
    position: fixed;
    bottom: 4rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    >img{
      width: 100%;
    }
  }
</style>