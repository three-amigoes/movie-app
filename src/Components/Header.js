import { useState } from "react";
import { useHistory } from "react-router-dom";
import FavoriteList from "./FavoriteList";

const Header = () => {
    let history = useHistory();

    const handleSearchQuery = (event) => {
        event.preventDefault();      
        history.replace(`/search/${event.target[0].value}`);
    }

    return(
        <header>
            <h1>Movie App</h1>
            <FavoriteList />
            <button> View List </button>
            
            <form onSubmit={handleSearchQuery} action="search">
                <label htmlFor="search"></label>
                <input type="text" name="search" id="search" placeholder="search" />
                <button type="submit">Submit</button>
            </form>
        </header>
    )
}

export default Header; 
// export {namedValue1, namedValue2, namedValue3}
// console.log(event.target[0].value);
// setSearchQuery(event.target[0].value);
// window.location.replace(`/search/${event.target[0].value}`);
// onSubmit={(event) => props.handleSearchQuery(event)}