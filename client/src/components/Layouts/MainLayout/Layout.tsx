import { FC, PropsWithChildren } from 'react';

import dynamic from 'next/dynamic'

const DynamicHeader = dynamic(() => import('../../Header/Header'), {
  ssr: false,
})

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <DynamicHeader />
      <main style={{height: 'calc(100% - 96px)'}} className="main">{children}</main>
    </>
  );
};

export default Layout