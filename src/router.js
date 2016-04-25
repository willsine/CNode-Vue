
export default (router)=> {
  router.map({
    '/home': {
        component: require('./views/home.vue')
    }

  }),
  router.redirect({
    "*": "/home"
  });

}