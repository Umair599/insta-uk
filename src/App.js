import React from 'react';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './components/reducers';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from './components/screens/Login';
import PostList from './components/screens/PostList';
import PostShow from './components/screens/PostShow';
import Explore from './components/screens/Explore';
import Footer from "./components/screens/Footer";
const store= createStore(reducers, applyMiddleware(thunk));
const App = ()=> {
    return (
      <Provider store={store}>
<Router>
<Switch>
              <Route exact path="/" component={Login}/>
              <Route exact path="/home" component={PostList} />
              <Route exact path="/home/:postId" component={PostShow} />
              <Route exact path="/explore/posts" component={Explore}/>
            </Switch>
            <Footer />
</Router>
      </Provider>
    );
}
export default (App);
