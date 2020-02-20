import React from 'react';
import Routes from './routes';
import './App.css';


class App extends React.Component {

  componentDidMount() {
    let url = '/api/user';
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      }).catch(err => {
        console.log(`Err found` , err)
      })
  }

  render () {
    return (
      <Routes/>
    );
  }
}

export default App;
