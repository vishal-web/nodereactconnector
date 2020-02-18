import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Header';

class Home extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Header/>
        <h1>Home Page</h1> 
        <Footer/>
      </React.Fragment>
    )
  }

}


export default Home;