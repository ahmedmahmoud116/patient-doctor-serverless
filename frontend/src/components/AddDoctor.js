import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';

const PutDoctor = () => {

    const ADD_NEW_DOCTOR = gql`
    mutation Mutation($addDoctorFirstName: String!, $addDoctorLastName: String!,
        $addDoctorSpecialization: String) {
        addDoctor(firstName: $addDoctorFirstName, lastName: $addDoctorLastName, 
                  specialization: $addDoctorSpecialization) {
            code
            success
            message
            doctor {
                id
                firstName
                lastName
                specialization
            }
        }
    }`;

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [redirect, setRedirect] = useState(false);

    const [addDoctor, { data, loading, error }] = useMutation(ADD_NEW_DOCTOR);

    if (loading) return 'Submitting...'
    if (error) return `Error! ${error.message}`

    const handleSubmit = (e) => {
        e.preventDefault();
        addDoctor({ variables: { addDoctorFirstName: firstName, addDoctorLastName: lastName, addDoctorSpecialization: specialization } });
        setRedirect(true);
    };

    const DoctorForm = () => {
        return (
            redirect ? <Redirect to='/AllDoctors' /> :
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
                        Specialization:
                        <input
                            type='text'
                            value={specialization}
                            onChange={e => setSpecialization(e.target.value)}
                        />
                    </label>

                    <input
                        type='submit'
                        value='Submit'
                    />

                </form>
        );
    };
    return <div>{DoctorForm()}</div>;
}

export default PutDoctor;
