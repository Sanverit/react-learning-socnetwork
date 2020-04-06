import { connect } from 'react-redux';

import { addPostCreator, likePostCreator } from '../../../redux/profileReducer'
import MyPosts from './MyPosts';

let mapStateToProps = (state) => {
    return {
        myPosts: state.profilePage.dataPosts,
        newPostText: state.profilePage.newPostText
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (postMessage) => {
            dispatch(addPostCreator(postMessage));
        },
        likePost: (id) => {
            dispatch(likePostCreator(id));
        }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;