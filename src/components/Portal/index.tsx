import React from 'react';
import InnerPortal from './Portal';
import { PortalProps } from './interface';

class Portal extends React.Component<PortalProps> {
  instance: any;
  componentWillUnmount(): void {
    this.instance = null;
  }
  render(): React.ReactNode {
    const { visible } = this.props;
    return this.instance || visible ? (
      <InnerPortal ref={(node) => (this.instance = node)} {...this.props} />
    ) : null;
  }
}

export default Portal;
