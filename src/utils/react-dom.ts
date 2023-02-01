import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMClient from 'react-dom/client';

interface Root {
  render: (app: ReactElement) => void;
  unmount: () => void;
  _unmount: () => void;
}

type CreateRootFnType = (container: Element | DocumentFragment) => Root;

const customReactDOM = { ...ReactDOM, ...ReactDOMClient } as typeof ReactDOM &
  typeof ReactDOMClient;

let customRender: (
  app: ReactElement,
  container: Element | DocumentFragment
) => {
  render: (app: ReactElement) => void;
  _unmount: () => void;
};

const isReact18 = ReactDOM.version.split('.')?.[0] === '18';
const createRoot: CreateRootFnType =
  customReactDOM.createRoot as CreateRootFnType;

if (isReact18 && createRoot) {
  customRender = function (
    app: ReactElement,
    container: Element | DocumentFragment
  ) {
    const root = createRoot(container);
    root.render(app);
    root._unmount = () => {
      setTimeout(() => {
        root.unmount();
      });
    };
    return root;
  };
} else {
  customRender = function (
    app: ReactElement,
    container: Element | DocumentFragment
  ) {
    customReactDOM.render(app, container);
    return {
      render(app: ReactElement) {
        customReactDOM.render(app, container);
      },
      _unmount() {
        customReactDOM.unmountComponentAtNode(container);
      }
    };
  };
}

export default customRender;
