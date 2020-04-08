import { connect } from 'react-redux';

import { addPostCreator, likePostCreator } from '../../../redux/profileReducer'
import MyPosts from './MyPosts';
import {AppStateType} from '../../../redux/reduxStore'

let mapStateToProps = (state: AppStateType) => {
    return {
        myPosts: state.profilePage.dataPosts,
        newPostText: state.profilePage.newPostText
    }
};

let mapDispatchToProps = (dispatch: any) => {
    return {
        addPost: (postMessage: string) => {
            dispatch(addPostCreator(postMessage));
        },
        likePost: (id: number) => {
            dispatch(likePostCreator(id));
        }
    }
};

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;