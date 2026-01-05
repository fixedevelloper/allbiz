import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
        <>
            <div className="footer">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-md-6">
                            <div className="copy_right">
                                Copyright © {new Date().getFullYear()} AllBiz. All Rights Reserved.
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-6 text-lg-right text-center">
                            <div className="social">
                                <Link href="/"><i className="fa fa-youtube-play"></i></Link>
                                <Link href="/"><i className="fa fa-instagram"></i></Link>
                                <Link href="/"><i className="fa fa-twitter"></i></Link>
                                <Link href="/"><i className="fa fa-facebook"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;