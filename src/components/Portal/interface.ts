import React, { ReactNode } from 'react';

export interface PortalProps {
  visible?: boolean;
  container: Element;
  children?: ReactNode;
}
