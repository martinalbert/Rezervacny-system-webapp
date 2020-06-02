import React, { Component } from 'react';
import axios from 'axios';

class MojeRezervacie extends Component {
    
  constructor(props){
    super(props);

    let token = localStorage.getItem('Authorization') ? localStorage.getItem('Authorization').substring(7) : "";
    let userID = localStorage.getItem('userID') ? localStorage.getItem('userID') : "";

    this.state={
      rezervacie: [],
      empty: true,
      userID: userID,
      token: token
    }
  }
  componentDidMount() {
    var self = this;
    console.log("IIIIIII",localStorage.getItem('Authorization'));
    var url = "http://localhost:3000/ubytovany/" + self.state.userID + "/";
    var payload = "bearer " + this.props.parentContext;
    
    axios.get(url)
          .then(function (response) {
            console.log(self.props);
            let rezervacie = [];
            
            if(response.status === 200){
                console.log("LOOKING FOR REZERVACIE", response);
                
                response.data.ubytovany.rezervacie.map((item, i) => {
                  rezervacie.push(item);
                });
                self.setState({ 
                    userID: response.userID,
                    rezervacie: rezervacie
                });
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
        <div className="moje_rezervacie">
              <h2>Moje rezervácie</h2>
              {this.state.rezervacie.map((item, i) => {
                  console.log('test moje_rezervacie');
                  return <div key={i} className="rezervacia moja_rezervacia">R</div>
              })}
        </div>
      );
    } else {
      return (
        <div className="moje_rezervacie"></div>
      );
    }
  }
}
const style = {
  margin: 15,
};

export default MojeRezervacie;