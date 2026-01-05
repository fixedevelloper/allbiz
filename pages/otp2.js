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
                                        <Link className="page-back text-muted" href="/otp1"><span><i
                                            className="fa fa-angle-left"></i></span> Back</Link>
                                        <h3 className="text-center">OTP Verification</h3>
                                        <p className="text-center mb-5">We will send one time code on this number</p>
                                        <form>
                                            <div className="form-group">
                                                <label>Your OTP Code</label>
                                                <input type="text" className="form-control text-center font-weight-bold" placeholder="11 22 33" />
                                            </div>
                                            <div className="text-center mt-4">
                                                <Link href="/" className="btn btn-success w-100">Verify</Link>
                                            </div>
                                        </form>
                                        <div className="info mt-3">
                                            <p className="text-muted">You dont recommended to save password to browsers!</p>
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