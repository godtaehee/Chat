import './App.css';

import { Switch, Route, useHistory } from 'react-router-dom';

import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import { useEffect } from 'react';
import firebase from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/actions/user_action';

function App() {
  충돌 충돌 충돌 WorkSpace2
  let history = useHistory();
  let dispatch = useDispatch();
  const isLoading = useSeledctor((state) => state.user.isLoading);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('user', user);
      if (user) {
        history.push('/');
        dispatch(setUser(user));
      } else {
        history.push('/login');
      }
    });
  }, []);

  if (isLoading) {
    return <div>...loading</div>;
  } else {
    return (
      <Switch>
        <Route exact path="/" component={ChatPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    );
  }
}

export default App;
