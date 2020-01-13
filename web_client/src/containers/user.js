import React, { Component } from 'react';
import PersonIcon from '@material-ui/icons/Person';

class User extends Component {
    
  constructor(props){
    super(props);
    this.state={
      meno:'',
      login:'',
    }
  }
  componentWillMount(){
    //   fetch the poradovniky
    // var loginscreen=[];
    // loginscreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
    // var loginmessage = "Not registered yet, Register Now";
    // this.setState({
    //     loginscreen:loginscreen,
    //     loginmessage:loginmessage
    // });
  }
  render() {
    return (
      <div className="uzivatel">
        {/* <img src={user_icon} alt="user icon"/> */}
        <PersonIcon />
        <div className="uzivatel_info">
            {this.state.login}
            {this.state.meno}
        </div>
      </div>
    );
  }
}
const style = {
  margin: 15,
};

export default User;