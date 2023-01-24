import { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { PortalProps } from './interface';

class InternalPortal extends Component<Omit<PortalProps, 'visible'>> {
  render(): ReactNode {
    const { children, container } = this.props;
    if (container) {
      return ReactDOM.createPortal(children, container);
    }
    return null;
  }
}

export default InternalPortal;
