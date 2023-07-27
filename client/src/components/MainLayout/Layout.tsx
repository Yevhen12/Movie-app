import { FC, PropsWithChildren } from 'react';
import Header from '../Header/Header';

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Header />
      <main style={{height: 'calc(100% - 96px)'}} className="main">{children}</main>
      {/* <Footer />
      <BottomNavigation /> */}
    </>
  );
};

export default Layout