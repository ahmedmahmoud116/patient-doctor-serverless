import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, useMutation } from '@apollo/client';
import DoctorRow from './DoctorRow'
import PatientRow from './PatientRow'

const PatientDetails = (props) => {
    const FETCH_PATIENT = gql`
    query Patient($doctor_id: ID!, $patient_id: ID!) {
        getPatient(doctor_id: $doctor_id, patient_id: $patient_id) {
          firstName
          lastName
          syndrome
          id
          doctor_id
          doctor {
            firstName
            lastName
            specialization
            id
          }
        }
    }`;

    const params = useParams();
    const doctor_id = params.doctorid;
    const patient_id = params.id;

    const { loading, error, data } = useQuery(FETCH_PATIENT, {
        variables: { doctor_id, patient_id },
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;

    console.log("getPatient");
    console.log(data.getPatient);
    const patientrow = [];
    patientrow.push(
        <PatientRow
            key={data.getPatient.id} patient={data.getPatient} />
    );

    const doctorrow = [];
    doctorrow.push(
        <DoctorRow
            key={data.getPatient.doctor_id} doctor={data.getPatient.doctor} />
    );

    const renderPatient = () => {
        return (
            <div>
                <h2>Patient:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Syndrome</th>
                            {/* <th>ID</th> */}
                            {/* <th>Doctor ID</th> */}
                        </tr>
                    </thead>
                    <tbody>{patientrow}</tbody>
                </table>
                <h2>Patient:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Specialization</th>
                            {/* <th>ID</th> */}
                            {/* <th>Doctor ID</th> */}
                        </tr>
                    </thead>
                    <tbody>{doctorrow}</tbody>
                </table>
            </div>
        );
    };
    return <div>{renderPatient()}</div>;
}

export default PatientDetails;