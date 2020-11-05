import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { authSuccess, authFailed } from '../../redux/authentification/authActions'

const Login = () => {
  const isAuthenticated = useSelector(state => state.authentification.isAuthenticated)
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/')
    }
  },  [isAuthenticated, history])

  const newLogin = (e) => {
    e.preventDefault()

    const data = {
      identifier: identifier,
      password: password
    }

    fetch('https://my-pasteque-space.herokuapp.com/auth/local', {
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
        history.push('/')
      })
      .catch(error => {
        dispatch(authFailed())
        alert('Erreur avec la combinaison Identifiant / Mot de passe')
      })
  }

  return (
    <div>
      <h1>Se connecter</h1>
      <form onSubmit={newLogin}>
        <div className="form-group">
          <label htmlFor="identifier">Pseudo ou email</label>
          <input
            type="text"
            className="form-control"
            id="pseudo"
            placeholder="Entrez votre pseudo ou votre adresse mail"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
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
          Se connecter
        </button>
      </form>
    </div>
  )

};

export default Login;