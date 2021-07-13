import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import DiscoveryLanding from './DiscoveryLanding';
import DiscoveryDetails from './DiscoveryDetails';


function App() {

  return (
    <Router>
      <div className="App">

        <Route exact path='/' component={DiscoveryLanding}></Route>
        <Route exact path='/aaron/:movieID' component={DiscoveryDetails}></Route>

      </div>
    </Router>
  );
}

export default App;
