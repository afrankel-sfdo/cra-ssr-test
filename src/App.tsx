import React from 'react';
import universal from 'react-universal-component';
import { useQuery } from '@apollo/react-hooks';
// FIXME: import naming conflict with node_modules
// https://github.com/frontarm/create-universal-react-app/issues/9
import querySeries from 'graphqlFix/series';
import { createUseStyles } from 'react-jss';
import reset from 'reset-jss';

declare const require: any;

const load = (props: any) =>
  Promise.all([
    import(/* webpackChunkName: '[request]' */ `./${props.page}`),
  ]).then((proms) => proms[0]);

// FIXME: loading issue
// https://github.com/frontarm/create-universal-react-app/issues/10
const UniversalComponent = universal(load, {
  chunkName: (props) => props.page,
  resolve: (props) => require.resolveWeak(`./${props.page}`),
});

const useStyles = createUseStyles({
  ...reset,
  header: {
    backgroundColor: '#efefef',
    padding: 20,
    minHeight: '100vh',
    width: '100vw',
  },
});

const App = () => {
  const { loading, data } = useQuery(querySeries);
  const { header } = useStyles();

  return (
    <header className={header}>
      {loading
        ? 'loading query'
        : data.allSeries.map((series: any) => (
            <div key={series.id}>{series.name}</div>
          ))}
      {false && <UniversalComponent page="home" />}
    </header>
  );
};

export default App;
