import React, { Fragment, useEffect, useContext } from 'react';
import Search from '../users/Search';
import Users from '../users/Users';
import GithubContext from '../../context/github/githubContext';

const Home = () => {
  const githubContext = useContext(GithubContext);

  useEffect(() => {
    githubContext.clearUsers();
    //eslint-disable-next-line
  },[]);

  return(
    <Fragment>
      <Search />
      <Users />
    </Fragment>
  );
}
export default Home;
