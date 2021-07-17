import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './Components/Header';
import DiscoveryLanding from './Components/DiscoveryLanding';
import MovieDetails from './Components/MovieDetails';
import SearchMovie from './Components/SearchMovie';
import FavoriteList from './Components/FavoriteList';

function App() {


  return (
    <Router>
      <div className="App">
        <Header /> 

        <Route exact path='/' component={DiscoveryLanding}></Route>
        <Route exact path='/movie/:movieID' component={MovieDetails}></Route>
        <Route exact path='/search/:movieName' component={SearchMovie}></Route>
        <Route exact path='/favorites' component={FavoriteList}></Route>
      </div>
    </Router>
  );
}

export default App;
// Anything after ":" is technically a prop, which we have access to on SearchMovies.js
// Want to pass parameter into component, need to use render={} instead of component={}
// render={() => <SearchMovie searchQuery={searchQuery} /> }

// 07/16: MVP FUNCTIONALITY COMPLETE! more time to sink in since no class
    // Layout of details (Movie Title, Movie Poster, YouTube, Genres, Actors (3), Year, Runtime, Director)
      // List Items, Search Items, Home Items
    // Error handling when displaying more things on the page (e.g. director)
    // Prevent multiple movie additions. Add option to toggle (add to favorites, remove form fav). 
    // Randomizer Inside List (WITH SLIDER!!!!!!)
    // Start styling page (deciding on layout)
    // Create multiple lists

// 07/17 & 07/18 : 
    // Aim to finish styling & make responsive

