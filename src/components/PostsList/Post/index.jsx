import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector,useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { deletePost, editPost } from "redux/posts/postsActions";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(post.like);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const isAuthenticated = useSelector(state => state.authentification.isAuthenticated);
  const user = useSelector(state => state.authentification.user);
  const token = useSelector(state => state.authentification.token);
  
  const likePost = () => {
    setLike(like + 1);
    setAlreadyLiked(true);
  };
  const dislikePost = () => {
    setLike(like - 1);
    setAlreadyLiked(false);
  };

  const editPostLikes = () => {
    const data = {
      like,
    };

    fetch(`https://my-pasteque-space.herokuapp.com/posts/${post.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response
    })
    .then((response) => response.json())
    .then(response => {
      dispatch(editPost(response))
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    if(like === post.like){
      return
    }
    editPostLikes();
  }, [like]);

  const destroyPost = (toDeletePost) => {
    fetch(`https://my-pasteque-space.herokuapp.com/posts/${toDeletePost.id}`, {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${token}`
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
      dispatch(deletePost(response))
    })
    .catch(error => {
      alert(error)
    })
  }
  
  return (
    <Card className="col-lg-3">
        <Card.Body>
          <Card.Text>
            {post.text}
          </Card.Text>
          {isAuthenticated &&
            <Card.Subtitle className="mb-2 text-muted">{post.like} likes</Card.Subtitle>
          }
          {post.user && isAuthenticated &&
            <Card.Link href={`/user/${post.user.id}`}>{post.user.username}</Card.Link>
          }
          {post.user && isAuthenticated && post.user.id === user.id &&
            <Button type="submit" onClick={() => destroyPost(post)}>Supprimer</Button>
          }
          {!alreadyLiked &&
          <Button type="submit" variant="success" onClick={() => likePost(post)}>👍</Button>
          }
          {alreadyLiked &&
          <Button type="submit" variant="danger" onClick={() => dislikePost(post)}>👎</Button>
          }
        </Card.Body>
      </Card>
  );
};

export default Post;