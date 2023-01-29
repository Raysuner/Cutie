import React, { Component, ReactNode } from 'react';
import InternalPortal from './Portal';
import { PortalProps } from './interface';

class Portal extends Component<PortalProps> {
  instance: InternalPortal | null = null;
  componentWillUnmount(): void {
    this.instance = null;
  }
  render(): ReactNode {
    const { visible } = this.props;
    return this.instance || visible ? (
      <InternalPortal ref={(node) => (this.instance = node)} {...this.props} />
    ) : null;
  }
}

export default Portal;
