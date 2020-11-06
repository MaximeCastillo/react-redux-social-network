import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import Post from 'components/PostsList/Post';
import { useSelector } from "react-redux";
import Breadcrumb from 'react-bootstrap/Breadcrumb';

const OtherProfile = () => {
  let { userID } = useParams();
  const token = Cookies.get('token')
  const [user, setUser] = useState({})
  const [userPosts, setUserPosts] = useState([])
  const posts = useSelector(state => state.posts.posts);

  useEffect(() => {
    const fetchUser = () => {
      fetch(`https://my-pasteque-space.herokuapp.com/users/${userID}`, {
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
          setUser(response)
        })
        .catch((error) => {
          console.error(error)
        })
    }

    const fetchPosts = () => {
      fetch(`https://my-pasteque-space.herokuapp.com/posts?_sort=created_at:desc&user.id=${userID}`, {
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
    fetchUser()
    fetchPosts()
  }, [token, userID, posts])

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Accueil</Breadcrumb.Item>
        <Breadcrumb.Item active>Profil de {user.username}</Breadcrumb.Item>
      </Breadcrumb>
      <section style={{ marginTop: "30px" }}>
        <h1>Bienvenue sur le profil de {user.username}</h1>
        {user.description &&
        <p>"{user.description}"</p>
        }
        {(userPosts.length > 0) &&
        <h2>Voici ce qu'il a publié :</h2>
        }
        <div className="d-flex" style={{ flexWrap: 'wrap' }}>
          {userPosts.map((post) => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default OtherProfile;
