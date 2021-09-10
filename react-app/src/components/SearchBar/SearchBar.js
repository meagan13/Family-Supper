import React from 'react';
import { useHistory } from 'react-router-dom';

const SearchBar = ({input:keyword, onChange:setKeyword}) => {
    const history = useHistory();

    const clearSearch = () => {
        window.location.reload(false)
    }

    return (
        <div>
            <input
            key="random1"
            value={keyword}
            placeholder={"search recipes"}
            onChange={(e) => setKeyword(e.target.value)}
            />

            <button onClick={clearSearch}>Clear Search</button>
        </div>
  );
}

export default SearchBar
