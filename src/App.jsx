import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie'
import { loadAccount } from './redux/authentification/authActions'

// COMPONENTS
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile'
import Register from './pages/Register'
import OtherProfile from './pages/OtherProfile'

const App = () => {
  const isAuthenticated = useSelector(state => state.authentification.isAuthenticated)

  const dispatch = useDispatch()

  useEffect(() => {
    if (Cookies.get('token')) {
      fetch('https://my-pasteque-space.herokuapp.com/users/me', {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response
        })
        .then((response) => response.json())
        .then((response) => {
          dispatch(loadAccount(response))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [dispatch])

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login' }} />
      )
    )} />
  );

  return (
    <Router>
      <div>
        <Header />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/user/:userId" component={OtherProfile} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;