import React, { Component } from "react";
import Layout from "./components/layout";
import Sidebar from "./components/sidebar";
import Main from "./components/main";
import Header from "./components/header";
import User from "./containers/user";
import MojeRezervacie from "./containers/moje_rezervacie";
import MojePoradovniky from "./containers/moje_poradovniky";
import SearchBar from "./containers/search_bar";
import Login from "./containers/login";
import Register from "./containers/register";
import RoomList from "./containers/room_list";
import Room from "./containers/room";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios';
import "./app.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "",
            userID: '',
            izbaID: '',
            login: false,
            register: false,
            detail: false
        }
        this.login = this.login.bind(this);
        this.naZvolenieIzby = this.naZvolenieIzby.bind(this);

        axios.interceptors.request.use(function (config) {
          const token = localStorage.getItem('Authorization');
          config.headers.Authorization = token;
      
          return config;
        });
    }

    login(response) {
        console.log('loging in', response, response.data.token, response.data.userID);
        if (response.status === 200)
            this.setState({ 
                token: response.data.token,
                userID: response.data.userID,
                login: true
            });
        else
            this.setState({ 
                token: null,
                userID: null,
                login: false
            });
        
        console.log('after loging in', this.state.token);
        let sec = "bearer " + this.state.token;
        let userID = this.state.userID;
        localStorage.setItem('Authorization', sec);
        localStorage.setItem('userID', userID);
        window.location.replace('/feed');
    }

    naZvolenieIzby = (response) => {
        console.log('izba bola zvolena', response);
        
        if (response != null)
            this.setState({ 
                detail: true,
                izbaID: response.izba._id
            });
        localStorage.setItem('izbaID', response.izba._id);
        window.location.replace('/detail');
    }

    componentDidMount = () => {
        console.log('componenddidmount', localStorage.getItem('Authorization'));
        console.log('componenddidmount', localStorage.getItem('userID'));

        let authorization = localStorage.getItem('Authorization');
        let userID = localStorage.getItem('userID');

        if ( authorization != null && userID != null) {
            this.setState({
                token: authorization,
                userID: userID,
                login: true
            })
        }
    }

    render() {

        if (localStorage.getItem('Authorization') != null) {
        return (
            <Router>
                <Sidebar>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/feed">Home</Link>
                            </li>
                        </ul>
                    </nav>
                    <User />
                    <MojeRezervacie />
                    <MojePoradovniky />
                </Sidebar>

                <Switch>
                    <Route path="/feed">
                        <Main>
                            <Header>
                                <Link to="/feed">
                                <ArrowBackIcon />
                                </Link>
                                <SearchBar />
                            </Header>
                            <RoomList callbackFromParent={this.naZvolenieIzby} />
                        </Main>
                    </Route>
                    
                    <Route  path="/login" 
                            render={(props) => <Login callbackFromParent={this.login} />} />

                    <Route  path="/register" 
                            render={(props) => <Register callbackFromParent={this.login} />} />
                    
                    <Route path="/detail">
                        <Main>
                            <Header>
                                <ArrowBackIcon />
                                <SearchBar />
                            </Header>
                            <Room />
                        </Main>
                    </Route>
                </Switch>
            </Router>
        );
    } else {
        return (
            <Router>
                <Sidebar>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/feed">Home</Link>
                            </li>
                            <li>
                                <Link to="/login">login</Link>
                            </li>
                            <li>
                                <Link to="/register">register</Link>
                            </li>
                        </ul>
                    </nav>
                    <User />
                    <MojeRezervacie />
                    <MojePoradovniky />
                </Sidebar>

                <Switch>
                    <Route path="/feed">
                        <Main>
                            <Header>
                                <Link to="/feed">
                                    <ArrowBackIcon />
                                </Link>
                                <SearchBar />
                            </Header>
                            <RoomList callbackFromParent={this.naZvolenieIzby} />
                        </Main>
                    </Route>
                    
                    <Route  path="/login" 
                            render={(props) => <Login callbackFromParent={this.login} />} />

                    <Route  path="/register" 
                            render={(props) => <Register callbackFromParent={this.login} />} />
                    
                    <Route path="/detail">
                        <Main>
                            <Header>
                                <ArrowBackIcon />
                                <SearchBar />
                            </Header>
                            <Room />
                        </Main>
                    </Route>
                </Switch>
            </Router>
        );
    }
  }
}

export default App;