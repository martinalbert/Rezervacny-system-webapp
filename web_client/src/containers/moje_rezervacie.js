import React, { Component } from 'react';

class MojeRezervacie extends Component {
    
  constructor(props){
    super(props);
    this.state={
      rezervacie: [],
      empty: true
    }
  }
  componentWillMount(){
    //   fetch the rezervacie
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
      <div className="moje_rezervacie">
            <h2>Moje rezervácie</h2>
            {this.state.rezervacie.map((item, i) => {
                console.log('test moje_rezervacie');
                return <div key={i} className="rezervacia moja_rezervacia">R</div>
            })}
      </div>
    );
  }
}
const style = {
  margin: 15,
};

export default MojeRezervacie;