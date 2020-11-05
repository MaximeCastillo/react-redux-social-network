import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { newPost } from '../../redux/posts/postsActions';

const PostCreator = () => {
  const isAuthenticated = useSelector(state => state.authentification.isAuthenticated);
  const user = useSelector(state => state.authentification.user);
  const token = useSelector(state => state.authentification.token)

  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const createPost = (e) => {
    e.preventDefault()
    const data = {
      user: user.id,
      text: message
    }
    fetch('https://my-pasteque-space.herokuapp.com/posts', {
      method: 'post',
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
      .then((response) => {
        dispatch(newPost(response))
      setMessage('')
    })
    .catch(error => {
      alert(error)
    })
  }

  return (
    <div>
      { isAuthenticated &&
        <section>
          <h5>Salut {user.username}, tu peux ajouter ton post ici :</h5>
          <Form onSubmit={createPost} >
            <Form.Group controlId="Textarea">
              <Form.Control as="textarea" rows={7} onChange={e => setMessage(e.target.value)} value={message} />
            </Form.Group>
            <Button type="submit">Valider</Button>
          </Form>
        </section>
      }
    </div>
  )
}

export default PostCreator;