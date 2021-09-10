import React from 'react';
import { useHistory } from 'react-router-dom';
import './SearchBar.css'

const SearchBar = ({input:keyword, onChange:setKeyword}) => {
    const history = useHistory();

    const clearSearch = () => {
        window.location.reload(false)
    }

    return (
        <div className="search-div">
            <input className="search-input"
                key="random1"
                value={keyword}
                // placeholder={"search recipes"}
                onChange={(e) => setKeyword(e.target.value)}
            />

            <button className="clear-search-button" onClick={clearSearch}>Clear Search</button>
        </div>
  );
}

export default SearchBar
