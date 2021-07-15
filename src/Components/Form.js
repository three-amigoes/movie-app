import { useState } from "react";
import { useHistory } from "react-router-dom";

const Form = () => {
    let history = useHistory();

    const handleSearchQuery = (event) => {
        event.preventDefault();      
        history.replace(`/search/${event.target[0].value}`);
    }

    return(
        <form onSubmit={handleSearchQuery} action="search">
            <label htmlFor="search"></label>
            <input type="text" name="search" id="search" placeholder="search" />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Form; 
// export {namedValue1, namedValue2, namedValue3}
// console.log(event.target[0].value);
// setSearchQuery(event.target[0].value);
// window.location.replace(`/search/${event.target[0].value}`);
// onSubmit={(event) => props.handleSearchQuery(event)}