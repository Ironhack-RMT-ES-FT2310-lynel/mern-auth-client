import React, { useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { Navigate } from 'react-router-dom'

function IsPrivate(props) {

  const { isLoggedIn } = useContext(AuthContext)

  if (isLoggedIn) {
    // retorna el componente pagina a renderizar
    return props.children
  } else {
    // pensamos usar un navigate()
    // React no nos va a permitir usar navigate() en la base del componente
    
    return <Navigate to={"/login"}/>
  }

}

export default IsPrivate