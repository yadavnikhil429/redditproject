import { configureStore, combineReducers } from "@reduxjs/toolkit";
import redditSlice from "./redditSlice";
import subredditSlice from "./subredditSlice";



const rootReducer = combineReducers({
    reddit: redditSlice,
    subreddits: subredditSlice,
});

const store = configureStore({
    reducer: rootReducer});

export default store;

