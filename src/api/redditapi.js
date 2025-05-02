export const rootapi = 'http://localhost:3001/api/';

export const getSubreddits = async () =>{
    const response = await fetch(`${rootapi}subreddits?limit=5`);
    if (!response.ok) {
        throw new Error('failed to catch subreddits');
    }
    const json = await response.json();

    return json.data.children.map((subreddit) => subreddit.data);
};

export const getSubredditPosts = async (subreddit) => {
    console.log('Fetching posts for subreddit:', subreddit);
    const response = await fetch(`${rootapi}posts/${subreddit}?limit=5`);

   if (!response.ok) {
        throw new Error('Network response was not ok');
    }   
    const json = await response.json();
    return json.data.children.map((post) => (post.data));
};

export const getPostComments = async (postId) => {
    const response = await fetch(`${rootapi}comments/${postId}?limit=5`);
    if (!response.ok) {
        throw new Error('Could not fetch comments');
    }
    const json = await response.json();
    
    return json[1].data.children.map((comment) => comment.data);
};
