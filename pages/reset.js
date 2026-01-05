import Link from 'next/link';
import React from 'react';
import LayoutFront from '../Components/Layout/LayoutFront';

const Reset = () => {
    return (
        <>
            <LayoutFront>
                <div className="authincation section-padding">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100 align-items-center">
                            <div className="col-xl-4 col-md-6">
                                <div className="auth-form card">
                                    <div className="card-header justify-content-center">
                                        <h4 className="card-title">Reset password</h4>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group">
                                                <label>Email</label>
                                                <input type="email" className="form-control" placeholder="hello@example.com" />
                                            </div>
                                            <div className="text-center">
                                                <Link href="/signin" className="btn btn-success w-100">Reset</Link>
                                            </div>
                                        </form>
                                        <div className="new-account mt-3">
                                            <p className="mb-1 d-inline-block">Don't Received? </p>
                                            <Link className="text-primary d-inline-block" href="/reset">Resend </Link>
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

export default Reset;