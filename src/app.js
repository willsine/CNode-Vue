'use strict'

// import Vue from 'vue';
import VueRouter from 'vue-router';
import routerMap from "./router.js";

Vue.use(VueRouter);

let router = new VueRouter();

routerMap(router);

let App = Vue.extend({});

router.start(App, '#app')