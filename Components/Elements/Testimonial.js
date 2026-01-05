import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <>
            <Slider {...settings}>
                <>
                    <div className="row align-items-center" style={{ "display": "flex!important;" }}>
                        <div className="col-xl-6 col-lg-6">
                            <div className="customer-img">
                                <img className="img-fluid" src='/images/testimonial/1.jpg' alt="" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="customer-review">
                                <img className="img-fluid" src='/images/brand/2.webp' alt="" />
                                <p>“Plateforme très simple à utiliser. Les retraits sont rapides
                                    et le suivi des investissements est clair.”</p>
                                <div className="customer-info">
                                    <h6>Mr John</h6>
                                    <p>Investisseur</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>

                <>
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-6">
                            <div className="customer-img">
                                <img className="img-fluid" src='/images/testimonial/2.jpg' alt="" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="customer-review">
                                <img className="img-fluid" src='/images/brand/3.webp' alt="" />
                                <p>“J’ai commencé avec un petit montant. Le système est bien
                                    structuré et le support répond rapidement.”.</p>
                                <div className="customer-info">
                                    <h6>Aline K.</h6>
                                    <p>CEntrepreneure</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                <>
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-6">
                            <div className="customer-img">
                                <img className="img-fluid" src='/images/testimonial/2.jpg' alt="" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="customer-review">
                                <img className="img-fluid" src='/images/brand/3.webp' alt="" />
                                <p>“Bonne transparence, tableau de bord clair et programme
                                    de parrainage intéressant.”</p>
                                <div className="customer-info">
                                    <h6>Samuel D.</h6>
                                    <p>Utilisateur actif</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </Slider>
        </>
    );
};

export default Testimonial;