
export const rootapi =  'https://redditbackend-qfhn.onrender.com/api/';
export const rootapix = 'http://localhost:10000/api/';


export const getSubreddits = async () =>{
    const response = await fetch(`${rootapi}subreddits`);
    if (!response.ok) {
        throw new Error('failed to catch subreddits');
    }
    const json = await response.json();
    console.log('Fetched subreddits:', json);

    return json.data.children.map((subreddit) => subreddit.data);
};

export const getSubredditPosts = async (subreddit) => {

    console.log('Fetching posts for subreddit:', subreddit);
    const response = await fetch(`${rootapi}posts/${subreddit}`);

   if (!response.ok) {
        throw new Error('Network response was not ok');
    }   
    const json = await response.json();
    console.log('Fetched posts:', json);

    return json.data.children.map((post) => (post.data));
};

export const getPostComments = async (postId) => {
    console.log('client comments for post ID:', postId);

    const response = await fetch(`${rootapi}comments/${postId}`);
    if (!response.ok) {
        throw new Error('Could not fetch comments');
    }
    const json = await response.json();
    console.log('Fetched comments client:', json);

    const comments = json[1]?.data?.children?.filter((item)=> item.kind === 't1')?.map((comment) => comment.data);
    
    return comments || []; // Return an empty array if no comments found
};
