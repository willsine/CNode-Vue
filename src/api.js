'use strict'
import "whatwg-fetch"

export let getList = async (page, tag) => {
  let response = await fetch(`/api/v1/topics?page=${page}&limit=20&tab=${tag}`, {
    mode: "cors"
  }).catch((error) => {
    console.log(error)
  });

  return await response.json();
}