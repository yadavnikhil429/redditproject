
export const rootapi =  'https://redditbackend-qfhn.onrender.com/api/';
export const rootapix = 'http://localhost:3001/api/'

export const getSubreddits = async () =>{
    const response = await fetch(`${rootapix}subreddits?limit=5`);
    if (!response.ok) {
        throw new Error('failed to catch subreddits');
    }
    const json = await response.json();

    return json.data.children.map((subreddit) => subreddit.data);
};

export const getSubredditPosts = async (subreddit) => {
    console.log('Fetching posts for subreddit:', subreddit);
    const response = await fetch(`${rootapix}posts/${subreddit}?limit=5`);

   if (!response.ok) {
        throw new Error('Network response was not ok');
    }   
    const json = await response.json();
    return json.data.children.map((post) => (post.data));
};

export const getPostComments = async (postId) => {
    console.log('Fetching comments for post ID:', postId);

    const response = await fetch(`${rootapix}comments/${postId}?limit=15`);
    if (!response.ok) {
        throw new Error('Could not fetch comments');
    }
    const json = await response.json();
    console.log('Fetched comments:', json);
    
    return json.children.map((comment) => comment.data);
};
