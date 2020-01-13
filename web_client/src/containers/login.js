import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email:'',
            password:''
        }
    }
    handleClick(event){
        var url = "http://localhost:3000/ubytovany/login/";
        var self = this;
        var payload={
            "email":this.state.email,
            "password":this.state.password
        }
        axios.post(url, payload)
             .then(function (response) {
                console.log(self.props);
                
                if(response.status === 200){
                    console.log("Login successfull", response);
                    var uploadScreen=[];
                    // uploadScreen.push(<UploadScreen appContext={self.props.appContext}/>);

                    self.props.callbackFromParent(response);
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
        return (
            <MuiThemeProvider>
                <div>
                    <TextField
                        hintText="Enter your email"
                        floatingLabelText="email"
                        onChange = {(event, newValue) => this.setState({ email: newValue })}
                    />
                    <br/>
                    <TextField
                        type="password"
                        hintText="Enter your Password"
                        floatingLabelText="Password"
                        onChange = {(event, newValue) => this.setState({ password: newValue })}
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
export default Login;