import { createSlice, createSelector, createAsyncThunk} from '@reduxjs/toolkit';
import { getSubredditPosts, getPostComments } from '../api/redditapi';


export const fetchPosts = createAsyncThunk(
  'fetchPosts/redditPosts',
    async (subreddit) => {
        const posts = await getSubredditPosts(subreddit);
        return posts;
    },  
);

export const fetchComments = createAsyncThunk(
    'fetchComments/redditPosts',
    async ({index, postId}) => {

        console.log('Fetching comments for post ID:', index, postId);
        const comments = await getPostComments(postId);
        console.log('Fetched comments:', comments);
        return { index, comments };
    },
);

const initialState = {
    posts: [],
    postComments: [],
    loading: false,
    error: false,
    selectedSubreddit: 'pics',
    searchTerm: '',
};

const redditSlice = createSlice({
    name: 'redditPosts',
    initialState,
    reducers: {
       setSearchTerm(state, action) {
        state.searchTerm = action.payload;
       },
       
       setSelectedSubreddit(state, action){
        state.selectedSubreddit = action.payload;
        state.searchTerm = '';
       },
       toggleShowComments(state, action){
        const postIndex = action.payload;
        const post = state.posts[postIndex];
        if (post) {
            post.showComments = !post.showComments;
        }
       }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(fetchPosts.pending, (state)=>{
            state.loading = true;
            state.error = false;
        })
        .addCase(fetchPosts.fulfilled, (state, action) =>{
            state.loading= false;
            state.posts = action.payload.map((post) => (
                {...post, 
                comments: [],
                showComments: false,
                loadingComments: false,
                error: false
            }));
           state.error = false;  
        })
        .addCase(fetchPosts.rejected, (state, action) =>{
            state.loading = false;
            state.error = true;
        })
        .addCase(fetchComments.pending, (state, action) => {
           const { index } = action.meta.arg;
           const post = state.posts[index];
             if( post ){
                post.loadingComments = true;
                post.error = false;

             }
        })
        .addCase(fetchComments.fulfilled, (state, action) =>{
        const { index, comments } = action.payload;
        const post = state.posts[index];
            if (post) {
                post.loadingComments = false;
                post.comments = comments;
                post.showComments = true;
            }
        })
        .addCase(fetchComments.rejected, (state, action) => {
            const { index } = action.meta.arg;
            const post = state.posts[index];
            if (post) {
                post.loadingComments = false;
                post.error = true;
            }   
        });
    },
});

export const { setSearchTerm, setSelectedSubreddit, toggleShowComments } = redditSlice.actions;
export default redditSlice.reducer;

export const selectPosts = (state) => state.reddit.posts;   
export const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectSelectedSubreddit = (state) => state.reddit.selectedSubreddit;

export const selectFilteredPosts = createSelector(
    [selectPosts, selectSearchTerm],
    (posts, searchTerm) => {
       if (searchTerm !== '') {
        return posts.filter((post) => 
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
       }
       return posts;        
    }
) 