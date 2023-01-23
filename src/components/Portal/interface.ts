import React from 'react';

export interface PortalProps {
  visible?: boolean;
  container: Element;
  children?: React.ReactNode;
}
