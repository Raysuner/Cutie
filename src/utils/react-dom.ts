import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { isObject } from './is';

interface Root {
  render: (app: ReactElement) => void;
  unmount: () => void;
}

type CreateRootFnType = (container: Element | DocumentFragment) => Root;

const __SECRET_INTERNALS__ =
  '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED';

const customReactDOM = ReactDOM as typeof ReactDOM & {
  createRoot: CreateRootFnType;
  [__SECRET_INTERNALS__]: {
    usingClientEntry?: boolean;
  };
};

let customRender: (
  app: ReactElement,
  container: Element | DocumentFragment
) => {
  render: (app: ReactElement) => void;
  unmount: () => void;
};

const isReact18 = ReactDOM.version.split('.')?.[0] === '18';
const createRoot: CreateRootFnType = customReactDOM.createRoot;

function updateUsingClientEntry(showWarning: boolean) {
  if (isObject(customReactDOM[__SECRET_INTERNALS__])) {
    customReactDOM[__SECRET_INTERNALS__].usingClientEntry = showWarning;
  }
}

if (isReact18 && createRoot) {
  customRender = function (
    app: ReactElement,
    container: Element | DocumentFragment
  ) {
    updateUsingClientEntry(false);
    const root = createRoot(container);
    updateUsingClientEntry(true);
    root.render(app);
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
      unmount() {
        customReactDOM.unmountComponentAtNode(container);
      }
    };
  };
}

export default customRender;
