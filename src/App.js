import logo from './logo.svg';
import './App.css';

import {Router, Link, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ChatPage}></Route>
        <Route exact path="/" component={ChatPage}>< /Route>
        <Route exact path="/" component={ChatPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
