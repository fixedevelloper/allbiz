import Link from 'next/link';
import React from 'react';
import Layout from '../Components/Layout/Layout';
import RouletteWheel from "../Components/Elements/RouletteWheel";

const RoulettePlay = () => {
    return (
        <>
            <Layout>
                <div className="accounts mb-80">
                    <div className="container text-center">
                        <RouletteWheel rouletteId={} type={}/>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default RoulettePlay;