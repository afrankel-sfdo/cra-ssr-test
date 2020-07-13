import React from 'react';
import universal from 'react-universal-component';
import injectSheet from 'react-jss';
import 'App.css';

declare const require: any;

const load = (props: any) =>
  Promise.all([
    import(/* webpackChunkName: '[request]' */ `./${props.page}`),
  ]).then((proms) => proms[0]);

const UniversalComponent = universal(load, {
  chunkName: (props) => props.page,
  resolve: (props) => require.resolveWeak(`./${props.page}`),
});

const styles = {
  wrapper: {
    border: '4px solid red',
  },
};

const App = ({ classes }: { classes: { wrapper: string } }) => (
  <div className={classes.wrapper}>
    <div className="App">
      <header className="App-header">
        <UniversalComponent page="home" />
      </header>
    </div>
  </div>
);

export default injectSheet(styles)(App);
