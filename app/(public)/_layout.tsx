import React from 'react';
import '../../base64Polyfill';
import '../../globals';

import PublicRoutes from '@/src/routes/(public)/PublicRoutes';

export default function AuthLayout() {
  return <PublicRoutes />;
}
