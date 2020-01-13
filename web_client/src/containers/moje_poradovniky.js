import React, { Component } from 'react';

class MojePoradovniky extends Component {
    
  constructor(props){
    super(props);
    this.state={
      poradovniky: [],
      empty: true
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
      <div className="moje_poradovniky">
            <h2>Moje poradovníky</h2>
            {this.state.poradovniky.map((item, i) => {
                console.log('test moje_poradovniky');
                return <div key={i} className="poradovnik moj_poradovnik">P</div>
            })}
      </div>
    );
  }
}
const style = {
  margin: 15,
};

export default MojePoradovniky;