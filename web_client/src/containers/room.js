import React, { Component } from 'react';
import axios from 'axios';
import SchoolIcon from '@material-ui/icons/School';
import LocalLaundryServiceIcon from '@material-ui/icons/LocalLaundryService';
import avRoom from '../assets/room_av.jpg'
import navRoom from '../assets/room_nav.jpg'
import transferWithinAStation from 'material-ui/svg-icons/maps/transfer-within-a-station';

class Room extends Component {
    
  constructor(props){
    super(props);
    let izbaID = localStorage.getItem('izbaID') ? localStorage.getItem('izbaID') : "";
    this.state = {
      id: izbaID,  
      nazov: '',
      rezervacie: [],
      rezervovana: false,
      max_rez_doba: 0,
      budova: '',
      typ: ''
    }
  }
  
  componentDidMount (){
    var self = this;
    console.log('STATE', self.state);
    var url1 = "http://localhost:3000/izby/" + self.state.id + "/";
    var url2 = "http://localhost:3000/rezervacie/";
    
    axios.get(url1)
          .then(function (response) {
            console.log('get izba', response);
            if(response.status === 200){
                console.log("LOOKING FOR izba info", response);
                
                
                self.setState({ 
                    nazov: response.data.izba.nazov,
                    budova: response.data.izba.budova.nazov,
                    typ: response.data.izba.typ,
                    rezervovana: response.data.izba.rezervovana,
                    max_rez_doba: response.data.izba.max_rez_doba
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

    axios.get(url2)
          .then(function (response) {
            let rezervacie = [];
            console.log(response);
            if(response.status === 200){
                console.log("LOOKING FOR REZERVACIE PRE TUTO IZBU", response);
                
                response.data.rezervacie.map((item, i) => {
                  if (item.rezervacia.izba.nazov === "pradelna")
                    rezervacie.push(item);
                });
                self.setState({ 
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
      if (this.state.typ == "pradelna") {
        return (
        <section className="izba_section">
            <header className="izba_header">
            <img src={avRoom} alt="room icon" />
            <div className="izba_header_info" >
                <LocalLaundryServiceIcon />
                <h4>{this.state.nazov}</h4>
                <p>budova {this.state.budova}</p>
            </div>
            </header>
            <div className="izba_content">
                <h4>Pradelna</h4>
                <div className="izba_content_info">
                    <div className="izba_content_info_1">
                        <h5>Maximalna doba rezervacie</h5>
                        <h4>{this.state.max_rez_doba}</h4>
                    </div>
                    <div className="izba_content_info_2">
                        <h5>Hodin do dalsej rezervacie</h5>
                        <h4>6</h4>
                    </div>
                </div>
            </div>
            <div className="najblizsie_rezervacie">
                {this.state.rezervacie.map((item, i) => {
                    console.log('test rezervacie pre tuto izbu');
                    return <div key={i} className="rezervacia">S</div>
                })}
            </div>
            <div className="control_buttons">
                
            </div>
        </section>
        );
    } else if (this.state.typ == "studovna") {
        return (
            <section className="izba_section">
                <header className="izba_header">
                <img src={avRoom} alt="room icon" />
                <div className="izba_header_info" >
                    <SchoolIcon />
                    <h4>{this.state.nazov}</h4>
                    <p>budova {this.state.budova}</p>
                </div>
                </header>
                <div className="izba_content">
                    <h4>Studovna</h4>
                    <div className="izba_content_info">
                        <div className="izba_content_info_1">
                            <h5>Maximalna doba rezervacie</h5>
                            <h4>{this.state.max_rez_doba}</h4>
                        </div>
                        <div className="izba_content_info_2">
                            <h5>Hodin do dalsej rezervacie</h5>
                            <h4>6</h4>
                        </div>
                    </div>
                </div>
                <div className="najblizsie_rezervacie">
                    {this.state.rezervacie.map((item, i) => {
                        console.log('test rezervacie pre tuto izbu');
                        return <div key={i} className="rezervacia">S</div>
                    })}
                </div>
                <div className="control_buttons">
                    
                </div>
            </section>
        );
    } else {
        return (
            <section className="izba_section">
                <header className="izba_header">
                <img src={avRoom} alt="room icon" />
                <div className="izba_header_info" >
                    <SchoolIcon />
                    <h4>{this.state.nazov}</h4>
                    <p>budova {this.state.budova}</p>
                </div>
                </header>
                <div className="izba_content">
                    <h4>Zabavne</h4>
                    <div className="izba_content_info">
                        <div className="izba_content_info_1">
                            <h5>Maximalna doba rezervacie</h5>
                            <h4>{this.state.max_rez_doba}</h4>
                        </div>
                        <div className="izba_content_info_2">
                            <h5>Hodin do dalsej rezervacie</h5>
                            <h4>6</h4>
                        </div>
                    </div>
                </div>
                <div className="najblizsie_rezervacie">
                    {this.state.rezervacie.map((item, i) => {
                        console.log('test rezervacie pre tuto izbu');
                        return <div key={i} className="rezervacia">S</div>
                    })}
                </div>
                <div className="control_buttons">
                    
                </div>
            </section>
        );
    }
  }
}
const style = {
  margin: 15,
};

export default Room;