"use strict"

const axios = require("axios")

exports.getvoucherauth = endpoint => {
  const url = endpoint.url
  const port = endpoint.port
  return axios.request({
    method: "GET",
    baseURL: `${url}:${port}`,
    url: "API endpint",
    params:{
      parm:"value"
    },
    headers: { Accept: "application/json" },
  })
}