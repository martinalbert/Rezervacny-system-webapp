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
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: "",
            login: false,
            register: false
        }
    }

    myCallback = (response) => {
        console.log('getting data back', response);
        if (response.status === 200)
            this.setState({ 
                token: response.data.token,
                login: true
            });
        else
            this.setState({ 
                token: null,
                login: false
            });
    }

  render() {
    // if User isnt loged in - go to login page
    if (!this.state.login){
        return (
            <Login callbackFromParent={this.myCallback}/>
        );
    } else {
        return (
            <Layout>
                <Sidebar>
                    <User />
                    <MojeRezervacie />
                    <MojePoradovniky />
                </Sidebar>
                <Main>
                    <Header>
                        <ArrowBackIcon />
                        <SearchBar />
                    </Header>
                    <RoomList />
                </Main>
            </Layout>
        );
    }
    if (this.state.register){
        return (
            <Layout>
                <Register />
            </Layout>
        );
    }
  }
}

export default App;