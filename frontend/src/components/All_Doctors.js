import React from 'react';
import { useQuery, gql } from '@apollo/client';
import DoctorRow from './DoctorRow'


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


  return (
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