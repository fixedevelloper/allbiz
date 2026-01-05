import Link from 'next/link';
import React from 'react';
import Layout from '../Components/Layout/Layout';

const SettingsAccount = () => {
    return (
        <>
            <Layout>
                <div className="settings mb-80">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-3 col-md-4">
                                <div className="card settings_menu">
                                    <div className="card-header">
                                        <h4 className="card-title">Settings</h4>
                                    </div>
                                    <div className="card-body">
                                        <ul>
                                            <li className="nav-item">
                                                <Link className='nav-link' href='/settings'>
                                                    <i className="la la-user"></i>
                                                    <span>Edit Profile</span>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className='nav-link' href='/settings-preferences'>
                                                    <i className="la la-cog"></i>
                                                    <span>Preferences</span>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className='nav-link' href='/settings-security'>
                                                    <i className="la la-lock"></i>
                                                    <span>Security</span>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className='nav-link' href='/settings-account'>
                                                    <i className="la la-bank"></i>
                                                    <span>Linked Account</span>
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-9 col-md-8">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title">Linked Account or Card</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="form">
                                            <ul className="linked_account">
                                                <li>
                                                    <div className="row">
                                                        <div className="col-9">
                                                            <div className="d-flex">
                                                                <span className="me-3"><i className="fa fa-bank"></i></span>
                                                                <div className="flex-grow-1">
                                                                    <h5 className="mt-0 mb-1">Bank of America</h5>
                                                                    <p>Bank **************5421</p>
                                                                </div>
                                                                <div className="edit-option">
                                                                    <Link href="#"><i className="fa fa-eye"></i></Link>
                                                                    <Link href="#"><i className="fa fa-pencil"></i></Link>
                                                                    <Link href="#"><i className="fa fa-trash"></i></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-3">
                                                            <div className="verify">
                                                                <div className="verified">
                                                                    <span><i className="la la-check"></i></span>
                                                                    <Link href="#">Verified</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="row">
                                                        <div className="col-9">
                                                            <div className="d-flex my-4">
                                                                <span className="me-3"><i className="fa fa-cc-mastercard"></i></span>
                                                                <div className="flex-grow-1">
                                                                    <h5 className="mt-0 mb-1">Master Card</h5>
                                                                    <p>Credit Card *********5478</p>
                                                                </div>
                                                                <div className="edit-option">
                                                                    <Link href="#"><i className="fa fa-eye"></i></Link>
                                                                    <Link href="#"><i className="fa fa-pencil"></i></Link>
                                                                    <Link href="#"><i className="fa fa-trash"></i></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-3">
                                                            <div className="verify">
                                                                <div className="verified">
                                                                    <span><i className="la la-check"></i></span>
                                                                    <Link href="#">Verified</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="row">
                                                        <div className="col-9">
                                                            <div className="d-flex">
                                                                <span className="me-3"><i className="fa fa-credit-card"></i></span>
                                                                <div className="flex-grow-1">
                                                                    <h5 className="mt-0 mb-1">Debit Card</h5>
                                                                    <p>Prepaid Card *********5478</p>
                                                                </div>
                                                                <div className="edit-option">
                                                                    <Link href="#"><i className="fa fa-eye"></i></Link>
                                                                    <Link href="#"><i className="fa fa-pencil"></i></Link>
                                                                    <Link href="#"><i className="fa fa-trash"></i></Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-3">
                                                            <div className="verify">
                                                                <div className="not-verify">
                                                                    <span><i className="la la-close"></i></span>
                                                                    <Link href="#">Not verified</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>

                                            <div className="mt-5">
                                                <Link href="/verify5" className="btn btn-primary px-4 me-3">Add Bank
                                                    Account</Link>
                                                <Link href="/verify1" className="btn btn-success px-4">Add Debit
                                                    Account</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default SettingsAccount;