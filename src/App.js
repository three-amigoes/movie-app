import "./App";
import "./App.css"
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

// 07/17: 
// Add Randomizer if possible


// Check final error handling
// Prepare presentation
// Suggestions for movies.

// Post Ideas:
// Create Multiple Lists (Carlie)
// Authentication
// Access to multiple pages (filter out YouTube videos)