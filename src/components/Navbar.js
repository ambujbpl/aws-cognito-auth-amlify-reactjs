import React, { Component } from 'react'
import { Auth } from 'aws-amplify';
export default class Navbar extends Component {
  logoutHandler = async (event) => {
    event.preventDefault();
    try {
      await Auth.signOut();
      console.log("logout succefully");
      this.props.auth.setAuthStatus(false);
      this.props.auth.setUser(null);
      // this.props.history.push('/login');
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            <img src="hexal-logo.png" width="112" height="28" alt="hexal logo" />
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a href="/" className="navbar-item">
              Home
            </a>
            <a href="/products" className="navbar-item">
              Products
            </a>
            <a href="/admin" className="navbar-item">
              Admin
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              {this.props.auth.isAuthenticated && this.props.auth.user && (
                <p>Hello {this.props.auth.user.username}</p>
              )}
              <div className="buttons">
                {!this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/register" className="button is-primary">
                      <strong>Register</strong>
                    </a>
                    <a href="/login" className="button is-light">
                        Log in
                    </a>
                  </div>
                )}
                {this.props.auth.isAuthenticated && (
                  <div>
                    <a href="/changepassword" className="button is-light">
                        Change Password
                    </a>
                    <a href="/login" onClick={this.logoutHandler} className="button is-light">
                        Log Out
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}