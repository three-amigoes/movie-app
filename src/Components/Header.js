import { useHistory, Link } from "react-router-dom";
import logo from '../assets/logo.png'

const Header = (props) => {
    let history = useHistory();

    // const [toggleButton, setToggleButton] = useState(true)

    // Changes endpoint to allow search of user query
    const handleSearchQuery = (event) => {
        event.preventDefault();      
        history.push(`/search/${event.target[0].value}`);
        event.target[0].value = '';
    }

    // Changes endpoint to allow list to be displayed
    // const handleFavoriteButton = (event) => {
    //     event.preventDefault();
    //     history.push(`/favorites`);
    // }

    // Changes endpoint to allow list to be displayed
    const handleHomeButton = (event) => {
        event.preventDefault();
        history.push(`/`);
    }

    const goToPreviousPath = () => {
        history.goBack();
    };

    // const toggleState = () => {
    //     setToggleButton(false);
    //     console.log('howdy!')
    // }


    return(
        <header className="wrapper">
            <div className="topBar">
                <div className="topBarLeft">
                    <img onClick={handleHomeButton} className="logo" src={logo} alt="Logo of NotBlockbusters Website" />
                    <form onSubmit={handleSearchQuery} action="search">
                        <div className="searchBar">
                            <label htmlFor="search"></label>
                            <input type="text" name="search" id="search" className="search" placeholder="Search" />
                            <button className="searchButton" type="submit"><span className="iconify" data-icon="gridicons:search" data-inline="false"></span></button>
                        </div>
                    </form>
                </div>
                {
                    props.onFavourite === true
                    ? 
                    <button onClick={goToPreviousPath} className="listButton"> Back </button>
                    :
                    <Link to='/favorites' className="listButton"> Favourites </Link>

                    // toggleButton === true 
                    // ?
                    // <button onClick={toggleState} className="listButton"> Favourites </button>
                    // :
                    // <button onClick={toggleState} className="listButton"> Back </button>
                    

                }
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