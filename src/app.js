// 'use strict'

// import {getList} from './js/test.js'
// // let data = require("./js/test.js")
// // import promise from "es6-promise"
// import fetch from "whatwg-fetch"

// // let data = 'test';

// // let promise = new Promise(function (resolve, reject){
// //   resolve('ok');
// // });

// // promise.then(function (data){
// //   console.log(data);
// // });

// // let str = `this is ${data.data.foo} str`;


// class Point {

//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }

//   toString() {
//     return '(' + this.x + ', ' + this.y + ')';
//   }

// }

// let p = new Point(12, 34);
// console.log(p.toString())
// // console.log(str);

// export function circumference(radius) {
//   return 2 * Math.PI * radius;
// }

// getList(1, 'good').then((data)=> {
//   console.log(data);
// });

// console.log('oh my, this thing is amazing')

import Vue from 'vue';
import VueRouter from 'vue-router';
import routerMap from "./router.js";

Vue.use(VueRouter);

let router = new VueRouter();

routerMap(router);

let App = Vue.extend({});

router.start(App, '#app')