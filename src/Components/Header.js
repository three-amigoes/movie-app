import { useHistory } from "react-router-dom";

const Header = () => {
    let history = useHistory();

    // Changes endpoint to allow search of user query
    const handleSearchQuery = (event) => {
        event.preventDefault();      
        history.push(`/search/${event.target[0].value}`);
    }

    // Changes endpoint to allow list to be displayed
    const handleFavoriteButton = (event) => {
        event.preventDefault();
        history.push(`/favorites`);
    }

    return(
        <header>
            <h1><a href="/">Movie App</a></h1>
            <button onClick={handleFavoriteButton}> View List </button>
            
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