import gql from 'graphql-tag';

const querySeries = gql`
  query series {
    allSeries {
      id
      name
    }
  }
`;

export default querySeries;
