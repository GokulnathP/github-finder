import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    loading:false,
    users : [],
    showClear : false
  }

  componentDidMount(){
      this.clearUsers();
  }

  clearUsers = async () => {
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users:res.data,loading:false,showClear:false});
  }

  searchUsers = async text => {
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users:res.data.items,loading:false,showClear:true});
  }

  render(){
    const { users, loading, showClear} = this.state;

    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search searchUsers = {this.searchUsers} clearUsers = {this.clearUsers} showClear = {showClear}/>
          <Users loading={loading} users={users}/>
        </div>
      </div>
    );
  }
}

export default App;
