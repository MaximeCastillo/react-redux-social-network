import { NEW_POST, DELETE_POST, EDIT_POST, LOAD_POSTS, LOAD_POSTS_COUNT} from './actionsTypes';

const initialState = {
  posts: [],
}

const postsReducer = (state = initialState, action) => {
  switch(action.type) {
    case NEW_POST:
      return {
        ...state,
        posts: state.posts.concat(action.newPost)
      }
      case DELETE_POST:
        return {
          ...state,
          posts: state.posts.filter(post => post.id !== action.toDeletePost.id)
        }
      case EDIT_POST:
        return {
          ...state,
          posts: state.posts.map(post => post.id === action.toEditPost.id ? action.toEditPost : post)
        }
      case LOAD_POSTS: 
        return {
          ...state,
          posts: state.posts.concat(action.posts)
        }
      case LOAD_POSTS_COUNT:
        return {
          ...state,
          postsCount: action.postsCount
        }
      default:
        return state
    }
}

export default postsReducer