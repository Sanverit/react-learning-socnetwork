import React from 'react'
import {reduxForm, Field} from 'redux-form'

import Post from './Post/Post'
import { Element } from '../../Common/FormControls/FormControl'
import {required, maxLengthCreator} from '../../../utils/validators/validators'

import { Form, Button, Header, Comment } from 'semantic-ui-react'
import s from './MyPosts.module.css'

const maxLength10 = maxLengthCreator(10);
const Textaria = Element("textarea");

function PostsForm(props){
    return(
        <Form reply onSubmit={props.handleSubmit}>
            <Field 
                placeholder='Tell us more' 
                name={"postMessage"} 
                component={Textaria} 
                validate={[required, maxLength10 ]}
            />
            <Button type='submit' color='orange' content='Add Message' labelPosition='left' icon='edit'/>
        </Form>
    )
}

function MyPosts(props){
    const {myPosts, addPost, likePost} = props;

    const addPostAction = (formData) => {
        console.log('formData', formData)
        addPost(formData.postMessage);
    }

    const onLikePost = (id) => {
        likePost(id);
    }

    return (
        <div className={s.postsWrap}>
           <Header as='h3' dividing>
                My Posts
            </Header>
            <div>
                <PostsReduxForm onSubmit={addPostAction} />
            </div>
            <div className={s.posts}>
                <Comment.Group>
                    { myPosts.map( item => <Post key={item.id} postId={item.id} message={item.post} avatar={item.avatar} likes={item.likesCount} onLikePost={onLikePost}/> ) }
                </Comment.Group>
            </div>
        </div>
    )
}

const PostsReduxForm = reduxForm({
    form: 'posts'
})(PostsForm)

export default MyPosts;