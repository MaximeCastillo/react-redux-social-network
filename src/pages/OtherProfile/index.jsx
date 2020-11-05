import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import Post from 'components/PostsList/Post';

const OtherProfile = () => {
  let { userId } = useParams();
  const token = Cookies.get('token')
  const [user , setUser] = useState({})
  const [userPosts , setUserPosts] = useState([])

  useEffect(() => {
    const fetchUser = () => {
      fetch(`https://my-pasteque-space.herokuapp.com/users/${userId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
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
      alert(error)
    })}

    const fetchPosts = () => {
      fetch(`https://my-pasteque-space.herokuapp.com/posts?user.id=${userId}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
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
        alert(error)
      })}
      fetchUser()
      fetchPosts()
  }, [token, userId])

  return (
    <section>
      <h1>Bienvenue sur le profil de {user.username}</h1>
      <p>{user.description}</p>
      <div className="d-flex" style={{flexWrap: 'wrap'}}>
        {userPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((post) => (
          <Post post={post} key={post.id}/>
        ))}
      </div>
    </section>
  );
};

export default OtherProfile;
