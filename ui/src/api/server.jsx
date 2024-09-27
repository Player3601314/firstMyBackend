import axios from "axios"
const token = JSON.parse(localStorage.getItem("token"))
const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    Authorization: token
  }
})

export default api