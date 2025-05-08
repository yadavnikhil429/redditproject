import React from 'react';
import moment from 'moment';
import Avatar from '../avatar/avatar';
import './comment.css';
import ReactMarkdown from 'react-markdown';

const Comment = ({ comment }) => {
    return (
        <div className='comment'>
            <div className='comment-metadata'>
                <Avatar userName={comment.author} />
                <p className='comment-author'>
                    {comment.author}</p>
                <p className='comment-created-time'>
                    {moment.unix(comment.created_utc).fromNow()}</p>
            </div>
            <ReactMarkdown>{comment.body}</ReactMarkdown>
        </div>
    );
};

export default Comment;