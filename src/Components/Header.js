import { useHistory } from "react-router-dom";
import logo from '../assets/logo.png'

const Header = () => {
    let history = useHistory();

    // Changes endpoint to allow search of user query
    const handleSearchQuery = (event) => {
        event.preventDefault();      
        history.push(`/search/${event.target[0].value}`);
        event.target[0].value = '';
    }

    // Changes endpoint to allow list to be displayed
    const handleFavoriteButton = (event) => {
        event.preventDefault();
        history.push(`/favorites`);
    }

    // Changes endpoint to allow list to be displayed
    const handleHomeButton = (event) => {
        event.preventDefault();
        history.push(`/`);
    }

    return(
        <header className="wrapper">
            <div className="topBar">
                <img onClick={handleHomeButton} className="logo" src={logo} alt="Logo of NotBlockbusters Website" />
                <form onSubmit={handleSearchQuery} action="search">
                    <div className="searchBar">
                        <label htmlFor="search"></label>
                        <input type="text" name="search" id="search" className="search" placeholder="Search" />
                        <button className="searchButton" type="submit">&#x1F50E;&#xFE0E;</button>
                    </div>
                </form>

                <button className="listButton" onClick={handleFavoriteButton}> &#9733; Favorites </button>
            </div>


            
            

        </header>
    )
}

export default Header; 
// export {namedValue1, namedValue2, namedValue3}
// console.log(event.target[0].value);
// setSearchQuery(event.target[0].value);
// window.location.replace(`/search/${event.target[0].value}`);
// onSubmit={(event) => props.handleSearchQuery(event)}