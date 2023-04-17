import { FC, PropsWithChildren } from 'react';
import Header from '../Header/Header';

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="main">{children}</main>
      {/* <Footer />
      <BottomNavigation /> */}
    </>
  );
};

export default Layout