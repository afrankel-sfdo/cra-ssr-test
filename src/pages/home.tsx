import React from 'react';
import { ReactComponent as Logo } from 'logo.svg';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  logo: {
    maxWidth: 250,
    height: 'auto',
  },
});

const Home = () => {
  const { logo } = useStyles();

  return (
    <>
      <Logo className={logo} />
    </>
  );
};

export default Home;
