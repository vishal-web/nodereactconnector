import React from 'react';
import Materialize from 'materialize-css';

import './assets/css/materialize.min.css';
import './assets/css/materialize.font.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    
    this.Sidenav = React.createRef();
    this.customStyle = {
      'display' : 'block', 
      'margin' : '0' 
    }
  }

  componentDidMount(){
    Materialize.Sidenav.init(this.Sidenav.current);
  }

  addMaterializeJs = () => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js";
    script.async = true;
    document.body.appendChild(script);
  }

  topBarNav = () => {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return (
        <li><a href="/stories">Public Stories</a></li>
      )
    }
    
    return (
      <React.Fragment>
        <li><a href="#" style={this.customStyle} data-target="slide-out"><i className="material-icons">account_circle</i></a></li>
        <li><a href="/dashboard">LoggedInUserName</a></li>
        <li><a href="/logout">Logout</a></li>
      </React.Fragment>
    )
  }

  googleLogInBtn = () => {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return (
        <React.Fragment>
          <li><a href="/auth/google"><button className="btn waves-effect waves-light red" type="submit" name="action">Login With Google Account <i className="material-icons right">send</i>
          </button></a></li>
        </React.Fragment>
      )
    }

    return null
  }

  sideBarNav = () => {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return (
        <React.Fragment>
          <li><a href="/dashboard"><i className="material-icons">dashboard</i>Dashboard</a></li>
          <li><a href="/logout"><i className="material-icons">logout</i>Logout</a></li>
        </React.Fragment>
      )
    }

    return null;
  }

  addStoryBtn = () => {
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      return (
        <div className="fixed-action-btn">
          <a href='/stories/add' className="btn-floating btn-large red">
            <i className="large material-icons">add</i>
          </a>
        </div>
      )
    }

    return null;
  }
  
  sideBarNavDefault = () => {
    return (
      <React.Fragment>
        <li><div className="divider"></div></li>
        <li><a href="/stories"><i className="material-icons">cloud</i>Public Stories</a></li>
      </React.Fragment>
    )
  }

  render() {
    return (
      <header>
        <nav className="" role="navigation">
          <div className="nav-wrapper container">
            <a id="logo-container" href="/" className="brand-logo center">StoryTeller</a>
            <ul className="right hide-on-med-and-down">{this.topBarNav()}</ul>
            <ul className="left">
              <li><span  style={this.customStyle} data-target="slide-out"  className="sidenav-trigger"><i className="material-icons">menu</i></span></li>
            </ul>
          </div>
        </nav>

        <ul id="slide-out" ref={this.Sidenav} className="sidenav"> 
          {this.googleLogInBtn()}
          {this.sideBarNavDefault()}
          {this.sideBarNav()}
        </ul>

        {this.addStoryBtn()}
      </header>
    )
  }
}


export default Header;