import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, useMutation } from '@apollo/client';
import DoctorRow from './DoctorRow'
import PatientRow from './PatientRow'

const putPatient = (props) => {

    const renderPatient = () => {
        return (
            <div>
                <h2>This is Add Patient!!</h2>
            </div>
        );
    };
    return <div>{renderPatient()}</div>;
}

export default putPatient;
