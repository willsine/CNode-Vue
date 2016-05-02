
export default (router)=> {
  router.map({
    '/home': {
        component: require('./views/home.vue')
    },
    '/topic/:topicId': {
        component: require('./views/topic.vue')
    },
    '/about': {
        component: require('./views/about.vue')
    },
  }),
  router.redirect({
    "*": "/home"
  });

}