import React from 'react';
import universal from 'react-universal-component';
import { useQuery } from '@apollo/react-hooks';
// FIXME: import naming conflict with node_modules
// https://github.com/frontarm/create-universal-react-app/issues/9
import querySeries from 'graphqlFix/series';
import { createUseStyles } from 'react-jss';

import 'App.css';

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
  wrapper: {
    border: '4px solid black',
  },
});

const App = () => {
  const { loading, data } = useQuery(querySeries);
  const { wrapper } = useStyles();

  console.log('### query', loading, data);

  return (
    <div className={wrapper}>
      <div className="App">
        <header className="App-header">
          {/* FIXME: loading issue
              https://github.com/frontarm/create-universal-react-app/issues/10 */}
          {loading? 'loading query' :
            data.allSeries.map((series: any) => (
              <div key={series.id}>{series.name}</div>
            ))}
          <UniversalComponent page="home" />
        </header>
      </div>
    </div>
  );
};

const Apollo = () => <App />;

export default Apollo;
