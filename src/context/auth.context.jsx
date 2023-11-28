import { createContext, useEffect, useState } from "react";
import service from "../services/config";



// 1. componente que transmite el contexto (los estados...)
const AuthContext = createContext()


// 2. componente envoltorio donde se crea el contexto (los estados...)
function AuthWrapper(props) {

  // aqui los estados a compartir por contexto
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(true)

  const authenticateUser = async () => {
    // esta funcion va a enviar el token a backend para validarlo
    // usaremos la ruta BE "/verify"
    // si el token es valido, isLoggedIn = true
    // si el token no es valido o no existe, isLoggedIn = false

    
    try {
      
      const response = await service.get("/auth/verify")
      // si el codigo llega a este punto, significa que el token es valido
      console.log(response)
      setIsLoggedIn(true)
      setIsLoading(false)

    } catch (error) {
      // si el codigo llega a este punto (401) significa que el token no es valido o no existe
      console.log(error)
      setIsLoggedIn(false)
      setIsLoading(false)
    }
  }

  // al inicio de que el usuario visita la pagina, valida el token para saber si es un usuario con sesión activa o no
  useEffect(() => {
    authenticateUser()
  }, [])

  const passedContext = {
    authenticateUser
  }

  if (isLoading) {
    return <h3>...validando credenciales</h3>
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children} {/* props.children será toda nuestra App */}
    </AuthContext.Provider>
  )

}

export {
  AuthContext,
  AuthWrapper
}