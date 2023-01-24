import React from 'react';
import InternalPortal from './Portal';
import { PortalProps } from './interface';

class Portal extends React.Component<PortalProps> {
  instance: InternalPortal | null = null;
  componentWillUnmount(): void {
    this.instance = null;
  }
  render(): React.ReactNode {
    const { visible } = this.props;
    return this.instance || visible ? (
      <InternalPortal ref={(node) => (this.instance = node)} {...this.props} />
    ) : null;
  }
}

export default Portal;
