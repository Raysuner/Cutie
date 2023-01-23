import { Component, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { PortalProps } from './interface';

class InnerPortal extends Component<Omit<PortalProps, 'visible'>> {
  render(): ReactNode {
    const { children, container } = this.props;
    if (container) {
      return ReactDOM.createPortal(children, container);
    }
    return null;
  }
}

export default InnerPortal;
