import React from 'react';

const SearchBar = ({input:keyword, onChange:setKeyword}) => {
  return (
        <div>
            <input
            key="random1"
            value={keyword}
            placeholder={"search recipes"}
            onChange={(e) => setKeyword(e.target.value)}
            />

            <button>Close Search</button>
        </div>
  );
}

export default SearchBar
