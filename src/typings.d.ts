declare module '*.svg' {
  const content: string;
  export const ReactComponent: React.FunctionComponent<React.SVGAttributes<
    SVGElement
  >>;

  export default content;
}

declare module 'reset-jss';

declare module 'babel-plugin-universal-import/universalImport.js';
