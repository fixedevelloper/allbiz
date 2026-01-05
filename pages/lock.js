import Link from 'next/link';
import React from 'react';
import LayoutFront from '../Components/Layout/LayoutFront';

const Lock = () => {
    return (
        <>
            <LayoutFront>

                <div className="authincation section-padding">
                    <div className="container h-100">
                        <div className="row justify-content-center h-100 align-items-center">
                            <div className="col-xl-4 col-md-6">
                                <div className="auth-form card">
                                    <div className="card-header justify-content-center">
                                        <h4 className="card-title">Locked</h4>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group mb-4">
                                                <label>Enter Password</label>
                                                <input type="password" className="form-control bg-transparent rounded-0" placeholder="Password" />
                                            </div>
                                            <Link className="btn btn-success w-100 text-center" href="/" >Unlock</Link>
                                        </form>
                                        <div className="new-account text-center mt-3">
                                            <Link className="text-primary" href="/reset">
                                                <h5>Not Maria Pascle?</h5>
                                            </Link>
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

export default Lock;