import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Login from './login';
import axios from 'axios';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      meno:'',
      priezvisko:'',
      login: '',
      password:''
    }
  }
  handleClick(event){
    var url = "http://localhost:3000/ubytovany/signup";
    console.log("values",this.state.meno,this.state.priezvisko,this.state.email,this.state.password);
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload = {
      "email": this.state.email,
      "meno": this.state.meno,
      "priezvisko": this.state.priezvisko,
      "login": this.state.login,
      "password": this.state.password
    }
    axios.post(url, payload)
    .then(function (response) {
     console.log(response);
     if(response.data.code == 200){
       console.log("registration successfull");
       
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
        <AppBar
            title="Register"
          />
          <TextField
            hintText="Enter your First Name"
            floatingLabelText="First Name"
            onChange = {(event,newValue) => this.setState({first_name:newValue})}
            />
          <br/>
          <TextField
            hintText="Enter your Last Name"
            floatingLabelText="Last Name"
            onChange = {(event,newValue) => this.setState({last_name:newValue})}
            />
          <br/>
          <TextField
            hintText="Enter your Email"
            type="email"
            floatingLabelText="Email"
            onChange = {(event,newValue) => this.setState({email:newValue})}
            />
          <br/>
          <TextField
            type = "password"
            hintText="Enter your Password"
            floatingLabelText="Password"
            onChange = {(event,newValue) => this.setState({password:newValue})}
            />
          <br/>
          <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
        </div>
        </MuiThemeProvider>
    );
  }
}
const style = {
  margin: 15,
};
export default Register;