import React from 'react';
import moment from 'moment';
import { Comment, Image } from 'semantic-ui-react';

const isOwmMessage = (message, currentUser) => message.user.id === currentUser.uid ? 'message_self':'other_message';

const timeFromNow = time => moment(time).fromNow()


const SingleMessage = ({message, user,currentUser}) => {
  console.log(message);
  console.log(currentUser);
    return (
      
      <Comment>
          <Comment.Avatar src = {message.user.avatar}/>
          <Comment.Content className={isOwmMessage(message,currentUser)}>
            <Comment.Author as='a'>{message.user.name}</Comment.Author>
            <Comment.Metadata>
              {timeFromNow(message.time)}
            </Comment.Metadata>
            {('image') in message?// аналог message.hasOwnProperty('image')
            <Image className='message_image' src={message.image} width='60%'/>:
            
            <Comment.Text>{message.content}</Comment.Text>}
            
          </Comment.Content>
                </Comment>
        
    );
};

export default SingleMessage;