import LayoutFront from "../Components/Layout/LayoutFront";
import Hero from "../Components/sections/Hero";
import Steps from "../Components/sections/Steps";
import Plans from "../Components/sections/Plans";
import Advantages from "../Components/sections/Advantages";
import Testimonial from "../Components/Elements/Testimonial";
import FAQ from "../Components/sections/FAQ";
import Contact from "../Components/sections/Contact";
import React from "react";


const Index = () => {
    return (
        <LayoutFront>
            <Hero />
            <Steps />
            <Plans />
            <Advantages />
            <div className="testimonial section-padding" id="testimonial" style={{ background: "#fff" }}>
                <div className="container">
                    <div className="row py-lg-5 justify-content-center">
                        <div className="col-xl-6">
                            <div className="section_heading">
                                <span>Ils nous font confiance</span>
                                <h3>Découvrez les retours d’expérience de nos utilisateurs</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-md-11">
                            <div className="testimonial-content">
                                <Testimonial />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FAQ />
            <Contact />
        </LayoutFront>
    );
};

export default Index;
