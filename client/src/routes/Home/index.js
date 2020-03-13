import React from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

class Home extends React.Component {

  userWelcomeMessage = () => {
    const { isLoggedIn } = this.props;
    const txtMessage = [];

    txtMessage.push(
      <React.Fragment>
        <h4>Welcome</h4>
        <p>Welcome to storyTeller v 1.0.0</p>
      </React.Fragment>
    );

    if (isLoggedIn) {
      txtMessage.push(
        <React.Fragment>
          <p>loggedInUserName</p>
          <p>Here you can share your stories, that you have never shared with anyone anonymous, Also you can allow other users to comment on your story, or just trun off the comment from your story. You can also make any story private once you make that story private that will never show to anyone.</p>
          <p></p>
          <p></p>
        </React.Fragment>
      )
    } else {
      txtMessage.push(<a href="/auth/google"><button className="btn waves-effect waves-light red" type="submit" name="action">Login With Google Account <i className="material-icons right">send</i></button></a>);
    }

    return (
      txtMessage.map((row, index) => (
        <React.Fragment key={index} >
          {row}
        </React.Fragment>
      ))
    )
  }

  render() {   
    return (
      <React.Fragment>
        <Header/>
          <main className="section no-pad-bot" id="index-banner">
            <div className="container">
              <div className="row"> 
                <div className="col s12 m12">
                  {this.userWelcomeMessage()}
                </div>
              </div> 
            </div>
          </main>
        <Footer/>
      </React.Fragment>
    )
  }

}


export default Home;