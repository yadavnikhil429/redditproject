import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
    fetchPosts, 
    selectFilteredPosts, 
    setSearchTerm, 
    fetchComments
         } from '../../store/redditSlice';
import getRandomNumber from '../../utils/getRandomNumber';
import './home.css';
import Post from '../post/post';
import PostLoading from '../post/postLoading';

const Home = ()=>{

    const dispatch = useDispatch();
    const posts = useSelector(selectFilteredPosts);
    const reddit = useSelector((state)=> state.reddit);
    const { loading, error, searchTerm, selectedSubreddit } = reddit;

    useEffect(()=>{

        console.log('selectedSubreddit:', selectedSubreddit);
        if (selectedSubreddit){
        dispatch(fetchPosts(selectedSubreddit));}
    }, [dispatch, selectedSubreddit]);
    
    const onToggleComments = (index, postId) => {
        console.log('postIndex:', index, postId);
        dispatch(fetchComments({ index, postId}))
    };
    
    if (loading){
        return (
             <div>
           { Array.from({ length: getRandomNumber(1, 5) }, (_, index) => 
            ( <motion.div 
            key={index}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{duration: 0.5}}>
        <PostLoading/>
            </motion.div>))  } 
     </div>
      );
    }

    if (error){
       return (
        <div className ="error">
          <h2>Failed to Load Posts.</h2>  
          <button 
          type='button'
          onClick={()=> dispatch(fetchPosts(selectedSubreddit))}>
            Try Again
          </button>
        </div>
       );
    }

    if (posts.length === 0){
        return (
            <div className="error">
                <h2>No Posts Matching "{searchTerm}"</h2>
                <button
                type="button"
                onClick={()=> dispatch(setSearchTerm(''))}>
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div>
            {posts.map((post, index) =>(
                <Post
                key={post.id}
                post={post}
                index={index}
                onToggleComments={() => onToggleComments(index, post.id)} />
            ))}
        </div>
    );
};

export default Home;