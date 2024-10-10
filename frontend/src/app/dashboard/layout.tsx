'use client'

import React from 'react';

import Layout from '../components/Layout';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Layout>{children}</Layout>;
}



export default DashboardLayout;