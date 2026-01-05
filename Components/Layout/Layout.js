import React from 'react';
import PageTitle from './PageTitle';
import Footer from './Footer';
import Header from './Header';
import Head from 'next/head'

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css?family=Rubik:400,500,700&display=swap"
                    rel="stylesheet"
                />
                <title>Allbiz</title>
            </Head>
            <div id="main-wrapper" className="dashboard">
                <Header />
                <PageTitle />
                {children}
                <Footer />
            </div>
        </>
    );
};

export default Layout;