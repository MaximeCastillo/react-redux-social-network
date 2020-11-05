import { NEW_POST, DELETE_POST, EDIT_POST, LOAD_POSTS, LOAD_POSTS_COUNT} from './actionsTypes';

export const newPost = (post) => {
  return {
    type: NEW_POST,
    newPost: post
  }
}

export const editPost = (post) => {
  return {
    type: EDIT_POST,
    toEditPost: post
  }
}


export const deletePost = (post) => {
  return {
    type: DELETE_POST,
    toDeletePost: post
  }
}

export const loadPosts = (posts) => {
  return {
    type: LOAD_POSTS,
    posts: posts
  }

}

export const loadPostsCount = (postsCount) => {
  return {
    type: LOAD_POSTS_COUNT,
    postsCount: postsCount
  }
}