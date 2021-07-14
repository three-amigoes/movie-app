import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Form from './Form';
import DiscoveryLanding from './DiscoveryLanding';
import MovieDetails from './MovieDetails';
import SearchMovie from './SearchMovie';

function App() {


  return (
    <Router>
      <div className="App">
        <Form /> 

        <Route exact path='/' component={DiscoveryLanding}></Route>
        <Route exact path='/movie/:movieID' component={MovieDetails}></Route>
        <Route exact path= '/search/:movieName' component={SearchMovie}></Route>
      </div>
    </Router>
  );
}

export default App;

// Want to pass parameter into component, need to use render={} instead of component={}
// render={() => <SearchMovie searchQuery={searchQuery} /> }