import React, { Component, Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import About from './components/pages/About';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class App extends Component {
  state = {
    loading:false,
    users : [],
    user : {},
    repos : [],
    showClear : false,
    alert : null
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

  getUser = async username => {
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({user:res.data,loading:false,showClear:true});
  }

  getUserRepos = async username => {
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({repos:res.data,loading:false,showClear:true});
  }

  setAlert = (msg,type) => {
    this.setState({alert:{msg,type}});

    setTimeout(()=>this.setState({alert:null}),2000);
  }

  render(){
    const { users, loading, user, repos, showClear} = this.state;

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path="/" render= {props => (<Fragment>
                  <Search searchUsers = {this.searchUsers} clearUsers = {this.clearUsers} setAlert = {this.setAlert} showClear = {showClear}/>
                  <Users loading={loading} users={users}/>
                </Fragment>)} />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" render = {props =>(
                  <User {...props} getUser={this.getUser} user={user} getUserRepos={this.getUserRepos} repos={repos} />
                )} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
