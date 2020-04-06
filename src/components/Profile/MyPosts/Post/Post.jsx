import React from 'react'
import { Comment, Button, Icon, Label } from 'semantic-ui-react'
// import s from './Post.module.css'

function Post(props){
    const {avatar, message, likes, onLikePost, postId} = props;
    return(
        <Comment>
            <Comment.Avatar src={avatar} />
            <Comment.Content>
                <Comment.Author as='a'>Matt</Comment.Author>
                <Comment.Metadata>
                <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>{message}</Comment.Text>
                <Button as='div' labelPosition='right' size='mini'>
                    <Button icon size='mini' onClick={() => onLikePost(postId)}>
                        <Icon name='heart' />
                        Like
                    </Button>
                    <Label as='a' basic pointing='left'>
                        {likes}
                    </Label>
                </Button>
            </Comment.Content>
        </Comment>
    )
}

export default Post;