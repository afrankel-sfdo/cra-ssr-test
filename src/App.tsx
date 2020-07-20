import React from 'react';
import universal from 'react-universal-component';
import { useQuery } from '@apollo/react-hooks';
// FIXME: import naming conflict with node_modules
// https://github.com/frontarm/create-universal-react-app/issues/9
import querySeries from 'graphql/series';
import { createUseStyles } from 'react-jss';
import { get } from 'lodash-es';
import reset from 'reset-jss';

declare const require: any;

interface IUniversalProps {
  page: string;
}

const load = (props: IUniversalProps) =>
  Promise.all([
    import(/* webpackChunkName: '[request]' */ `pages/${props.page}`),
  ]).then((proms) => proms[0]);

const UniversalComponent = universal(load, {
  chunkName: (props) => props.page,
  resolve: (props) => require.resolveWeak(`pages/${props.page}`),
  loading: () => <div>custom loading...</div>,
  error: () => <div>custom error!</div>,
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
      {get({ key: 'hello' }, 'key')}
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
