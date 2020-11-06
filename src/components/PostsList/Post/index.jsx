import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, editPost } from "redux/posts/postsActions";
import { DateTime } from "luxon";
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(post.like);
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const isAuthenticated = useSelector(state => state.authentification.isAuthenticated);
  const user = useSelector(state => state.authentification.user);
  const token = useSelector(state => state.authentification.token);
  const postPublishedDate = DateTime.fromISO(post.created_at).setLocale('fr').toLocaleString(DateTime.DATETIME_FULL);
  
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
    if (like === post.like) {
      return
    }
    editPostLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        console.error(error)
      })
    }
    
  return (
    <Card className="col-lg-10">
      <Card.Body>
        <Card.Text>
          {post.text}
        </Card.Text>
        <div className="likeDiv" >
          {isAuthenticated &&
            <Card.Subtitle className="text-muted">{post.like} likes</Card.Subtitle>
          }
          {!alreadyLiked && isAuthenticated &&
            <button className="postBtn" type="submit" onClick={() => likePost(post)}>
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
          }
          {alreadyLiked && isAuthenticated &&
            <button className="postBtn" type="submit" onClick={() => dislikePost(post)}>
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
          }
        </div>
        <div className="authorDiv" >
          {post.user && isAuthenticated &&
            <Card.Link href={`/user/${post.user.id}`}>{post.user.username}</Card.Link>
          }
          posté le {postPublishedDate}
          {post.user && isAuthenticated && post.user.id === user.id &&
            <button className="postBtn" type="submit" onClick={() => destroyPost(post)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          }
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;