import React, { Component } from 'react';

class RoomList extends Component {
    
  constructor(props){
    super(props);
    this.state={
      pradelny: [],
      studovny: [],
      zabavne: []
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
      <div className="izby">
        <div className="pradelny">
            {this.state.pradelny.map((item, i) => {
                console.log('test pradelny');
                return <div key={i} className="izba pradelna">P</div>
            })}
        </div>
        <div className="studovne">
            {this.state.studovny.map((item, i) => {
                console.log('test studovny');
                return <div key={i} className="izba studovna">S</div>
            })}
        </div>
        <div className="zabavne">
            {this.state.zabavne.map((item, i) => {
                console.log('test zabavne');
                return <div key={i} className="izba zabavna">Z</div>
            })}
        </div>
      </div>
    );
  }
}
const style = {
  margin: 15,
};

export default RoomList;