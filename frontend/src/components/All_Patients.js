import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, useMutation } from '@apollo/client';
import PatientRow from './PatientRow'
import styled from "styled-components";

const FETCH_ALL_PATIENTS = gql`
query Patient {
  getAllPatients {
    firstName
    lastName
    syndrome
    id
    doctor_id
  }
}`;

function FetchAllPatients() {
  const { loading, error, data } = useQuery(FETCH_ALL_PATIENTS);
  if (loading) return <p> Loading... </p>
  if (error) return <p> Error! </p>
  const rows = [];


  data.getAllPatients.map((patient) => {
    rows.push(
      <PatientRow
        key={patient.id} patient={patient} />
    );
  })

  const Button = styled.button`
  background-color: #1e943d;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  margin: 10px 0px;
  cursor: pointer;
  `;

  return (
    <div>
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
        <tbody>{rows}</tbody>
      </table>
      <Button onClick={event => window.location.href = "addPatient/"}>
        Add Patient
      </Button>
    </div>
  );

}

// class All_Doctors extends Component {
//   render() {
//     return (
//       <div>
//         <h2>List Doctors</h2>
//       </div>
//     );
//   }
// }

export default FetchAllPatients;