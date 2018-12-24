import React from 'react';
import moment from 'moment';
import { Comment } from 'semantic-ui-react';

const isOwmMessage = (message, user) => message.user.id === user.id ? 'message_self':'';

const timeFromNow = time => moment(time).fromNow()


const SingleMessage = ({message, user}) => {
    return (
        <div>
            <Comment>
          <Comment.Avatar src = {message.user.avatar}/>
          <Comment.Content className={isOwmMessage(message,user)}>
            <Comment.Author as='a'>{message.user.name}</Comment.Author>
            <Comment.Metadata>
              {timeFromNow(message.time)}
            </Comment.Metadata>
            <Comment.Text>{message.content}</Comment.Text>
            {/* <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions> */}
          </Comment.Content>
                </Comment>
        </div>
    );
};

export default SingleMessage;