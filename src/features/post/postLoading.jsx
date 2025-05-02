import React from 'react';
import Skeleton from 'react-loading-skeleton';
import './postLoading.css';
import './post.css';
import {
    TiArrowUpOutline, 
    TiArrowDownOutline,
    TiMessage,
} from 'react-icons/ti';
import getRandomNumber from '../../utils/getRandomNumber';

const PostLoading = () => {
    return (
      <article className="post">
        <div className='post-votes-container'>
            <button 
                className='icon-action-button up-vote'
                type='button'
                aria-label='upvote post'>
                <TiArrowUpOutline className='icon-action'/>
            </button>
            <Skeleton className="post-votes-value post-votes-value-loading" />
            <button 
                className='icon-action-button down-vote'
                type='button'
                aria-label='downvote post'>
                <TiArrowDownOutline className='icon-action'/>
            </button>
        </div> 
        <div className ="post-container">
        <h3 className="post-title">
            <Skeleton width={getRandomNumber(100, 200)} />
        </h3>
        <div className="post-image-container">
            <Skeleton height={250}  />   
        </div>
        
        <div className="post-details">
          <span>
            <Skeleton width={getRandomNumber(20, 50)} />
          </span>
        <span>
            <Skeleton width={getRandomNumber(50, 100)} />
        </span>
        <span className="post-comments-container">
            <button
                className="icon-action-button"
                type="button"
                aria-label="comment buttonshow comment">
                <TiMessage className='icon-action' />
                </button>
                <Skeleton width={getRandomNumber(20, 50)} />

        </span>
        </div>
        </div>
      </article>  
    );
};

export default PostLoading;