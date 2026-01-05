import Link from 'next/link';
import React from 'react';
import LayoutFront from '../Components/Layout/LayoutFront';

const Otp1 = () => {
    return (
        <>
            <LayoutFront>
                <div className="authincation section-padding">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100 align-items-center">
                            <div className="col-xl-4 col-md-6">
                                <div className="auth-form card">
                                    <div className="card-body">
                                        <Link className="page-back text-muted" href="/signin"><span><i
                                            className="fa fa-angle-left"></i></span> Back</Link>
                                        <h3 className="text-center">OTP Verification</h3>
                                        <p className="text-center mb-5">We will send one time code on this number</p>
                                        <form>
                                            <div className="form-group">
                                                <label>Your phone number</label>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text ps-4 pe-4"><i
                                                            className="fa fa-phone"></i></span>
                                                    </div>
                                                    <input type="text" className="form-control" placeholder="+1 12365480" />
                                                </div>
                                            </div>
                                            <div className="text-center mt-4">
                                                <Link href="/otp2" className="btn btn-success w-100">Send</Link>
                                            </div>
                                        </form>
                                        <div className="new-account mt-3 d-flex justify-content-between">
                                            <p>Don't get code? <Link className="text-primary d-inline-block" href="/otp1">Resend</Link></p>
                                        </div>
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

export default Otp1;