import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const navigate = useNavigate()

  const { isLoggedIn, authenticateUser } = useContext(AuthContext)

  const handleLogout = () => {
    // 1. borrar el token
    localStorage.removeItem("authToken")

    // 2. cambiar los estados del contexto de auth. Para eso usamos de nuevo authenticateUser
    authenticateUser()

    // 3. redireccionar a alguna pagina publica
    navigate("/")
  }

  const toggleStyles = (navInfo) => {
    return navInfo.isActive === true ? activeStyles : inActiveStyles;
  };

  const activeStyles = {
    textDecoration: "underline",
  };

  const inActiveStyles = {
    textDecoration: "none",
  };

  if (isLoggedIn) {
    return (
      <nav>
        <NavLink to="/" style={toggleStyles}>Home</NavLink>
        <NavLink to="/private" style={toggleStyles}>Pagina privada</NavLink>
        <button onClick={handleLogout}>cerrar sesión</button>
      </nav>
    );
  } else {
    return (
      <nav>
        <NavLink to="/" style={toggleStyles}>Home</NavLink>
        <NavLink to="/signup" style={toggleStyles}>Registro</NavLink>
        <NavLink to="/login" style={toggleStyles}>Acceso</NavLink>
      </nav>
  );
  }

  
}

export default Navbar;
