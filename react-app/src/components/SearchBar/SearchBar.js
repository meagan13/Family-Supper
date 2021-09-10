const SearchBar = () => (
    <form action="/" method="get">
        {/* <label htmlFor="header-search">
            <span className="visually-hidden">Search recipes</span>
        </label> */}
        <input
            type="text"
            id="header-search"
            placeholder="Search recipes"
            name="s"
        />
        <button type="submit">Search Button</button>
    </form>
);

export default SearchBar;
