import React from 'react';

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
      <div className="App">
        
      </div>
    );
  }
}

export default App;
