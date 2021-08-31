import React, { Component } from 'react';
import { useParams } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, useMutation } from '@apollo/client';
import DoctorRow from './DoctorRow'
import PatientRow from './PatientRow'

const DoctorDetails = (props) => {
    const FETCH_DOCTOR = gql`
    query Doctor($id: ID!) {
        getDoctor(id: $id) {
          firstName
          lastName
          specialization
          id
          patients {
            firstName
            lastName
            syndrome
            id
            doctor_id
          }
        }
      }`;
    const params = useParams();
    const id = params.id;

    const { loading, error, data } = useQuery(FETCH_DOCTOR, {
        variables: { id },
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;

    // console.log(data.getDoctor);
    const rows = [];
    rows.push(
        <DoctorRow
            key={data.getDoctor.id} doctor={data.getDoctor} />
    );

    const patientrows = [];
    data.getDoctor.patients.map((patient) => {
        patientrows.push(
            <PatientRow
                key={patient.id} patient={patient} />
        );
    });

    const renderDoctor = () => {
        return (
            <div>
                <h2>Doctor:</h2>
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
                    <tbody>{rows}</tbody>
                </table>
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
                    <tbody>{patientrows}</tbody>
                </table>
            </div>
        );
    };
    return <div>{renderDoctor()}</div>;
}

export default DoctorDetails;