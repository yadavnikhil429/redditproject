import React, { useState, useEffect} from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { FaReddit } from 'react-icons/fa';
import './header.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../store/redditSlice';

const Header = () => {
    const [searchTermLocal, setSearchTermLocal ] = useState('');
    const searchTerm = useSelector((state) => state.reddit.searchTerm);
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        setSearchTermLocal(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchTerm(searchTermLocal));
    };

    useEffect(() => {
        setSearchTermLocal(searchTerm);
    }, [searchTerm]);

    return(
        <header>
            <div className='logo'>
                <FaReddit className='logo-icon' />
                <p>
                    Reddit<span>project</span>
                </p>
            </div>
            <form className='search' onSubmit={handleSubmit}>
               <input 
               type='text' 
               value={searchTermLocal}
               placeholder='Search'
               onChange={handleSearch}
                />
               <button
               type='submit'
                aria-label='SearchButton' >
                <HiOutlineSearch />
               </button>

            </form>
        </header>
    );
};

export default Header;