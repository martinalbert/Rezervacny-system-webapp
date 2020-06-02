import React, { Component } from 'react';
import axios from 'axios';
import { MapsTransferWithinAStation } from 'material-ui/svg-icons';

class MojePoradovniky extends Component {
    
  constructor(props){
    super(props);
    
    let token = localStorage.getItem('Authorization') ? localStorage.getItem('Authorization').substring(7) : "";
    let userID = localStorage.getItem('userID') ? localStorage.getItem('userID') : "";

    this.state={
      poradovniky: [],
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
              console.log(localStorage.getItem('Authorization'));
              let poradovniky = [];
              
              if(response.status === 200){
                  console.log("LOOKING FOR PORADOVNIKY", response);
                  response.data.ubytovany.poradovniky.map((item, i) => {
                    poradovniky.push(item);
                  });
                  self.setState({ 
                      userID: response.userID,
                      poradovniky: poradovniky
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
        <div className="moje_poradovniky">
              <h2>Moje poradovníky</h2>
              {this.state.poradovniky.map((item, i) => {
                  console.log('test moje_poradovniky');
                  return <div key={i} className="poradovnik moj_poradovnik">P</div>
              })}
        </div>
      );
    } else {
      return (
        <div className="moje_poradovniky"></div>
      );
    }
  }
}
const style = {
  margin: 15,
};

export default MojePoradovniky;