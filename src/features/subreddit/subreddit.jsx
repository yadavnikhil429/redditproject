import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/card/card';
import { fetchSubreddits, selectSubreddits} from '../../store/subredditSlice';
import './subreddit.css';
import { setSelectedSubreddit, selectSelectedSubreddit } from '../../store/redditSlice';

const Subreddit = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    const selectdSubreddit = useSelector(selectSelectedSubreddit);

    useEffect(()=>{
        dispatch(fetchSubreddits());
    } ,[dispatch]);

    return (
        <div>
            <Card className='subreddit-card'>
                <h2>SubReddits</h2>
                <ul className='subreddit-list'>
                    {subreddits.map((subreddit)=>(
                        <li
                        key={subreddit.id}
                        className={`${selectdSubreddit === subreddit.display_name ? 'active' : ''}`}>
                            <button 
                            type='button'
                            onClick={()=> dispatch(setSelectedSubreddit(subreddit.url))}>
                               
                                 <img 
                                 src={subreddit.icon_img || 
                                    `https://api.adorable.io/avatars/25/${subreddit.display_name}`} 
                                    alt={subreddit.display_name}
                                    />

                                 {subreddit.display_name}
                            </button>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    )
};

export default Subreddit;