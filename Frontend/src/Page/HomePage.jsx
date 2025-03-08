import React from 'react';
import Banner from '../Component/Banner/Banner';
import ServiceDetails from '../Component/ServiceDetails/ServiceDetails';
import ContactBanner from '../Component/ContactBanner/ContactBanner';
import PatientReview from '../Component/PatientReview/PatientReview';
import ExpertDoctor from '../Component/ExpertDoctor/ExpertDoctor';
import Contact from '../Component/Contact/Contact';

const HomePage = () => {
    return (
        <div className='w-full'>
            <Banner/>
            <div className='px-5 md:mx-auto max-w-5xl w-full max-h-full'>
                <ServiceDetails/>
                <ContactBanner/>
                <PatientReview/>
                <ExpertDoctor/>
                <Contact/>
            </div>
        </div>
    );
};

export default HomePage;