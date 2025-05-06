import React, { useState, useEffect } from 'react';
import skeleton from 'react-loading-skeleton';
import './post.css';
import {
    TiArrowUpOutline,
    TiArrowDownOutline,
    TiArrowUpThick,
    TiArrowDownThick,
    TiMessage,
} from 'react-icons/ti';
import moment from 'moment';
import shortenNumber from '../../utils/shortenNumber';
import Card from '../../components/card/card';
import Avatar from '../avatar/avatar';
import Comment from '../comment/comment';

const Post = ({ post, index, onToggleComments }) => {
    const [voteValue, setVoteValue] = useState(0);
    /**
     * @param {number} newValue
     */
    const onHandleVote = (newValue) => {
        if (newValue === voteValue) {
            setVoteValue(0);
        } else if (newValue === 1) {
            setVoteValue(1);
        } else {
            setVoteValue(-1);
        }
    };

    const renderUpVote = () => {
        if (voteValue === 1) {
            return <TiArrowUpThick className='icon-action' />;
        } else {
            return <TiArrowUpOutline className='icon-action' />;
        }
    };

    const renderDownVote = () => {
        if (voteValue === -1) {
            return <TiArrowDownThick className="icon-action" />;
        } else {
            return <TiArrowDownOutline className='icon-action' />;
        }
    };

    const getVoteType = () => {
        if (voteValue === 1) {
            return 'upvote';
        } else if (voteValue === -1) {
            return 'downvote';
        } else {
            return 'neutral';
        }
    };

    const renderComments = () => {
        if (post.errorCommnets) {
            return (
                <div>
                    <h3>Error Loading commnets</h3>
                </div>
            );
        }
        if (post.isLoadingComments) {
            return (
                <div>
                    <skeleton count={3} />
                </div>
            );
        }
        if (post.showingComments) {
            return (
                <div>
                    {post.comments.map((comment) => (
                        <Comment key={comment.id} comment={comment} />
                    ))}
                </div>
            )
        }
        return null;
    };

    return (
        <article key ={post.id}>
          <Card>
            <div className="post-wrapper">
                <div className='post-vote-container'>
                    <button
                     type='button'
                     className={`icon-action-button up-vote ${voteValue === 1 && 'active'}`}
                     aria-label='upvote post'   
                     onClick={()=>onHandleVote(1)}>
                    {renderUpVote()}
                    </button>
                    <p className={`post-vote-value ${getVoteType()}`}>
                        {shortenNumber(post.ups + 1)}
                    </p>

                    <button 
                    type='button'
                    className={`icon-action-button down-vote ${voteValue === 1 && 'active'}`}
                    aria-label='downvote post'
                    onClick={()=>onHandleVote(-1)}>
                    {renderDownVote()}
                    </button>
                    <p className={`post-vote-value ${getVoteType()}`}>
                        {shortenNumber(post.downs + 1)}
                    </p>
                </div>
            
                <div className="post-container">
                    <h3 className="post-title">{post.title}</h3>
                    <div className="post-image-container">
                    <div>
                        <img src={post.url} alt={post.title} className="post-image"/>
                    </div>
                    <div className="post-details">
                        <span className="author-details">
                            <Avatar userName={post.author} />
                            <span className="author-username">{post.author}</span>
                        </span>
                        <span>{moment.unix(post.created_utc).fromNow()}</span>
                        <span className="post-comments-container">

                            <button
                            className={`icon-action-button ${post.showingComments ? 'showing-comments':''}`}
                            type="button"
                            aria-label="comment button"
                            onClick={onToggleComments(index, post.id)}>
                                <TiMessage className="icon-action"/>
                            </button>
                            {shortenNumber(post.num_comments, 1)}
                        </span>
                    </div>
                    {renderComments()}
                    </div>
                </div>
            </div>
            </Card>  
        </article>

    );
};

export default Post;