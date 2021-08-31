import React from 'react';
import { useQuery, gql } from '@apollo/client';
import DoctorRow from './DoctorRow'
import styled from "styled-components";

const FETCH_ALL_DOCTORS = gql`
  query Doctor{
    getAllDoctors {
      firstName
      lastName
      specialization
      id
    }
  }`;

function FetchAllDoctors() {
  const { loading, error, data } = useQuery(FETCH_ALL_DOCTORS);
  if (loading) return <p> Loading... </p>
  if (error) return <p> Error! </p>
  const rows = [];


  data.getAllDoctors.map((doctor) => {
    rows.push(
      <DoctorRow
        key={doctor.id} doctor={doctor} />
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
            <th>Specialization</th>
            {/* <th>ID</th> */}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <Button onClick={event => window.location.href = "addDoctor/"}>
        Add Doctor
      </Button>
    </div>

  );

}


export default FetchAllDoctors;