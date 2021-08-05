import request from "./request"

const getLocalData = {
  getMessage: () =>
  request({
      url: "getMessage",
    })
}

export default getLocalData