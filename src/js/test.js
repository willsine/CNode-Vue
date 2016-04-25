'use strict'
import "whatwg-fetch"

console.log(fetch)
export let getList = async (page, tag) => {
  let response = await fetch(`https://cnodejs.org/api/v1/topics?page=${page}&limit=20&tab=${tag}`, {
    mode: "cors"
  }).catch((error) => {
    console.log(error)
  })

  // return response;
  return await response.json();
}