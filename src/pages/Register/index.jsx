import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { authSuccess, authFailed } from '../../redux/authentification/authActions'

const Register = () => {
  const isAuthenticated = useSelector(state => state.authentification.isAuthenticated)
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
  },  [isAuthenticated, history])

  const newRegister = (e) => {
    e.preventDefault()

    const data = {
      username: username,
      email: mail,
      password: password
    }
  
    fetch('https://my-pasteque-space.herokuapp.com/auth/local/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if(!response.ok) {
          throw Error(response.statusText);
        }
        return response
      })
      .then(response => response.json())
      .then(response => {
        dispatch(authSuccess(response));
        history.replace('/')
      })
      .catch(error => {
        dispatch(authFailed())
        alert(error)
      })
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={newRegister}>
        <div className="form-group">
          <label htmlFor="pseudo">Pseudo</label>
          <input
            type="text"
            className="form-control"
            id="pseudo"
            placeholder="Choisissez votre pseudo"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mail">Adresse Email</label>
          <input
            type="email"
            className="form-control"
            id="mail"
            placeholder="Entrez votre adresse email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          M'inscrire
        </button>
      </form>
    </div>
  );
};

export default Register;
