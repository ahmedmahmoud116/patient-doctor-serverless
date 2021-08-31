import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, useMutation } from '@apollo/client';
import DoctorRow from './DoctorRow'


const FETCH_ALL_DOCTORS = gql`
  query Patient{
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
    // if (availableOnly && !customer.available) {
    //   return;
    // }
    // if (customer.email.indexOf(searchText) === -1) {
    //   return;
    // }
    rows.push(
      <DoctorRow
        key={doctor.id} doctor={doctor} />
    );
  })


  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>specialization</th>
          {/* <th>ID</th> */}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
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

export default FetchAllDoctors;