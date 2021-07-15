import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './Components/Header';
import DiscoveryLanding from './Components/DiscoveryLanding';
import MovieDetails from './Components/MovieDetails';
import SearchMovie from './Components/SearchMovie';

function App() {


  return (
    <Router>
      <div className="App">
        <Header /> 

        <Route exact path='/' component={DiscoveryLanding}></Route>
        <Route exact path='/movie/:movieID' component={MovieDetails}></Route>
        <Route exact path= '/search/:movieName' component={SearchMovie}></Route>
      </div>
    </Router>
  );
}

export default App;
// Anything after ":" is technically a prop, which we have access to on SearchMovies.js
// Want to pass parameter into component, need to use render={} instead of component={}
// render={() => <SearchMovie searchQuery={searchQuery} /> }