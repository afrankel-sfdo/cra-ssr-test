import React from 'react';
import universal from 'react-universal-component';
import universalImport from 'babel-plugin-universal-import/universalImport.js';
import path from 'path';
import { useQuery } from '@apollo/react-hooks';
// FIXME: import naming conflict with node_modules
// https://github.com/frontarm/create-universal-react-app/issues/9
import querySeries from 'graphqlFix/series';
import { createUseStyles } from 'react-jss';
import reset from 'reset-jss';

declare const require: any;

interface IUniversalProps {
  page: string;
}

// FIXME: loading issue
// https://github.com/frontarm/create-universal-react-app/issues/10
const UniversalComponent = universal((props: IUniversalProps) => {
  return universalImport({
    chunkName: (props: IUniversalProps) => props.page,
    path: (props: IUniversalProps) => path.join(__dirname, `./${props.page}`),
    resolve: (props: IUniversalProps) => require.resolveWeak(`./${props.page}`),
    load: (props: IUniversalProps) =>
      Promise.all([
        import(/* webpackChunkName: '[request]' */ `./${props.page}`),
      ]).then((proms) => proms[0]),
  });
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
      <UniversalComponent page="home" />
    </header>
  );
};

export default App;
