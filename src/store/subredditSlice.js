import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getSubreddits} from '../api/redditapi';

export const fetchSubreddits = createAsyncThunk(
    'subreddits/fetchSubreddits',
    async () => {
        const response = await getSubreddits();
        return response;
    }
);

const initialState = {
    subreddits: [],
    loading: false,
    error: false   
};

export const subredditSlice = createSlice({
    name: 'subreddits',
    initialState,
    reducers: {
        
    },
    extrareducers: (builder) => {
        builder
        .addCase(fetchSubreddits.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        .addCase(fetchSubreddits.fulfilled, (state, action) => {
            state.loading = false;
            state.subreddits = action.payload;
        })
        .addCase(fetchSubreddits.rejected, (state) => {
            state.loading = false;
            state.error = true;
        });
    },

});

export default subredditSlice.reducer;
export const selectSubreddits = (state) => state.subreddits.subreddits;
