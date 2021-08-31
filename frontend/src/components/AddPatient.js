import React, { useState } from 'react';
import { gql, useMutation, useQuery} from '@apollo/client';
import { Redirect } from 'react-router-dom';

const PutPatient = () => {
    const FETCH_ALL_DOCTORS = gql`
    query Doctor{
      getAllDoctors {
        firstName
        lastName
        specialization
        id
      }
    }`;

    const ADD_NEW_PATIENT = gql`
    mutation Mutation($addPatientFirstName: String!, $addPatientLastName: String!, 
        $addPatientSyndrome: String, $addPatientDoctorId: String!) {
        addPatient(firstName: $addPatientFirstName, lastName: $addPatientLastName, 
            syndrome: $addPatientSyndrome, doctor_id: $addPatientDoctorId){
                code
                success
                message
                patient {
                    id
                    firstName
                    lastName
                    syndrome
                    doctor_id
                }
            }
        }
    `;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [syndrome, setSyndrome] = useState('');
    const [doctorID, setDoctorID] = useState('');
    const [redirect, setRedirect] = useState(false);


    const { loading, error, data } = useQuery(FETCH_ALL_DOCTORS);
    const [addDoctor, { datamut, loadingmut, errormut }] = useMutation(ADD_NEW_PATIENT);

    if (loading) return <p> Loading... </p>
    if (error) return <p> Error! </p>
    const rows = [];
    data.getAllDoctors.map((doctor) => {
        rows.push(
          <option value={doctor.id}>{doctor.firstName + " " + doctor.lastName}</option>
        );
    })    

    if (loadingmut) return 'Submitting...'
    if (errormut) return `Error! ${error.message}`

    const handleSubmit = (e) => {
        e.preventDefault();
        addDoctor({ variables: { addPatientFirstName: firstName, addPatientLastName: lastName, addPatientSyndrome: syndrome, addPatientDoctorId: doctorID } });
        setRedirect(true);
    };

    const patientForm = () => {
        return (
            redirect ? <Redirect to='/AllPatients' /> :
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input
                            type='text'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                        />
                    </label>

                    <label>
                        Last Name:
                        <input
                            type='text'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                        />
                    </label>

                    <label>
                        Syndrome:
                        <input
                            type='text'
                            value={syndrome}
                            onChange={e => setSyndrome(e.target.value)}
                        />
                    </label>
                    <select onChange={e => setDoctorID(e.target.value)} >
                        {rows}
                    </select>

                    <input
                        type='submit'
                        value='Submit'
                    />

                </form>
        );
    };
    return <div>{patientForm()}</div>;
}

export default PutPatient;
