import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import service from "../../services/config";

function Signup() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // estado para manejo de mensajes de error
  const [ errorMessage, setErrorMessage ] = useState("")

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ... contactar al backend para registrar al usuario aqui
    try {

      const newUser = { username, email, password }

      // await axios.post("http://localhost:5005/api/auth/signup", newUser)
      await service.post("/auth/signup", newUser)
      navigate("/login")

      
    } catch (error) {
      console.log(error)
      console.log(error.response.status)
      console.log(error.response.data.errorMessage)
      // abajo primero analiza que error.response exista
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        navigate("/error") // 500
      }
    }
  };

  return (
    <div>

      <h1>Formulario de Registro</h1>
    
      <form onSubmit={handleSignup}>
        
        <label>Nombre de Usuario:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />

        <br />

        <label>Correo Electronico:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Registrar</button>

        <p style={{color: "red"}}>{errorMessage}</p>

      </form>
      
    </div>
  );
}

export default Signup;
