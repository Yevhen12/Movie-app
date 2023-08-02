import * as React from 'react';
import '@/styles/main.scss';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../mui/theme'
import createEmotionCache from '../mui/createEmotionCache';
import { nextReduxWrapper } from '@/redux/store';
import { NextComponentType, NextPageContext } from 'next'
import { ACCESS_TOKEN } from '@/constants/common';
import { getCookie } from 'cookies-next';
import { userService } from '@/services/api/user.service';
import { serverSideService } from '@/services/api/serverSide.service';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

type GetInitialPropsType = {
  ctx: NextPageContext,
  Component: NextComponentType<NextPageContext<any>, {}, {}>
}

const MyApp = (props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}


MyApp.getInitialProps = nextReduxWrapper.getInitialAppProps((store) => async ({ ctx, Component }: GetInitialPropsType) => {
  const test = ctx.req?.headers.cookie
  if (test) {
    const parsedToken = test.split('=')[1]
    const allUsers = await serverSideService.getAllUsers(parsedToken)
    console.log('allUsers', allUsers)
  }
  return {
    pageProps: Component.getInitialProps ? await Component.getInitialProps({ ...ctx, store }) : {},
  };

})

export default nextReduxWrapper.withRedux(MyApp);