import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from 'components/PostsList/Post';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const Profile = () => {
  const user = useSelector(state => state.authentification.user)
  const token = useSelector(state => state.authentification.token)
  const [username, setUserName] = useState("");
  const [description, setDescription] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const posts = useSelector(state => state.posts.posts);

  const profilChange = (e) => {
    e.preventDefault()
    const data = {
      username: username,
      description: description
    }
    fetch(`https://my-pasteque-space.herokuapp.com/users/${user.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response
      })
      .then(response => response.json())
      .then(response => {
        setUserName(username)
        setDescription(description)
        window.location.reload();
      })
      .catch(error => {
        console.error(error)
      })
  }

  useEffect(() => {
    const fetchPosts = () => {
      fetch(`https://my-pasteque-space.herokuapp.com/posts?_sort=created_at:desc&user.id=${user.id}`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response
        })
        .then((response) => response.json())
        .then(response => {
          setUserPosts(response)
        })
        .catch((error) => {
          console.error(error)
        })
    }
    fetchPosts()
  }, [token, user.id, posts])


  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
        <Breadcrumb.Item active>Mon profil</Breadcrumb.Item>
      </Breadcrumb>
      <section style={{ marginTop: "30px" }}>
        <h1>Bienvenue sur votre profil, {user.username} !</h1>
        {user.description &&
        <p>"{user.description}"</p>
        }

        <form onSubmit={profilChange}>
          <div className="form-group">
            <label htmlFor="identifier">Modifier mon pseudo</label>
            <input
              type="text"
              className="form-control"
              id="pseudo"
              placeholder="Nouveau pseudo"
              value={username || user.username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Modifier ma description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Nouvelle description"
              value={description || user.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Modifier mes informations
        </button>
        </form>
        <div className="d-flex" style={{ flexWrap: 'wrap', marginTop: "30px" }}>
          {userPosts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      </section>
    </div>
  )
};

export default Profile;