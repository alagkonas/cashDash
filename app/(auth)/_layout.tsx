import React from 'react';
import '../../base64Polyfill';
import '../../globals';

import AuthRoutes from '@/src/routes/(auth)/AuthRoutes';

export default function AuthLayout() {
  return <AuthRoutes />;
}
