import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import ProductAdmin from './components/ProductAdmin';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import ForgotPasswordVerification from './components/auth/ForgotPasswordVerification';
import ChangePassword from './components/auth/ChangePassword';
import ChangePasswordConfirm from './components/auth/ChangePasswordConfirm';
import Welcome from './components/auth/Welcome';
import Footer from './components/Footer';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Auth } from 'aws-amplify';

library.add(faEdit);

class App extends Component {

  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  };

  setAuthStatus = authenticated => {
    this.setState({isAuthenticated: authenticated})
  }

  setUser = user => {
    this.setState({user: user})
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      const authUser = await Auth.currentAuthenticatedUser();
      this.setAuthStatus(true);
      this.setUser(authUser);
    } catch (err) {
      console.log('err : ',err);
    }
    this.setState({isAuthenticating:false});
  }
  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }
    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Router>
          <div>
            <Navbar auth={authProps}/>
            <Switch>
              <Route exact path="/products" render={(props) => <Products {...props} auth={authProps} />} />
              <Route exact path="/admin" render={(props) => <ProductAdmin {...props} auth={authProps} />} />
              <Route exact path="/login" render={(props) => <LogIn {...props} auth={authProps} />} />
              <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} />} />
              <Route exact path="/forgotpassword" render={(props) => <ForgotPassword {...props} auth={authProps} />} />
              <Route exact path="/forgotpasswordverification" render={(props) => <ForgotPasswordVerification {...props} auth={authProps} />} />
              <Route exact path="/changepassword" render={(props) => <ChangePassword {...props} auth={authProps} />} />
              <Route exact path="/changepasswordconfirmation" render={(props) => <ChangePasswordConfirm {...props} auth={authProps} />} />
              <Route exact path="/welcome" render={(props) => <Welcome {...props} auth={authProps} />} />
              <Route exect path="/" render={(props) => <Home {...props} auth={authProps} />} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

// // ------------------------Old Routings
// <Route exact path="/" component={Home} />
// <Route exact path="/products" component={Products} />
// <Route exact path="/admin" component={ProductAdmin} />
// <Route exact path="/login" component={LogIn} />
// <Route exact path="/register" component={Register} />
// <Route exact path="/forgotpassword" component={ForgotPassword} />
// <Route exact path="/forgotpasswordverification" component={ForgotPasswordVerification} />
// <Route exact path="/changepassword" component={ChangePassword} />
// <Route exact path="/changepasswordconfirmation" component={ChangePasswordConfirm} />
// <Route exact path="/welcome" component={Welcome} />