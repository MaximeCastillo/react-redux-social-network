import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { logoutSuccess } from '../../redux/authentification/authActions'
import './header.scss'

const Header = () => {
  const isAuthenticated = useSelector(state => state.authentification.isAuthenticated)

  const history = useHistory()
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutSuccess())
    history.push("/");
  }

  const headNavigation = () => {
    if (isAuthenticated) {
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">My Social Network</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav className="nav-item">
              <Link to="/">Accueil</Link>
            </Nav>
            <Nav className="nav-item">
              <Link to="/profile">Profil</Link>
            </Nav>
            <Nav className="nav-item">
              <button onClick={logout}>Se déconnecter</button>
            </Nav>
          </Nav>
        </Navbar>
      )
    } else {
      return (
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">My Social Network</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav className="nav-item">
              <Link to="/">Accueil</Link>
            </Nav>
            <Nav className="nav-item">
              <Link to="/login">Se connecter</Link>
            </Nav>
            <Nav className="nav-item">
              <Link to="/register">Créér un compte</Link>
            </Nav>
          </Nav>
        </Navbar>
      )
    }
  }

	return headNavigation();
}

export default Header;