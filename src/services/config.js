import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL
})

// para decirle a react que en TODAS las llamadas, envie el token hacemos lo siguiente...
service.interceptors.request.use((req) => {

  const token = localStorage.getItem("authToken")

  // si el token existe, añadelo a el request/llamada
  if (token) {
    req.headers.authorization = `Bearer ${token}`
  }

  return req

})

export default service