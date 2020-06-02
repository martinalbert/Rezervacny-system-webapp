import React, { Component } from 'react';
import axios from 'axios';
import avRoom from '../assets/room_av.jpg'
import navRoom from '../assets/room_nav.jpg'
import {Link} from "react-router-dom";

class RoomList extends Component {
    
  constructor(props){
    super(props);
    this.state={
      pradelny: [],
      studovny: [],
      zabavne: []
    }
    this.zvolit_izbu = this.zvolit_izbu.bind(this);
  }

  zvolit_izbu = (e, data) => {
    console.log("CLICKED", data);
    this.props.callbackFromParent(data);
  }

  componentDidMount(){
    var self = this;
    console.log("IIIIIIIAuthorization", localStorage.getItem('Authorization'));
    var url = "http://localhost:3000/izby/";
    
    axios.get(url)
      .then(function (response) {
        let pradelny = [];
        let studovny = [];
        let zabavne = [];
        
        if(response.status === 200){
            console.log("LOOKING FOR IZBY", response);
            
            response.data.izby.map((item, i) => {
              if (item.izba.typ === "pradelna")
                pradelny.push(item);
              else if(item.izba.typ === "studovna")
                studovny.push(item);
              else {
                zabavne.push(item);
              }
            });

            self.setState({ 
                userID: response.userID,
                pradelny: pradelny,
                studovny: studovny,
                zabavne: zabavne
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
        <div className="izby">
          <div className="pradelny">
              {this.state.pradelny.map((item, i) => {
                  if (item.izba.rezervovana)
                    return <img key={i} className="izba pradelna" src={navRoom} alt="room icon" onClick={((e) => this.zvolit_izbu(e, item))} />
                  else 
                    return <img key={i} className="izba pradelna" src={avRoom} alt="room icon" onClick={((e) => this.zvolit_izbu(e, item))} />
              })}
              <h4>PRADELNY</h4>
          </div>
          <div className="studovne">
              {this.state.studovny.map((item, i) => {
                  if (item.izba.rezervovana)
                    return <img key={i} className="izba studovna" src={avRoom} alt="room icon" onClick={((e) => this.zvolit_izbu(e, item))} />
                  else 
                    return <img key={i} className="izba studovna" src={navRoom} alt="room icon" onClick={((e) => this.zvolit_izbu(e, item))} />
              })}
              <h4>STUDOVNY</h4>
          </div>
          <div className="zabavne">
              {this.state.zabavne.map((item, i) => {
                  if (item.izba.rezervovana)
                    return <img key={i} className="izba zabavna" src={navRoom} alt="room icon" onClick={((e) => this.zvolit_izbu(e, item))} />
                  else 
                    return <img key={i} className="izba zabavna" src={avRoom} alt="room icon" onClick={((e) => this.zvolit_izbu(e, item))} />
              })}
              <h4>ZABAVNE</h4>
          </div>
        </div>
      );
    } else {
      return (
        <div className="izby">
          <h2>Nie ste prihlásený</h2>
          <Link to="/login">Prihlásenie</Link><br/>
          <Link to="/register">Registrácia</Link>
        </div>
      )
    }
  }
}
const style = {
  margin: 15,
};

export default RoomList;