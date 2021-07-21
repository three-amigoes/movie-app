import "./App.css"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from './Components/Header';
import DiscoveryLanding from './Components/DiscoveryLanding';
import MovieDetails from './Components/MovieDetails';
import SearchMovie from './Components/SearchMovie';
import FavoriteList from './Components/FavoriteList';
import {useState} from 'react'

function App() {

  const [onFavourite, setOnFavourite] = useState(false);

  const pageSetter = (onFav) => {
    setOnFavourite(onFav);
  }

  return (
    <Router>
      <div className="App">
        <Header onFavourite={onFavourite} /> 

        <Route exact path='/' render={() => <DiscoveryLanding setter={pageSetter}/>}/>
        <Route exact path='/movie/:movieID' render={(matchProps) => <MovieDetails setter={pageSetter} pathway={matchProps}/>}/>
        <Route exact path='/search/:movieName' render={(matchProps) => <SearchMovie setter={pageSetter} pathway={matchProps}/>}/>
        <Route exact path='/favorites' render={() => <FavoriteList setter={pageSetter}/>}/>
      </div>
    </Router>
  );
}

export default App;
// Anything after ":" is technically a prop, which we have access to on SearchMovies.js
// Want to pass parameter into component, need to use render={} instead of component={}
// render={() => <SearchMovie searchQuery={searchQuery} /> }

// Future Features to Add

// Smol:
// Hover effect on anything clickable

// Not smol
// Related movies
// Next page button
// Create Multiple Lists (Carlie)
// Authentication
// Access to multiple pages (filter out YouTube videos)
// Access TV shows