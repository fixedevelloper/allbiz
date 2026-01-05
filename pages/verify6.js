import Link from 'next/link';
import React from 'react';
import LayoutFront from '../Components/Layout/LayoutFront';

const Verify6 = () => {
    return (
        <>
            <LayoutFront>
            <div className="verification section-padding">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100 align-items-center">
                            <div className="col-xl-4 col-md-6">
                                <div className="auth-form card">
                                    <div className="card-header">
                                        <h4 className="card-title">Upload your identity</h4>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="identity-content">
                                                <span className="icon"><i className="fa fa-check"></i></span>
                                                <h4>Congratulation. Your bank added</h4>
                                                <p>Efficiently provide access to installed base core competencies and end end data Interactively target equity.</p>
                                            </div>

                                            <div className="text-center">
                                                <Link href="/settings-account" className="btn btn-success ps-5 pe-5">Continue</Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutFront>
        </>
    );
};

export default Verify6;