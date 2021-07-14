import { useState } from "react";
import { useHistory } from "react-router-dom";

const Form = (props) => {
    let history = useHistory();

    const handleSearchQuery = (event) => {
        event.preventDefault();      
        // console.log(event.target[0].value);
        // setSearchQuery(event.target[0].value);
        // window.location.replace(`/search/${event.target[0].value}`);
        history.push(`/search/${event.target[0].value}`);
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
// onSubmit={(event) => props.handleSearchQuery(event)}