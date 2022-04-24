const { default: Axios } = require("axios");

const _aixos=Axios.create({
  withCredentials: true
})

export default _aixos