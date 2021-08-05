import axios from 'axios'

const service = axios.create({
  baseURL:"http://localhost:3002",
})


export default service