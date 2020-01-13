import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search';

class SearchBar extends Component {
    
  constructor(props){
    super(props);
    this.state={
      search_query: ""
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
      <div className="search_bar">
        <SearchIcon />
        {this.state.search_query}
      </div>
    );
  }
}
const style = {
  margin: 15,
};

export default SearchBar;