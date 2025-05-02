import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import Header from './features/header/header';
import Home from './features/home/home';
import Subreddit from './features/subreddit/subreddit';

function App() {
  

  return (
    <>
      <Header />
    <main>
      <Home />
    </main>
      <aside>
        <Subreddit />
        </aside>
      
    </>
  );
};

export default App;
