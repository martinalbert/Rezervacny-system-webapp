import React, { Component } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import axios from 'axios';

class User extends Component {
    
  constructor(props){
    super(props);
    this.state={
      email: '',
      meno:'',
      login:'',
    }
    this.logout = this.logout.bind(this);
  }

  logout = (e) => {
    console.log("logging out");
    localStorage.removeItem('Authorization');
    localStorage.removeItem('userID');
    console.log('userID: '+localStorage.getItem('userID'),'token: '+ localStorage.getItem('Authorization'));
    this.setState({ 
      meno: '',
      login: ''
    });

    window.location.replace('/login');
  }

  componentDidMount(){
    var self = this;
    let userID = localStorage.getItem('userID');
    var url = "http://localhost:3000/ubytovany/"+userID+"/";
    
    axios.get(url)
      .then(function (response) {

        console.log('componentdidmount user.js', response);
        if(response.status === 200){    
            self.setState({ 
                email: response.data.ubytovany.email,
                meno: response.data.ubytovany.meno + " " + response.data.ubytovany.priezvisko,
                login: response.data.ubytovany.login
            });
            localStorage.setItem('email', response.data.ubytovany.email);
        } else if(response.status === 204){
            console.log("Username password do not match");
            alert("email password do not match")
        }
        else{
            console.log("Username does not exists");
            alert("Username does not exist");
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  render() {
    if (localStorage.getItem('Authorization') != null) {
      return (
        <div className="uzivatel">
          {/* <img src={user_icon} alt="user icon"/> */}
          <PersonIcon />
          <div className="uzivatel_info">
              <h4>{this.state.login}</h4>
              <h4>{this.state.meno}</h4>
          </div>
          <div className="logout_button" onClick={this.logout}>LOGOUT</div>
        </div>
      );
    }else {
      
      return (
        <div className="uzivatel"></div>
      );
    }
  }
}
const style = {
  margin: 15,
};

export default User;